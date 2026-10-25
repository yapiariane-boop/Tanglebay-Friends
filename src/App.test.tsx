// @vitest-environment jsdom
import {afterEach, beforeEach, expect, test, vi} from 'vitest';
import {act, cleanup, fireEvent, render, screen, waitFor, within} from '@testing-library/react';
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
  expect(variant.steps).toHaveLength(mode==='group'?7:5);
  for(let i=0;i<variant.steps.length;i++){
    await screen.findByRole('heading',{level:1,name:variant.steps[i].title});
    const visual=screen.getByRole('region',{name:'Visual guide'});
    expect(visual.classList.contains(`visual-${variant.steps[i].visual}`)).toBe(true);
    expect(visual.getAttribute('data-running')).toBe('false');
    if(mode==='home'&&i===2)expect(screen.getByText(/They choose their own starting position before hearing either player’s argument/)).toBeTruthy();
    if(mode==='group'&&i===2)expect(screen.getByText(/This is a physical game/)).toBeTruthy();
    if(mode==='group'&&i===3)expect(screen.getByText(/the facilitator gives the Judges 10 seconds/)).toBeTruthy();
    if(variant.steps[i].id==='make-case')expect(screen.getByText(/Both players may choose the same position/)).toBeTruthy();
    if(variant.steps[i].id==='judges-decide'||variant.steps[i].id==='group-final-vote'){
      if(mode==='home'){
        expect(screen.getByText(/Each final vote earns that player 1 point/)).toBeTruthy();
        expect(screen.getByText(/An equal final vote count is also a draw/)).toBeTruthy();
      } else {
        expect(screen.getByText(/Anyone behind neither Player has no vote for that round/)).toBeTruthy();
        expect(screen.getByText(/Each Judge behind a Player earns that Player 1 point/)).toBeTruthy();
        expect(screen.getByText(/Follow the facilitator’s rotation order/)).toBeTruthy();
      }
    }
    await user.click(screen.getByRole('button',{name:i===variant.steps.length-1?/I’m Ready to Print/:/Next step/}));
  }
  await screen.findByRole('heading',{name:'You’re ready to print!'});
  expect(screen.getByRole('link',{name:/Download PDF/}).getAttribute('href')).toBe('./packs/five-seconds-for-a-stand.pdf');
  expect(screen.getByText('PRINTABLE PDF · 5 PAGES')).toBeTruthy();
  expect(screen.queryByText('Demonstration materials only')).toBeNull();
  if(mode==='group'){
    const assembly=screen.getByRole('region',{name:'Build your 3D button'});
    expect(assembly.getAttribute('data-running')).toBe('false');
    await user.click(screen.getByRole('button',{name:'Play assembly animation'}));
    expect(assembly.getAttribute('data-running')).toBe('true');
    await user.click(screen.getByRole('button',{name:'Pause assembly animation'}));
    expect(assembly.getAttribute('data-running')).toBe('false');
    await user.click(screen.getByRole('button',{name:'4. Place on board'}));
    expect(assembly.getAttribute('data-frame')).toBe('3');
  }else{
    expect(screen.queryByRole('region',{name:'Build your 3D button'})).toBeNull();
  }
});

test.each(['home','group'] as const)('Wild Path %s has stacked preparation and gameplay sections with five steps each',async mode=>{
  window.location.hash='/episodes/episode-1/activities/wild-path';
  render(<App/>);const user=userEvent.setup();
  await user.click(screen.getByRole('button',{name:mode==='home'?/I’m playing at home/:/I’m playing with a group/}));
  const preparation=await screen.findByRole('region',{name:'Prepare the Game'});
  const gameplay=screen.getByRole('region',{name:'How to Play'});
  expect(within(within(preparation).getByRole('list',{name:'Prepare the Game steps'})).getAllByRole('button')).toHaveLength(5);
  expect(within(within(gameplay).getByRole('list',{name:'How to Play steps'})).getAllByRole('button')).toHaveLength(5);
  expect(within(within(gameplay).getByRole('list',{name:'How to Play steps'})).getAllByRole('button')[0].hasAttribute('disabled')).toBe(true);
  const variant=activities.find(a=>a.id==='wild-path')!.variants[mode];
  if(mode==='home'){
    expect(screen.getByText('Print the game board, Character Cards, Challenge Map, Misery & Bonuses Map, tokens and Tanglebay Chunky Dice.')).toBeTruthy();
    expect(within(preparation).queryByText('CONTENT PLACEHOLDER')).toBeNull();
  }else{
    expect(within(preparation).getByText('Print one 8-page Wild Path Pack for each team.')).toBeTruthy();
    expect(within(preparation).queryByText('CONTENT PLACEHOLDER')).toBeNull();
  }
  for(let i=0;i<10;i++){
    await screen.findByRole('heading',{level:3,name:variant.steps[i].title});
    if(mode==='home'&&i===4)expect(screen.getByText('Now it’s time to build your teams.')).toBeTruthy();
    if(mode==='group'&&i===1)expect(screen.getByText('Don’t assign the teams yet. The players will discover them themselves.')).toBeTruthy();
    if(mode==='group'&&i===3)expect(screen.getByText('Prepare one playing table for each team, with one game board and both reference maps.')).toBeTruthy();
    if(mode==='group'&&i===4)expect(screen.getByText('At the shared draw station, each player draws one folded Team ID and one random Character Card.')).toBeTruthy();
    if(mode==='group'&&i===5){
      expect(within(gameplay).getByText('Meet your new teammates and discover the characters on your team.')).toBeTruthy();
      expect(within(gameplay).queryByText('CONTENT PLACEHOLDER')).toBeNull();
    }
    if(mode==='group'&&i===6)expect(screen.getByText('Rotate the Roller each turn so everyone gets a chance to roll and move the team.')).toBeTruthy();
    if(mode==='group'&&i===7)expect(screen.getByText(/The player holding that Character Card explains how their character’s ability could solve the problem/)).toBeTruthy();
    if(mode==='group'&&i===8)expect(screen.getByText('If they agree, your Creative Solution succeeds!')).toBeTruthy();
    if(mode==='group'&&i===9){
      expect(screen.getByText('Challenge succeeded? Move your Team Leader forward one extra space.')).toBeTruthy();
      expect(screen.getByText('Challenge failed? Stay on the Challenge space. When your next turn comes, roll the dice again and continue from there.')).toBeTruthy();
      expect(screen.getByText('The first team to reach the end of the Wild Path wins!')).toBeTruthy();
    }
    if(mode==='home'&&i===5){
      expect(screen.getByText('Each player randomly draws 4 Character Cards.')).toBeTruthy();
      expect(within(gameplay).queryByText('CONTENT PLACEHOLDER')).toBeNull();
    }
    if(mode==='home'&&i===9){
      expect(screen.getByText('Challenge succeeded? Move forward one space.')).toBeTruthy();
      expect(screen.getByText('Challenge failed? Stay on your current space until your next turn, when you can roll the dice again.')).toBeTruthy();
    }
    if(i<9)expect(screen.queryByRole('button',{name:/I’m Ready to Print/})).toBeNull();
    await user.click(screen.getByRole('button',{name:i===9?/I’m Ready to Print/:i===4?/Continue to How to Play/:/Next step/}));
    if(i===4){
      expect(within(preparation).getByText('Completed')).toBeTruthy();
      expect(within(gameplay).getByText('Step 1 of 5')).toBeTruthy();
    }
  }
  await screen.findByRole('heading',{name:'You’re ready to print!'});
  expect(screen.getByRole('link',{name:/Download PDF/}).getAttribute('href')).toBe('./packs/the-wild-path-home-pack.pdf');
  expect(screen.getByText('PRINTABLE PDF · 8 PAGES')).toBeTruthy();
  expect(screen.queryByText('Demonstration materials only')).toBeNull();
  if(mode==='group')expect(screen.getByRole('heading',{name:'Facilitation Guide'})).toBeTruthy();
});

test.each([
  ['dimitris-lab','home'],['dimitris-lab','group'],
  ['officers-investigation','home'],['officers-investigation','group'],
] as const)('%s %s completes both guidance sections before printing',async(id,mode)=>{
  window.location.hash=`/episodes/episode-1/activities/${id}`;
  render(<App/>);const user=userEvent.setup();
  await user.click(screen.getByRole('button',{name:mode==='home'?/I’m playing at home/:/I’m playing with a group/}));
  const preparation=await screen.findByRole('region',{name:'Prepare the Game'});
  const gameplay=screen.getByRole('region',{name:'How to Play'});
  const stepCount=id==='officers-investigation'&&mode==='home'?4:5;
  expect(within(within(preparation).getByRole('list',{name:'Prepare the Game steps'})).getAllByRole('button')).toHaveLength(stepCount);
  const gameplayButtons=within(within(gameplay).getByRole('list',{name:'How to Play steps'})).getAllByRole('button');
  expect(gameplayButtons).toHaveLength(stepCount);
  expect(gameplayButtons.every(button=>button.hasAttribute('disabled'))).toBe(true);
  const variant=activities.find(a=>a.id===id)!.variants[mode];
  if(id==='officers-investigation'&&mode==='group'){
    expect(within(preparation).queryByText('CONTENT PLACEHOLDER')).toBeNull();
    expect(screen.getByText('Divide the children into small Investigation Teams.')).toBeTruthy();
  }else if(id==='officers-investigation'){
    expect(within(preparation).queryByText('CONTENT PLACEHOLDER')).toBeNull();
    expect(screen.getByText('Print all 22 pages of the Home Investigation Notebook.')).toBeTruthy();
  }else expect(within(preparation).getByText('CONTENT PLACEHOLDER')).toBeTruthy();
  for(let i=0;i<variant.steps.length;i++){
    await screen.findByRole('heading',{level:3,name:variant.steps[i].title});
    if(id==='officers-investigation'&&mode==='group'){
      if(i===1)expect(screen.getByText('Print one complete 13-page Team Kit for each team.')).toBeTruthy();
      if(i===2)expect(screen.getByText('Choose four children to play Bridget, Octena, Deedee and Moow.')).toBeTruthy();
      if(i===3)expect(screen.getByText(/Give each actor access only to their own script/)).toBeTruthy();
      if(i===4)expect(screen.getByText(/paper scissors, glue and a pen/)).toBeTruthy();
      if(i>=5){
        expect(within(gameplay).getByRole('region',{name:'Teams'})).toBeTruthy();
        expect(within(gameplay).getByRole('region',{name:'Facilitator'})).toBeTruthy();
      }
      if(i===5){
        expect(within(gameplay).queryByText('CONTENT PLACEHOLDER')).toBeNull();
        expect(screen.getByText(/With four teams or fewer/)).toBeTruthy();
      }
      if(i===6)expect(screen.getByText(/there is no challenge before it/)).toBeTruthy();
      if(i===7){
        expect(screen.getByText(/glue it onto their Investigator Hat to activate it/)).toBeTruthy();
        expect(screen.getByText(/Each tool can only be used once/)).toBeTruthy();
      }
      if(i===8){
        expect(screen.getByText('Challenge 3 → final suspect interview → notes')).toBeTruthy();
        expect(screen.getByText('There are four interviews and three challenges in total.')).toBeTruthy();
        expect(screen.getByText(/use the five minutes afterwards/)).toBeTruthy();
      }
      if(i===9){
        expect(screen.getByText(/complete the three Suspect Files together/)).toBeTruthy();
        expect(screen.getByText(/Honey calls on each department/)).toBeTruthy();
      }
    }
    if(i<variant.steps.length-1)expect(screen.queryByRole('button',{name:/I’m Ready to Print/})).toBeNull();
    await user.click(screen.getByRole('button',{name:i===variant.steps.length-1?/I’m Ready to Print/:i===stepCount-1?/Continue to How to Play/:/Next step/}));
    if(i===stepCount-1)expect(within(preparation).getByText('Completed')).toBeTruthy();
  }
  await screen.findByRole('heading',{name:'You’re ready to print!'});
  if(id==='officers-investigation'&&mode==='home'){
    expect(screen.getByText('PRINTABLE PDF · 22 PAGES')).toBeTruthy();
    expect(screen.queryByText('Demonstration materials only')).toBeNull();
    expect(screen.getByRole('link',{name:/Download PDF/}).getAttribute('href')).toBe('./packs/officers-investigation-home-notebook.pdf');
    expect(screen.queryByRole('heading',{name:'Facilitator File'})).toBeNull();
  }
  if(id==='officers-investigation'&&mode==='group'){
    if(mode==='group'){
      expect(screen.getByText('Print-heavy: 13 pages per team · one shared investigation notebook')).toBeTruthy();
      expect(screen.getByText('PRINTABLE PDF · 13 PAGES')).toBeTruthy();
      expect(screen.queryByText('Demonstration materials only')).toBeNull();
      expect(screen.getAllByRole('link',{name:/Download PDF/}).map(link=>link.getAttribute('href'))).toEqual(['./packs/officers-investigation-group-team-kit.pdf','./packs/officers-investigation-group-facilitator.pdf']);
    }
    expect(screen.getByRole('heading',{name:'Team Kit'})).toBeTruthy();
    expect(screen.getByRole('heading',{name:'Facilitator File'})).toBeTruthy();
    expect(document.querySelectorAll('.file-card')).toHaveLength(2);
    expect(screen.queryByRole('heading',{name:'Evidence materials'})).toBeNull();
    const facilitatorCard=screen.getByRole('heading',{name:'Facilitator File'}).closest('article')!;
    if(mode==='group'){
      expect(within(facilitatorCard).getByText('PRINTABLE PDF · 15 PAGES')).toBeTruthy();
      expect(within(facilitatorCard).getByRole('link',{name:/Download PDF/}).getAttribute('href')).toBe('./packs/officers-investigation-group-facilitator.pdf');
      expect(within(facilitatorCard).queryByText('COMING SOON')).toBeNull();
    }else{
      expect(within(facilitatorCard).getByText('COMING SOON')).toBeTruthy();
      expect(within(facilitatorCard).queryByRole('link')).toBeNull();
    }
  }
});
