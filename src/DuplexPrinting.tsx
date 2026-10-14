import {useEffect, useRef, useState} from 'react';
import type {DuplexGuide} from './content';

export default function DuplexPrinting({guide}:{guide:DuplexGuide}) {
  const [paused,setPaused]=useState(true);
  const [visible,setVisible]=useState(typeof IntersectionObserver==='undefined');
  const [tabVisible,setTabVisible]=useState(!document.hidden);
  const demoRef=useRef<HTMLElement>(null);
  useEffect(()=>{
    const update=()=>setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange',update);
    const observer=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>setVisible(entries[0]?.isIntersecting??false));
    if(demoRef.current)observer?.observe(demoRef.current);
    return()=>{document.removeEventListener('visibilitychange',update);observer?.disconnect();};
  },[]);
  return <div className="duplex-guide">
    <div className="pack-previews">{guide.previews.map(page=><figure key={page.src}><img loading="lazy" decoding="async" src={page.src} alt={page.alt}/><figcaption>{page.label}</figcaption></figure>)}</div>
    <section ref={demoRef} className="duplex-demo" aria-label="How to print double-sided cards" data-paused={paused||!visible||!tabVisible}>
      <div className="duplex-demo-heading"><div><p className="eyebrow">TWO PAGES. ONE SHEET.</p><h3>One sheet, twice the conversation.</h3></div><button className="secondary motion-toggle" type="button" onClick={()=>setPaused(p=>!p)} aria-pressed={paused}>{paused?'Play animation':'Pause animation'}</button></div>
      <div className="duplex-scenes" aria-hidden="true">
        <div className="duplex-scene"><div className="duplex-two-pages">{guide.previews.map((page,i)=><div className="mini-page" key={page.src}><img loading="lazy" decoding="async" src={page.src} alt=""/><span>{i===0?'FRONT':'BACK'}</span></div>)}</div><strong>2 PDF pages</strong></div>
        <span className="duplex-arrow">→</span>
        <div className="duplex-scene"><div className="sheet-perspective"><div className="turning-sheet"><div className="sheet-face sheet-front"><img loading="lazy" decoding="async" src={guide.previews[0].src} alt=""/><span>FRONT</span></div><div className="sheet-face sheet-back"><img loading="lazy" decoding="async" src={guide.previews[1].src} alt=""/><span>BACK</span></div></div></div><strong>1 sheet · both sides</strong></div>
        <span className="duplex-arrow">→</span>
        <div className="duplex-scene"><div className="cut-cards">{Array.from({length:guide.cards},(_,i)=><span key={i}>✦</span>)}</div><strong>{guide.cards} double-sided cards</strong></div>
      </div>
      <p className="duplex-explanation">The two PDF pages are the front and back of the same sheet. Print both sides first, then cut out your eight cards.</p>
    </section>
    <div className="print-settings"><h3>Choose these settings in your print window</h3><ul><li><strong>Pages:</strong> both pages (1–2)</li><li><strong>Print on both sides:</strong> on · flip on the <strong>short edge</strong></li><li><strong>Orientation:</strong> {guide.orientation.toLowerCase()}</li><li><strong>Paper:</strong> A4 or Letter, to match the paper in your printer</li><li><strong>Scale:</strong> fit to printable area · use the same scaling on both sides</li><li><strong>Pages per side:</strong> 1 · no booklet or multiple-page layout</li></ul><p className="print-test"><strong>Try one plain-paper sheet first.</strong> The PDF uses an oversized custom page format. Short-edge flipping matches its layout; check that both sides are upright and the dotted card outlines line up when held to the light. Printer margins can affect alignment.</p><p>If your printer cannot print both sides automatically, print page 1, reinsert the same sheet following your printer’s instructions, then print page 2. Test the feed direction before using your final paper.</p></div>
  </div>;
}
