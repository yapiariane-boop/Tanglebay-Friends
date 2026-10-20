import type {GuidanceSection} from './content';

export default function SectionedGuidance({sections,current,reached,onSelect,onNext,onPrevious,nextLabel}:{
  sections:GuidanceSection[];
  current:number;
  reached:number;
  onSelect:(index:number)=>void;
  onNext:()=>void;
  onPrevious:()=>void;
  nextLabel:string;
}) {
  let offset=0;
  return <div className="guidance-sections">{sections.map((section,i)=>{
    const start=offset;
    offset+=section.steps.length;
    const active=current>=start&&current<offset;
    const completed=Math.max(0,Math.min(section.steps.length,reached-start));
    const step=active?section.steps[current-start]:undefined;
    return <section key={section.id} className={`guidance-section guidance-section-${section.id}${active?' is-active':''}`} aria-labelledby={`guidance-${section.id}`}>
      <div className="guidance-section-heading"><span className="guidance-section-number">0{i+1}</span><div><h2 id={`guidance-${section.id}`}>{section.title}</h2><p>{section.description}</p></div><span className="guidance-section-status">{completed===section.steps.length?'Completed':active?`Step ${current-start+1} of ${section.steps.length}`:'Up next'}</span></div>
      <ol className="section-step-list" aria-label={`${section.title} steps`}>{section.steps.map((item,j)=>{
        const index=start+j;
        return <li key={item.id}><button type="button" disabled={index>reached} aria-current={index===current?'step':undefined} onClick={()=>onSelect(index)}><span>{index<reached?'✓':j+1}</span>{item.title}</button></li>;
      })}</ol>
      {step&&<article className="section-step-content"><p className="eyebrow">{section.placeholder===false?'ACTIVITY GUIDE':'CONTENT PLACEHOLDER'}</p><h3>{step.title}</h3>{step.lead&&<p className="section-step-lead"><strong>{step.lead}</strong></p>}{step.body&&<p className="section-step-body">{step.body}</p>}{step.items&&<ul className="section-step-items">{step.items.map(item=><li key={item}>{item}</li>)}</ul>}{step.closing&&<p><strong>{step.closing}</strong></p>}<div className="actions"><button type="button" className="secondary" onClick={onPrevious}>{current===0?'Change play setup':'Previous step'}</button><button type="button" className="button" onClick={onNext}>{nextLabel} <span aria-hidden="true">→</span></button></div></article>}
    </section>;
  })}</div>;
}
