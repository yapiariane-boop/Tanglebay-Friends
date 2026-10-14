import {useEffect, useRef, useState, type CSSProperties} from 'react';
import type {GuidanceVisual} from './content';

const captions: Record<GuidanceVisual,string> = {
  teams:'Make small teams and take turns being the spokesperson.',
  scene:'Revisit the scene first. Reveal the question afterwards.',
  discuss:'Hear the question, start a timer, then bring your ideas together.',
  refine:'Share a response, look for evidence, and develop your thinking.',
  flip:'Turn to the next question and hear from a different team.',
  opponent:'Two players debate. Everyone else judges the round.',
  stand:'Choose flat or 3D positions, then fold and mix the question cards.',
  position:'Five seconds to choose a position, not to deliver an argument. This is a demonstration, not a live timer.',
  case:'Even with the same position, players can make different arguments.',
  questions:'Write your own question, fold it and add it to the bowl for another round.',
  arena:'Board on the central table, Players at opposite ends, Judges facing them. Gather behind a Player to support them.',
  'group-position':'Players choose in 5 seconds. Judges then have 10 seconds to take their initial sides before the arguments. Demonstration only.',
  'group-judges':'After both arguments, Judges have 10 seconds to stay or switch sides. At the buzzer, only Judges behind a Player count. Demonstration only.',
  judges:'Count final votes for each player’s argument. Starting positions do not score points. This tally is only an example.',
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
      <StandScene kind={kind}/>
    </div>
    <p className="guidance-caption">{captions[kind]}</p>
  </section>;
}

function Debater({name,position=false}:{name:string;position?:boolean}) {
  return <div className={`stand-debater debater-${name.toLowerCase()}`}><Person/><strong>Player {name}</strong>{position&&<span className="stand-choice agree">AGREE</span>}</div>;
}
function Positions() {
  return <div className="stand-positions"><span className="agree">AGREE</span><span className="disagree">DISAGREE</span><span className="depends">IT DEPENDS</span></div>;
}
function StandScene({kind}:{kind:GuidanceVisual}) {
  if(kind==='questions')return <div className="guide-sequence"><div className="guide-prop"><div className="guide-small-card new-question">?<span>Write a question</span><b className="question-pencil">✎</b></div><span>Your ideas</span></div><span className="guide-flow-arrow">→</span><div className="guide-prop"><Positions/><span>A stand worth discussing</span></div><span className="guide-flow-arrow">→</span><div className="guide-prop"><div className="stand-bowl"><span className="bowl-slip slip-one">?</span><span className="bowl-slip slip-two">?</span><div/></div><span>Fold, mix & play again</span></div></div>;
  if(kind==='arena'||kind==='group-position'||kind==='group-judges')return <PhysicalStand kind={kind}/>;
  if(kind==='opponent')return <div className="guide-sequence"><div className="stand-duel"><Debater name="A"/><span className="stand-versus">vs</span><Debater name="B"/></div><span className="guide-flow-arrow">→</span><div className="guide-prop stand-judges"><div className="guide-people"><Person/><Person/><Person/></div><strong>More players?</strong><span>You’re the Judges</span></div></div>;
  if(kind==='stand')return <div className="guide-sequence"><div className="guide-prop stand-build"><Positions/><div className="stand-options"><span>Flat</span><span className="stand-cube">3D</span></div><span>Choose your format</span></div><span className="guide-flow-arrow">→</span><div className="guide-prop"><div className="stand-paper-strip"><span>?<small>Cut</small></span><span>?<small>Fold</small></span></div><span>Prepare the questions</span></div><span className="guide-flow-arrow">→</span><div className="guide-prop"><div className="stand-bowl"><span className="bowl-slip slip-one">?</span><span className="bowl-slip slip-two">?</span><span className="bowl-slip slip-three">?</span><div/></div><span>Mix in a bowl</span></div></div>;
  if(kind==='position')return <div className="guide-sequence"><div className="guide-prop"><div className="guide-small-card">?<span>Read aloud</span></div><span>Draw a question</span></div><div className="guide-prop"><div className="stand-countdown">{[5,4,3,2,1].map((n,i)=><span key={n} style={{'--count-start':`${i}s`} as CSSProperties}>{n}</span>)}</div><span>5 seconds to choose</span></div><div className="guide-prop"><Positions/><div className="stand-position-marker">▲</div><span>Judges choose before arguments</span></div></div>;
  if(kind==='case')return <div className="guide-sequence"><div className="guide-prop"><Debater name="A" position/><span className="guide-speech stand-argument-a">I chose this because…</span></div><div className="guide-prop"><span className="stand-listen">↔</span><span>Explain · Listen · Respond</span><small className="stand-same-note">Same position? Different reasons.</small></div><div className="guide-prop"><Debater name="B" position/><span className="guide-speech stand-argument-b">I see it this way…</span></div></div>;
  if(kind==='judges')return <div className="guide-sequence"><div className="guide-prop"><div className="stand-initial"><span className="agree">AGREE</span><span className="disagree">DISAGREE</span><span className="depends">IT DEPENDS</span></div><span>Starting positions</span><small>Not scored</small></div><span className="guide-flow-arrow">→</span><div className="guide-prop"><div className="stand-ballots">{['A','B','A'].map((vote,i)=><div className={`stand-ballot vote-${i}`} key={i}><Person/><span className={`ballot-${vote.toLowerCase()}`}>{vote}</span></div>)}</div><span>Vote for an argument</span></div><span className="guide-flow-arrow">→</span><div className="guide-prop"><div className="stand-score"><span>A · 2 points</span><span>B · 1 point</span></div><span>1 Judge = 1 point</span><small>Example final tally</small></div></div>;
  return null;
}

function PhysicalStand({kind}:{kind:'arena'|'group-position'|'group-judges'}) {
  const final=kind==='group-judges';
  return <div className="physical-stand">
    {kind==='group-position'&&<div className="physical-timing"><span>Players · 5 seconds</span><span>Then Judges · 10 seconds</span></div>}
    {final&&<div className="physical-timing"><span>Both arguments heard</span><span>Judges · 10 seconds to reposition</span></div>}
    <div className={`stand-arena ${final?'arena-final':''} ${kind==='group-position'?'arena-initial':''}`}>
      <div className="arena-player arena-player-a"><Person/><strong>Player A</strong></div>
      <div className="arena-table"><span>BOARD</span><small>Central table</small></div>
      <div className="arena-player arena-player-b"><Person/><strong>Player B</strong></div>
      <span className="arena-behind behind-a">Behind A</span><span className="arena-behind behind-b">Behind B</span>
      <div className="arena-judge judge-one"><Person/></div><div className="arena-judge judge-two"><Person/></div><div className="arena-judge judge-three"><Person/></div>
      <span className="arena-judges-label">Judges start here</span>
    </div>
    {final?<div className="physical-result"><strong>At the buzzer: count final positions</strong><span>Behind neither Player? No vote this round.</span></div>:<div className="physical-result"><span>{kind==='arena'?'Run behind the Player you support.':'Initial positions do not score points.'}</span></div>}
  </div>;
}
