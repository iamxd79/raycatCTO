import Image from 'next/image';
import './flywheel.css';

const stages = [
  ['Activity', 'Across the StonkFun ecosystem.'],
  ['Capital', 'Flows into the ecosystem flywheel.'],
  ['Buy', 'Open-market purchases of eligible tokens.'],
  ['Burn', 'Purchased tokens leave circulation permanently.'],
];

export default function Flywheel() {
  return <section className="flywheel-feature section" id="flywheel" aria-labelledby="flywheel-title">
    <div className="flywheel-heading"><p className="eyebrow">STONKFUN FLYWHEEL</p><h2 id="flywheel-title">THE WHEEL<br/>KEEPS TURNING.</h2></div>
    <div className="flywheel-layout">
      <figure className="flywheel-figure">
        <Image src="/image/07-the-flywheel.png" alt="RayCat watching an antique industrial flywheel purchase and burn tokens" width={900} height={1100} sizes="(max-width: 800px) 90vw, 48vw"/>
        <figcaption><span>THE MECHANISM</span><span>STONKFUN / ECOSYSTEM</span></figcaption>
      </figure>
      <div className="flywheel-process">
        <p className="flywheel-intro">One ecosystem.<br/><span>A continuing cycle.</span></p>
        <ol>{stages.map(([title,description],index)=><li key={title}><span className="flywheel-number">0{index+1}</span><div><h3>{title}</h3><p>{description}</p></div><span className="flywheel-direction" aria-hidden="true">{index===3?'↗':'↓'}</span></li>)}</ol>
        <div className="flywheel-allocation"><span className="eyebrow">WHERE RAYCAT FITS</span><p>When eligible and allocated capital, $RAYCAT can be bought on the open market and permanently burned.</p></div>
      </div>
    </div>
    <p className="flywheel-disclaimer">The flywheel belongs to the broader StonkFun ecosystem. Rankings and allocations change with market cap. Inclusion does not guarantee future buybacks.</p>
  </section>;
}
