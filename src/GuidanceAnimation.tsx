import {useEffect, useRef, useState} from 'react';
import type {GuidanceVisual} from './content';

const captions: Record<GuidanceVisual,string> = {
  teams:'Make small teams and take turns being the spokesperson.',
  scene:'Revisit the scene first. Reveal the question afterwards.',
  discuss:'Hear the question, start a timer, then bring your ideas together.',
  refine:'Share a response, look for evidence, and develop your thinking.',
  flip:'Turn to the next question and hear from a different team.',
};

function Person() {
  return <svg className="guide-person" viewBox="0 0 32 44" fill="currentColor"><circle cx="16" cy="9" r="7"/><path d="M4 38V29a12 12 0 0 1 24 0v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z"/></svg>;
}
function Team({number,active=false}:{number:number;active?:boolean}) {
  return <div className={`guide-team team-${number}${active?' guide-team-active':''}`}>
    <div className="guide-people"><Person/><Person/><Person/></div>
    <span className="guide-team-label">Team {number}</span>
  </div>;
}
function Book() {
  return <svg className="guide-book" viewBox="0 0 100 72" fill="none" stroke="currentColor" strokeWidth="3"><path fill="#fff9ed" d="M50 12C35 3 17 5 5 12v49c15-6 30-5 45 3 15-8 30-9 45-3V12C80 5 65 3 50 12Z"/><path d="M50 12v52M15 22l25 2m-25 8 25 2m-25 8 25 2m20-20 25-2m-25 12 25-2m-25 12 25-2"/></svg>;
}

export default function GuidanceAnimation({kind}:{kind:GuidanceVisual}) {
  const [playing,setPlaying]=useState(false);
  const [inView,setInView]=useState(typeof IntersectionObserver==='undefined');
  const [tabVisible,setTabVisible]=useState(!document.hidden);
  const [reduced,setReduced]=useState(()=>window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false);
  const ref=useRef<HTMLElement>(null);
  useEffect(()=>{
    const onVisibility=()=>setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange',onVisibility);
    const media=window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const onMotion=()=>setReduced(media?.matches??false);
    media?.addEventListener('change',onMotion);
    const observer=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>setInView(entries.some(entry=>entry.isIntersecting)));
    if(ref.current)observer?.observe(ref.current);
    return()=>{observer?.disconnect();document.removeEventListener('visibilitychange',onVisibility);media?.removeEventListener('change',onMotion);};
  },[]);
  const running=playing&&inView&&tabVisible&&!reduced;
  return <section ref={ref} className={`guidance-visual visual-${kind}`} aria-label="Visual guide" data-running={running}>
    <div className="guidance-visual-header"><span className="eyebrow">SEE HOW IT WORKS</span>{!reduced&&<button type="button" className="secondary" aria-pressed={playing} onClick={()=>setPlaying(p=>!p)}>{playing?'Pause animation':'Play animation'}</button>}</div>
    <div className="guidance-stage" aria-hidden="true">
      {kind==='teams'&&<div className="guide-team-row">{[1,2,3].map(n=><div className={`guide-team-wrap speaker-${n}`} key={n}><span className="guide-speech">Our ideas…</span><Team number={n}/><span className="guide-rotate">↔ Take turns</span></div>)}</div>}
      {kind==='scene'&&<div className="guide-sequence"><div className="guide-prop scene-reference"><div className="guide-small-card">CARD<span>Page reference</span></div><span>Find the page</span></div><span className="guide-flow-arrow">→</span><div className="guide-prop scene-reading"><Book/><span>Read or act it out</span></div><span className="guide-flow-arrow">→</span><div className="guide-prop scene-question"><div className="question-reveal"><div className="question-hidden">?<small>Keep hidden</small></div><div className="question-shown">?<small>Now discuss</small></div></div><span>Then reveal</span></div></div>}
      {kind==='discuss'&&<div className="guide-sequence"><div className="guide-prop"><div className="guide-small-card">?<span>Read aloud</span></div><span>The question</span></div><div className="guide-prop"><div className="guide-clock"><span/></div><span>Start your timer</span></div><div className="guide-prop guide-discussion"><div className="guide-idea-row"><span>Why?</span><span>The story…</span><span>I think…</span></div><Team number={1}/><div className="guide-shared-note">Key points</div></div></div>}
      {kind==='refine'&&<div className="guide-sequence"><div className="guide-prop"><Team number={1}/><div className="guide-response">Our response</div></div><span className="guide-flow-arrow">→</span><div className="guide-prop guide-facilitator"><Person/><small>Facilitator</small><span className="guide-prompt prompt-why">Why?</span><span className="guide-prompt prompt-evidence">What in the story supports that?</span></div><span className="guide-flow-arrow">→</span><div className="guide-prop"><Book/><div className="guide-better-response">Response + evidence</div></div></div>}
      {kind==='flip'&&<div className="guide-sequence"><div className="guide-prop"><div className="guide-flip-space"><div className="guide-flip-card"><div className="guide-card-face">Question 1</div><div className="guide-card-face guide-card-back">Question 2</div></div></div><span>Turn the card over</span></div><span className="guide-flow-arrow">→</span><div className="guide-prop"><div className="guide-next-teams"><Team number={1}/><Team number={2} active/></div><span>Hear a different team</span></div><span className="guide-flow-arrow">→</span><div className="guide-prop"><div className="guide-small-card guide-next-card">Next card<span>When ready</span></div></div></div>}
    </div>
    <p className="guidance-caption">{captions[kind]}</p>
  </section>;
}
