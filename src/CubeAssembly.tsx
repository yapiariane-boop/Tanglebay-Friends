import {useEffect, useRef, useState, type CSSProperties} from 'react';
import type {Variant} from './content';

const stages=['Cut out','Fold','Glue tabs','Place on board'];
const previewTimes=[0,3.3,5.2,7.2];

export default function CubeAssembly({guide}:{guide:NonNullable<Variant['cubeAssembly']>}) {
  const [playing,setPlaying]=useState(false);
  const [frame,setFrame]=useState(0);
  const [inView,setInView]=useState(typeof IntersectionObserver==='undefined');
  const [visible,setVisible]=useState(!document.hidden);
  const [reduced,setReduced]=useState(()=>window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false);
  const ref=useRef<HTMLElement>(null);
  useEffect(()=>{
    const visibility=()=>setVisible(!document.hidden);
    document.addEventListener('visibilitychange',visibility);
    const media=window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const motion=()=>setReduced(media?.matches??false);
    media?.addEventListener('change',motion);
    const observer=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>setInView(entries.some(e=>e.isIntersecting)));
    if(ref.current)observer?.observe(ref.current);
    return()=>{observer?.disconnect();document.removeEventListener('visibilitychange',visibility);media?.removeEventListener('change',motion);};
  },[]);
  const style={'--pattern':`url("${guide.patternSrc}")`,'--assembly-delay':`${-previewTimes[frame]}s`} as CSSProperties;
  const running=playing&&inView&&visible&&!reduced;
  return <section className="cube-assembly" ref={ref} style={style} data-running={running} data-frame={frame} data-reduced={reduced} aria-label="Build your 3D button">
    <div className="assembly-heading"><div><p className="eyebrow">OPTIONAL 3D VERSION</p><h3>Build your smashable buttons</h3></div>{!reduced&&<button type="button" className="secondary" aria-pressed={playing} onClick={()=>{if(!playing)setFrame(0);setPlaying(p=>!p);}}>{playing?'Pause assembly animation':'Play assembly animation'}</button>}</div>
    <p>The red DISAGREE button is shown here. Use the same method for AGREE and IT DEPENDS.</p>
    <div className="assembly-workspace" aria-hidden="true">
      <span className="assembly-work-label">Your paper template</span><span className="assembly-board-label">Matching board space</span>
      <img className="assembly-board" src={guide.boardSrc} alt="" loading="lazy" decoding="async"/>
      <div className="assembly-target"/>
      <div className="assembly-traveller"><div className="assembly-net"><div className="cube-face cube-front"/><div className="cube-face cube-left"/><div className="cube-face cube-right"/><div className="cube-face cube-top"/><div className="cube-face cube-bottom"><div className="cube-face cube-back"/></div></div></div>
      <div className="assembly-phase-labels"><span>Cut around the outside</span><span>Fold along the edges</span><span>Glue the tabs closed</span><span>Glue the base to DISAGREE</span></div>
    </div>
    <div className="assembly-controls" role="group" aria-label="Assembly stages">{stages.map((name,i)=><button type="button" key={name} aria-pressed={!playing&&frame===i} onClick={()=>{setPlaying(false);setFrame(i);}}>{i+1}. {name}</button>)}</div>
    <ol className="assembly-instructions"><li><strong>Cut:</strong> cut around the outside of the template, keeping the glue tabs.</li><li><strong>Fold:</strong> fold the square faces along their shared edges, and fold the tabs inward.</li><li><strong>Glue:</strong> glue the tabs inside the neighbouring faces to close the paper cube.</li><li><strong>Place:</strong> add glue to the bottom face and attach the cube to its matching labelled space on the board. Let it dry before playing.</li></ol>
    <details className="assembly-template"><summary>See the full template, including glue tabs</summary><img src={guide.patternSrc} alt="Complete red DISAGREE cube template, with six square faces and glue tabs." loading="lazy" decoding="async"/></details>
    <p className="quiet">The folding animation is a simplified illustration. Follow the full printed template for the tabs and cut lines. Prefer the flat version? You can skip this craft.</p>
  </section>;
}
