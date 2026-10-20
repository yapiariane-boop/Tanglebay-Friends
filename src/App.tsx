import { useEffect, useRef, useState } from 'react';
import { activities, episodes, homeArtwork, logoArtwork, homepage, type Activity, type Episode, type Mode } from './content';
import './style.css';
import DuplexPrinting from './DuplexPrinting';
import GuidanceAnimation from './GuidanceAnimation';
import CubeAssembly from './CubeAssembly';
import SectionedGuidance from './SectionedGuidance';

function go(path: string) { window.location.hash = path; }
export default function App() {
  const [path,setPath] = useState(window.location.hash.slice(1) || '/');
  const [progress,setProgress] = useState<Record<string,number>>({});
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(()=>{const update=()=>setPath(window.location.hash.slice(1)||'/');window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update);},[]);
  useEffect(()=>{heading.current?.focus();window.scrollTo(0,0);},[path]);
  const parts=path.split('/').filter(Boolean);
  const episode=episodes.find(e=>e.id===parts[1]);
  const activity=activities.find(a=>a.id===parts[3] && a.episodeIds.includes(parts[1]) && !episode?.comingSoon);
  const mode: Mode | undefined=parts[4]==='home'||parts[4]==='group'?parts[4]:undefined;
  const base=episode?`/episodes/${episode.id}`:'/episodes';
  const activityBase=activity?`${base}/activities/${activity.id}`:base;
  const key=activity&&mode?`${activity.id}:${mode}`:'';
  const variant=activity&&mode?activity.variants[mode]:undefined;
  const stepNumber=Number(parts[6]);
  const validStep=variant&&parts[5]==='steps'&&Number.isInteger(stepNumber)&&stepNumber>=0&&stepNumber<variant.steps.length;
  const reached=progress[key] ?? 0;
  const allowedStep=validStep&&stepNumber<=reached;
  const canPrint=variant&&reached>=variant.steps.length;
  const isHome=path==='/';
  const isEpisodes=path==='/episodes';
  const isEpisode=parts.length===2&&parts[0]==='episodes'&&episode;
  const isActivity=parts.length===4&&parts[0]==='episodes'&&parts[2]==='activities'&&activity;
  const isSteps=parts.length===7&&allowedStep;
  const isPrint=parts.length===6&&parts[5]==='print'&&canPrint;
  const title=isHome?'The story doesn’t end on the last page.':isEpisodes?'Which episode did you read?':isEpisode?episode.title:isActivity?activity.title:isSteps?(variant!.guidanceSections?'Prepare & Play':variant!.steps[stepNumber].title):isPrint?'You’re ready to print!':'Let’s find your next step';
  function start(selected: Mode) {setProgress(p=>({...p,[`${activity!.id}:${selected}`]:0}));go(`${activityBase}/${selected}/steps/0`);}
  function next() {const n=stepNumber+1;setProgress(p=>({...p,[key]:Math.max(p[key]??0,n)}));go(n===variant!.steps.length?`${activityBase}/${mode}/print`:`${activityBase}/${mode}/steps/${n}`);}
  return <><header><a className="brand" href="#/" aria-label="Tanglebay’s Friends home"><img className="logo-artwork" src={logoArtwork.src} alt=""/><span className="wordmark">TANGLEBAY FRIENDS<small>FROM STORY TO PLAY</small></span></a><a className="header-link" href="#/episodes">Explore episodes <span aria-hidden="true">↗</span></a></header>
    <main>
      {isHome && homepage.banner ? <div className="homepage-banner"><img src={homepage.banner.src} alt={homepage.banner.alt}/></div> : <div className="prototype">PHASE 1 PROTOTYPE <span>• Peach background edition · Placeholder story & printables</span></div>}
      {!isHome&&<nav aria-label="Breadcrumb"><a href="#/">Home</a><span>/</span><a href="#/episodes">Episodes</a>{episode&&<><span>/</span><a href={`#${base}`}>{episode.title}</a></>}{activity&&<><span>/</span><a href={`#${activityBase}`}>{activity.title}</a></>}{mode&&<><span>/</span><span>{mode==='home'?'Home play':'Group play'}</span></>}</nav>}
      <section className={isHome?'hero':'intro'}>
        <div><p className="eyebrow">{isHome?'A LITTLE WONDER. A NEW ADVENTURE. FUN SCIENCE.':isSteps?'PREPARE TO PLAY':isPrint?'YOUR SELECTED PRINTABLE PACK':'RETURN TO THE WORLD OF THE BOOK'}</p><h1 ref={heading} tabIndex={-1}>{title}</h1>
          {isHome&&<><p className="lead story-lines"><span className="story-first-line"><span className="story-read">Read the story.</span>{' '}<span className="story-return">Return to its world.</span></span></p><p>Explore printable activities inspired by your favorite Tanglebay characters and episodes.</p><a className="button" href="#/episodes">Find your episode <span aria-hidden="true">→</span></a><p className="quiet">For curious readers aged 7–11 and the adults beside them.</p></>}
          {isEpisodes&&<p className="lead">Start with the story, then find something to play.</p>}
          {isEpisode&&<p className="lead">{episode.description}</p>}
          {isActivity&&<p className="lead">{activity.description}</p>}
          {(isSteps||isPrint)&&<p className="lead">{activity!.title} · {mode==='home'?'Home':'Group'} version</p>}
        </div>{isHome&&<div className="home-artwork"><img src={homeArtwork.src} alt={homeArtwork.alt} width="1073" height="1465" fetchPriority="high"/></div>}
      </section>
      {isHome&&<section className="journey" aria-label="How it works">{homepage.journeySteps.map((step,i)=><div key={step.title}><div className="journey-artwork-space">{step.artwork && <img loading="lazy" decoding="async" className="journey-artwork" src={step.artwork.src} alt={step.artwork.alt}/>}</div><span>0{i+1}</span><h2>{step.title}</h2></div>)}</section>}
      {isEpisodes&&<div className="grid">{episodes.map((e,i)=><EpisodeCard key={e.id} episode={e} index={i}/>)}</div>}
      {isEpisode&&episode.comingSoon&&<div className="notice"><strong>Coming soon</strong><p>This episode’s activities will be available when it’s ready.</p><a href="#/episodes">Back to episodes</a></div>}
      {isEpisode&&!episode.comingSoon&&<><h2 className="section-title">Play with this episode</h2><div className="grid activities">{activities.filter(a=>a.episodeIds.includes(episode.id)).map(a=><ActivityCard key={a.id} activity={a} href={`#${base}/activities/${a.id}`}/>)}</div></>}
      {isActivity&&<section><h2 className="section-title">How will you play?</h2><p>Each setup has its own preparation steps and printable materials.</p><div className="grid">{(['home','group'] as Mode[]).map(m=><button className="card setup" key={m} onClick={()=>start(m)}><span className="mode-icon" aria-hidden="true">{m==='home'?'⌂':'✳'}</span><h2>{m==='home'?'I’m playing at home':'I’m playing with a group'}</h2><p>{m==='home'?'Explore with a child, a family or a few friends.':'Prepare shared materials and guide a team experience.'}</p><p className="quiet">{activity.variants[m].players}</p><span className="card-link">Prepare this version →</span></button>)}</div></section>}
      {isSteps&&<section className="facilitation">{variant!.guidanceSections?<SectionedGuidance sections={variant!.guidanceSections} current={stepNumber} reached={reached} onSelect={index=>go(`${activityBase}/${mode}/steps/${index}`)} onNext={next} onPrevious={()=>go(stepNumber===0?activityBase:`${activityBase}/${mode}/steps/${stepNumber-1}`)} nextLabel={stepNumber===variant!.steps.length-1?'I’m Ready to Print':stepNumber===variant!.guidanceSections[0].steps.length-1?'Continue to How to Play':'Next step'}/>:<><div className="step-header"><span>Step {stepNumber+1} of {variant!.steps.length}</span><span>{variant!.duration}</span></div><progress value={stepNumber+1} max={variant!.steps.length} aria-label="Preparation progress"/><article className="step-card" key={`${key}:${stepNumber}`}><span className="eyebrow">{mode==='home'?'HOME PLAY':'GROUP PLAY'} · {variant!.guidanceLabel || 'EXAMPLE GUIDANCE'}</span><h2>{variant!.steps[stepNumber].title}</h2><p>{variant!.steps[stepNumber].body}</p>{variant!.steps[stepNumber].visual&&<GuidanceAnimation key={`${key}:${stepNumber}`} kind={variant!.steps[stepNumber].visual!}/>}{variant!.steps[stepNumber].items&&<ul>{variant!.steps[stepNumber].items!.map(item=><li key={item}>{item}</li>)}</ul>}</article></>}{!variant!.guidanceSections&&<div className="actions"><button className="secondary" onClick={()=>go(stepNumber===0?activityBase:`${activityBase}/${mode}/steps/${stepNumber-1}`)}>{stepNumber===0?'Change play setup':'Previous step'}</button><button className="button" onClick={next}>{stepNumber===variant!.steps.length-1?'I’m Ready to Print':'Next step'} <span aria-hidden="true">→</span></button></div>}</section>}
      {isPrint&&<section>{!variant!.files.every(f=>f.placeholder===false)&&<div className="notice"><strong>Demonstration materials only</strong><p>These downloadable PDFs are placeholders, not finished activities. All suggested player numbers, timings and copy counts need author approval.</p></div>}<h2 className="section-title">{mode==='home'?'Your home pack':'Your group pack'}</h2>{variant!.duplexGuide&&<DuplexPrinting guide={variant!.duplexGuide}/>}<p>{variant!.printing}</p>{variant!.cubeAssembly&&<CubeAssembly guide={variant!.cubeAssembly}/>}<div className="file-list">{variant!.files.map(file=><article className="file-card" key={file.id}><div><span className="eyebrow">{file.placeholder===false?`PRINTABLE PDF${file.pageCount ? ` · ${file.pageCount} PAGES` : ''}`:'PLACEHOLDER PDF'}{file.optional?' · OPTIONAL':''}</span><h3>{file.title}</h3><p>{file.copies}</p></div><a className="button secondary" href={file.href} download>Download PDF <span aria-hidden="true">↓</span></a></article>)}{variant!.comingSoonFiles?.map(title=><article className="file-card" key={title}><div><span className="eyebrow">COMING SOON</span><h3>{title}</h3><p>This guide will be added here when it’s ready.</p></div></article>)}</div><div className="actions"><button className="secondary" onClick={()=>go(`${activityBase}/${mode}/steps/${variant!.steps.length-1}`)}>Review preparation</button><a href={`#${activityBase}`}>Change play setup</a><a href={`#${base}`}>Back to episode</a></div></section>}
      {!isHome&&!isEpisodes&&!isEpisode&&!isActivity&&!isSteps&&!isPrint&&<div className="notice"><p>{variant?'Complete the preparation steps in this session before opening the print pack. Refreshing starts a new preparation session.':'This page could not be found. Choose an episode to continue.'}</p><a className="button" href={variant?`#${activityBase}/${mode}/steps/${Math.min(reached,variant.steps.length-1)}`:'#/episodes'}>{variant?'Continue preparation':'Explore episodes'}</a></div>}
    </main><footer><span>Tanglebay’s Friends</span><p>A story-led activity experience · Phase 1 structural prototype</p></footer></>;
}
function ActivityCard({activity,href}:{activity:Activity;href:string}) {
  const images=activity.gallery?.length?activity.gallery:activity.artwork.src?[{src:activity.artwork.src,alt:activity.artwork.alt}]:[];
  const [index,setIndex]=useState(0);
  const [hovered,setHovered]=useState(false);
  const [focused,setFocused]=useState(false);
  const [paused,setPaused]=useState(false);
  const touchStart=useRef<number|null>(null);
  const swiped=useRef(false);
  const multiple=images.length>1;
  useEffect(()=>{
    if(!hovered||focused||paused||!multiple||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
    if(document.hidden)return;
    const timer=window.setInterval(()=>setIndex(i=>(i+1)%images.length),2500);
    const stopWhenHidden=()=>{if(document.hidden){window.clearInterval(timer);setHovered(false);}};
    document.addEventListener('visibilitychange',stopWhenHidden);
    return()=>{window.clearInterval(timer);document.removeEventListener('visibilitychange',stopWhenHidden);};
  },[hovered,focused,paused,multiple,images.length]);
  function move(next:number){setPaused(true);setIndex((next+images.length)%images.length);}
  return <article className="card activity-card" onFocusCapture={()=>setFocused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node|null))setFocused(false);}}>
    <div className="activity-gallery" role={multiple?'region':undefined} aria-label={multiple?`${activity.title} image carousel`:undefined} onMouseEnter={()=>{setHovered(true);setPaused(false);}} onMouseLeave={()=>setHovered(false)} onTouchStart={e=>{touchStart.current=e.touches[0].clientX;swiped.current=false;}} onTouchEnd={e=>{if(touchStart.current!==null&&multiple){const delta=e.changedTouches[0].clientX-touchStart.current;if(Math.abs(delta)>45){move(index+(delta<0?1:-1));swiped.current=true;}}touchStart.current=null;}}>
      <a className={`activity-art ${activity.color}`} href={href} onClick={e=>{if(swiped.current){e.preventDefault();swiped.current=false;}}} aria-label={`Choose how to play ${activity.title}`}>
        {images.length?<img loading="lazy" decoding="async" key={images[index].src} src={images[index].src} alt={images[index].alt}/>:<><span aria-hidden="true">✦</span><small>Artwork placeholder</small></>}
      </a>
      {multiple&&<><div className="carousel-arrows"><button type="button" onClick={()=>move(index-1)} aria-label={`Previous ${activity.title} image`}>‹</button><button type="button" onClick={()=>move(index+1)} aria-label={`Next ${activity.title} image`}>›</button></div><div className="carousel-dots">{images.map((img,i)=><button key={img.src} type="button" aria-label={`Show ${activity.title} image ${i+1} of ${images.length}`} aria-pressed={index===i} onClick={()=>move(i)}><span/></button>)}</div>{hovered&&<button className="carousel-pause" type="button" onClick={()=>setPaused(p=>!p)} aria-label={paused?'Resume image slideshow':'Pause image slideshow'}>{paused?'Play':'Pause'}</button>}</>}
    </div>
    <a className="activity-card-link" href={href}><h2>{activity.title}</h2><p className="activity-catchphrase">{activity.catchphrase}</p><p className="activity-description">{activity.description}</p><span className="card-link">Choose how to play →</span></a>
  </article>;
}

function EpisodeCard({episode,index}:{episode:Episode;index:number}) {
  const content=<>{episode.artwork&&<img loading="lazy" decoding="async" className="episode-background" src={episode.artwork.src} alt={episode.artwork.alt}/>}<div className="episode-card-content"><span className="episode-label">EPISODE {index+1}</span><h2>{episode.title}</h2><span className="card-link">{episode.comingSoon?'Coming soon':`Explore ${activities.filter(a=>a.episodeIds.includes(episode.id)).length} activities →`}</span></div></>;
  return episode.comingSoon?<article className={`card episode-card upcoming${episode.artwork ? ' illustrated' : ''}`} aria-label={`${episode.title} — Coming soon`}>{content}</article>:<a className="card episode-card illustrated" href={`#/episodes/${episode.id}`}>{content}</a>;
}
