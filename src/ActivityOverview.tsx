import {useState} from 'react';
import type {Activity} from './content';

export default function ActivityOverview({activity}:{activity:Activity}) {
  const [index,setIndex]=useState(0);
  // The preparation overview is omitted because it contains an outdated page count.
  const images=(activity.gallery??[]).filter(img=>activity.id!=='officers-investigation'||!img.src.endsWith('investigation-image-1.webp'));
  const selected=images[index];
  return <section className="activity-overview" aria-labelledby="activity-overview-heading">
    <div className="activity-overview-copy"><p className="eyebrow">A PEEK AT THE ADVENTURE</p><h2 id="activity-overview-heading">{activity.introduction.headline}</h2><p>{activity.introduction.body}</p><a className="button secondary" href="#choose-setup" onClick={event=>{event.preventDefault();document.getElementById('choose-setup')?.scrollIntoView({behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});document.getElementById('choose-setup')?.focus({preventScroll:true});}}>Choose how to play <span aria-hidden="true">↓</span></a></div>
    {selected&&<div className="activity-preview" role="region" aria-label={`${activity.title} preview gallery`}>
      <div className="activity-preview-stage"><img src={selected.src} alt={selected.alt}/></div>
      {images.length>1&&<><div className="activity-preview-controls"><button type="button" className="secondary" aria-label="Previous preview image" onClick={()=>setIndex((index-1+images.length)%images.length)}>←</button><span role="status">{index+1} / {images.length}</span><button type="button" className="secondary" aria-label="Next preview image" onClick={()=>setIndex((index+1)%images.length)}>→</button></div><div className="activity-preview-thumbnails">{images.map((img,i)=><button type="button" key={img.src} aria-label={`Show preview image ${i+1}: ${img.alt}`} aria-pressed={i===index} onClick={()=>setIndex(i)}><img src={img.src} alt="" loading="lazy"/></button>)}</div></>}
    </div>}
  </section>;
}
