// @vitest-environment jsdom
import {afterEach, beforeEach, expect, test, vi} from 'vitest';
import {act, cleanup, fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {existsSync} from 'node:fs';
import App from './App';
import {activities, episodes, type Mode} from './content';
beforeEach(()=>{window.location.hash='/';window.scrollTo=vi.fn();});
afterEach(cleanup);
test('complete story-to-print journey for home and group',async()=>{
  for(const mode of ['home','group'] as Mode[]){
    window.location.hash='/';render(<App/>);const user=userEvent.setup();
    await user.click(screen.getByRole('link',{name:/Find your episode/}));
    await user.click(await screen.findByRole('link',{name:/The Orange Ghost Troubler.*Explore 5 activities/}));
    await user.click(await screen.findByRole('link',{name:/Discussion Cards.*Choose how to play/}));
    expect(screen.queryByRole('link',{name:/Download PDF/})).toBeNull();
    await user.click(await screen.findByRole('button',{name:mode==='home'?/I’m playing at home/:/I’m playing with a group/}));
    const variant=activities[0].variants[mode];
    for(let i=0;i<variant.steps.length;i++){
      await screen.findByText(`Step ${i+1} of ${variant.steps.length}`);
      expect(screen.queryByRole('link',{name:/Download PDF/})).toBeNull();
      if(mode==='group') {
        const visual=screen.getByRole('region',{name:'Visual guide'});
        expect(visual.getAttribute('data-running')).toBe('false');
        await user.click(screen.getByRole('button',{name:'Play animation'}));
        expect(visual.getAttribute('data-running')).toBe('true');
        const hidden=vi.spyOn(document,'hidden','get').mockReturnValue(true);
        fireEvent(document,new Event('visibilitychange'));
        expect(visual.getAttribute('data-running')).toBe('false');
        hidden.mockRestore();fireEvent(document,new Event('visibilitychange'));
        await user.click(screen.getByRole('button',{name:'Pause animation'}));
        expect(visual.getAttribute('data-running')).toBe('false');
      }
      await user.click(screen.getByRole('button',{name:i===variant.steps.length-1?/I’m Ready to Print/:/Next step/}));
    }
    await screen.findByRole('heading',{name:'You’re ready to print!'});
    if(mode==='home') {
      expect(screen.getByText('Page 1 · Front')).toBeTruthy();
      expect(screen.getByText('Page 2 · Back')).toBeTruthy();
      expect(screen.queryByText('Demonstration materials only')).toBeNull();
      const demo=screen.getByRole('region',{name:'How to print double-sided cards'});
      expect(demo.getAttribute('data-paused')).toBe('true');
      await user.click(screen.getByRole('button',{name:'Play animation'}));
      expect(demo.getAttribute('data-paused')).toBe('false');
      await user.click(screen.getByRole('button',{name:'Pause animation'}));
      expect(demo.getAttribute('data-paused')).toBe('true');
    }
    const links=screen.getAllByRole('link',{name:/Download PDF/});
    expect(links.map(l=>l.getAttribute('href'))).toEqual(variant.files.map(f=>f.href));
    await user.click(screen.getByRole('link',{name:'Change play setup'}));
    await user.click(await screen.findByRole('button',{name:mode==='home'?/I’m playing with a group/:/I’m playing at home/}));
    await screen.findByText(`Step 1 of ${activities[0].variants[mode==='home'?'group':'home'].steps.length}`);
    cleanup();
  }
});
test('direct print and skipped-step routes require preparation',async()=>{
  window.location.hash='/episodes/episode-1/activities/discussion-cards/home/print';render(<App/>);
  expect(screen.queryByRole('link',{name:/Download PDF/})).toBeNull();
  await userEvent.click(screen.getByRole('link',{name:'Continue preparation'}));
  await screen.findByText(`Step 1 of ${activities[0].variants.home.steps.length}`);
  window.location.hash='/episodes/episode-1/activities/discussion-cards/home/steps/3';
  await waitFor(()=>expect(screen.getByRole('link',{name:'Continue preparation'})).toBeTruthy());
});
test('content associations and every variant PDF resolve',()=>{
  for(const a of activities){
    expect(a.episodeIds.every(id=>episodes.some(e=>e.id===id))).toBe(true);
    for(const variant of Object.values(a.variants)){
      expect(new Set(variant.steps.map(s=>s.id)).size).toBe(variant.steps.length);
      expect(variant.steps.length).toBeGreaterThan(0);
      for(const f of variant.files)expect(existsSync(`public/${f.href.replace(/^\.\//, '')}`)).toBe(true);
    }
  }
});

test('logo is included without browser storage and customization controls are removed',()=>{
  localStorage.clear();render(<App/>);
  expect(document.querySelector<HTMLImageElement>('.logo-artwork')?.getAttribute('src')).toBe('./artwork/logo-crab.webp');
  expect(existsSync('public/artwork/logo-crab.webp')).toBe(true);
  expect(screen.queryByText('Customize logo artwork')).toBeNull();
  expect(document.querySelector('input[type="file"]')).toBeNull();
});

test('episode one exposes all five activities including the lab and investigation notebook',()=>{
  window.location.hash='/episodes/episode-1';render(<App/>);
  expect(activities.filter(a=>a.episodeIds.includes('episode-1'))).toHaveLength(5);
  expect(screen.getByRole('link',{name:/^Inside Dimitri’s Lab/})).toBeTruthy();
  expect(screen.getByRole('link',{name:/^Officer’s Investigation Notebook/})).toBeTruthy();
});

test('discussion carousel rotates on hover, pauses off hover and supports swipe and buttons',()=>{
  vi.useFakeTimers();
  try {
    window.location.hash='/episodes/episode-1';render(<App/>);
    const region=screen.getByRole('region',{name:'Discussion Cards image carousel'});
    expect(region.querySelector('img')?.getAttribute('src')).toBe('./artwork/discussion-cover.webp');
    fireEvent.mouseEnter(region);
    act(()=>vi.advanceTimersByTime(2500));
    expect(region.querySelector('img')?.getAttribute('src')).toBe('./artwork/discussion-preview-1.webp');
    fireEvent.mouseLeave(region);act(()=>vi.advanceTimersByTime(5000));
    expect(region.querySelector('img')?.getAttribute('src')).toBe('./artwork/discussion-preview-1.webp');
    fireEvent.click(screen.getByRole('button',{name:'Show Discussion Cards image 4 of 4'}));
    expect(region.querySelector('img')?.getAttribute('src')).toBe('./artwork/discussion-preview-3.webp');
    fireEvent.click(screen.getByRole('button',{name:'Next Discussion Cards image'}));
    expect(region.querySelector('img')?.getAttribute('src')).toBe('./artwork/discussion-cover.webp');
    fireEvent.touchStart(region,{touches:[{clientX:200}]});
    fireEvent.touchEnd(region,{changedTouches:[{clientX:100}]});
    expect(region.querySelector('img')?.getAttribute('src')).toBe('./artwork/discussion-preview-1.webp');
    expect(screen.getByRole('button',{name:'Show Discussion Cards image 2 of 4'}).getAttribute('aria-pressed')).toBe('true');
  } finally {cleanup();vi.useRealTimers();}
});

test.each(['home','group'] as const)('5 Seconds for a Stand %s guidance covers judging order and final votes',async mode=>{
  window.location.hash='/episodes/episode-1/activities/five-minutes';
  render(<App/>);const user=userEvent.setup();
  await user.click(screen.getByRole('button',{name:mode==='home'?/I’m playing at home/:/I’m playing with a group/}));
  const variant=activities.find(a=>a.id==='five-minutes')!.variants[mode];
  expect(variant.steps).toHaveLength(5);
  for(let i=0;i<variant.steps.length;i++){
    await screen.findByRole('heading',{level:1,name:variant.steps[i].title});
    const visual=screen.getByRole('region',{name:'Visual guide'});
    expect(visual.classList.contains(`visual-${variant.steps[i].visual}`)).toBe(true);
    expect(visual.getAttribute('data-running')).toBe('false');
    if(i===2)expect(screen.getByText(/They choose their own starting position before hearing either player’s argument/)).toBeTruthy();
    if(i===3)expect(screen.getByText(/Both players may choose the same position/)).toBeTruthy();
    if(i===4){
      expect(screen.getByText(/Each final vote earns that player 1 point/)).toBeTruthy();
      expect(screen.getByText(/An equal final vote count is also a draw/)).toBeTruthy();
    }
    await user.click(screen.getByRole('button',{name:i===4?/I’m Ready to Print/:/Next step/}));
  }
  await screen.findByRole('heading',{name:'You’re ready to print!'});
});
