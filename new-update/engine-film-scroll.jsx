// CordiVivo Engine Film — Scroll v2: Bigger, deeper, varied
// Patient: Hans Müller, 62, NYHA II, KHK, post-CABG, 6MWT 380m

const C = {
  bg: '#f0f3f8', surface: '#eef1ec', card: 'rgba(255,255,255,.94)',
  ink: '#1a2030', ink2: '#3a4560', muted: '#7a8698',
  brand: '#2a6f9e', accent: '#2e8f82', red: '#b84040',
  purple: '#5c6fa0', amber: '#8a7040', line: 'rgba(11,18,32,.07)'
};
const FONT = '"Space Grotesk", "Inter", system-ui, sans-serif';
const SERIF = FONT; // professionalize: drop editorial serif, use sans throughout for clinical register
const MONO = '"JetBrains Mono", "SF Mono", monospace';

// ─── Mobile responsive helper ───
const mobileBreak = '(max-width: 900px)';
const useMobile = () => {
  const [m, setM] = React.useState(window.matchMedia(mobileBreak).matches);
  React.useEffect(() => {
    const mq = window.matchMedia(mobileBreak);
    const h = (e) => setM(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return m;
};


// ─── Hooks ───
function useInView(ref, threshold = 0.05) {
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {setVis(true);}
    const obs = new IntersectionObserver(([e]) => {if (e.isIntersecting) {setVis(true);obs.disconnect();}}, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return vis;
}

function useMouse() {
  const [m, setM] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    const h = (e) => setM({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 });
    window.addEventListener('mousemove', h, { passive: true });
    return () => window.removeEventListener('mousemove', h);
  }, []);
  return m;
}

// ─── Animated counter hook ───
function useCounter(target, duration = 1200, decimals = 0) {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  const vis = useInView(ref);
  React.useEffect(() => {
    if (!vis) return;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setVal(parseFloat((target * eased).toFixed(decimals)));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [vis, target, duration, decimals]);
  return [val, ref];
}

// ─── Floating particle dots — disabled for clinical register ───
function FloatingDots() { return null; }

// ─── Animated connection line — replaced with static rule for calmer register ───
function PulseLine({ color = C.brand, vertical = true }) {
  return (
    <div style={{
      width: vertical ? 1 : '100%', height: vertical ? 32 : 1,
      background: vertical
        ? `linear-gradient(180deg, transparent, ${color}30, transparent)`
        : `linear-gradient(90deg, transparent, ${color}30, transparent)`,
      margin: vertical ? '0 auto' : '0'
    }}></div>);
}
// ─── Animated number display ───
function AnimNum({ target, decimals = 0, color = C.brand, unit = '' }) {
  const [val, ref] = useCounter(target, 1200, decimals);
  return (
    <div ref={ref}>
      <div style={{ fontFamily: FONT, fontSize: 48, fontWeight: 500, color, lineHeight: 1 }}>{decimals > 0 ? val.toFixed(decimals) : val}</div>
      {unit && <div style={{ fontFamily: MONO, fontSize: 12, color: C.muted, marginTop: 4 }}>{unit}</div>}
    </div>);

}

// ─── Live indicator (blinking dot + LIVE label) ───
function LiveIndicator({ label = 'LIVE', color = C.accent }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <div style={{
        width: 7, height: 7, borderRadius: '50%', background: color,
        boxShadow: `0 0 6px ${color}`,
        animation: 'liveBlink 1.8s ease-in-out infinite'
      }}></div>
      <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '.14em', fontWeight: 700, color }}>{label}</span>
    </div>);

}

// ─── Processing bar (sweeping highlight) ───
function ProcessingBar({ color = C.brand, label = 'Verarbeitung...' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 8, background: `${color}06`, border: `1px solid ${color}15` }}>
      <div style={{ flex: 1, height: 3, borderRadius: 2, background: `${color}12`, overflow: 'hidden', position: 'relative' }}>
        <div style={{
          position: 'absolute', width: '30%', height: '100%', borderRadius: 2,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          animation: 'processSweep 2s ease-in-out infinite'
        }}></div>
      </div>
      <span style={{ fontFamily: MONO, fontSize: 9, color, letterSpacing: '.08em', fontWeight: 600, whiteSpace: 'nowrap' }}>{label}</span>
    </div>);

}

// ─── Status stamp (checkmark or alert) ───
function StatusStamp({ status = 'ok', label }) {
  const isOk = status === 'ok';
  const color = isOk ? C.accent : C.red;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 16px', borderRadius: 10,
      background: `${color}08`, border: `1px solid ${color}20`
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: 6,
        background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11
      }}>{isOk ? '✓' : '!'}</div>
      <span style={{ fontFamily: MONO, fontSize: 11, color, fontWeight: 600 }}>{label}</span>
    </div>);

}

// ─── Ticking timestamp — disabled (live tickers read marketing, not medical) ───
function LiveTimestamp() {
  return (
    <span style={{ fontFamily: MONO, fontSize: 11, color: C.muted, letterSpacing: '.06em' }}>
      Sitzungs‑Log
    </span>);
}

// ─── Layer node (for pipeline connection) ───
function LayerNode({ color = C.brand, id = 'L0' }) {
  const isMobile = useMobile();
  if (isMobile) return null;
  return (
    <div style={{
      position: 'absolute', left: -44, top: '50%', transform: 'translateY(-50%)',
      width: 32, height: 32, borderRadius: 10,
      background: C.bg, border: `2px solid ${color}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: MONO, fontSize: 10, fontWeight: 700, color,
      boxShadow: `0 0 12px ${color}20`,
      zIndex: 5
    }}>{id}</div>);

}

function useSmall() {
  const [m, setM] = React.useState(window.innerWidth <= 600);
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)');
    const h = (e) => setM(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return m;
}

function Reveal({ children, delay = 0, direction = 'up', style = {} }) {
  const ref = React.useRef(null);
  const vis = useInView(ref);
  const dy = direction === 'up' ? 40 : direction === 'down' ? -40 : 0;
  const dx = direction === 'left' ? 50 : direction === 'right' ? -50 : 0;
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translate(0,0)' : `translate(${dx}px,${dy}px)`,
      transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}s, transform .9s cubic-bezier(.16,1,.3,1) ${delay}s`,
      ...style
    }}>{children}</div>);

}

function Tag({ children, color = C.brand }) {
  return <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600, color, padding: '4px 14px', borderRadius: 999, background: `${color}18`, display: 'inline-block' }}>{children}</span>;
}

function LayerBadge({ id, color }) {
  return <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 700, color, background: `${color}15`, padding: '6px 14px', borderRadius: 10, display: 'inline-block', border: `1px solid ${color}25` }}>{id}</span>;
}

function GlowDot({ color, size = 10 }) {
  return <div style={{ width: size, height: size, borderRadius: '50%', background: color, boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}40`, flexShrink: 0 }}></div>;
}

function DataLine({ label, value, color = C.ink }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${C.line}` }}>
      <span style={{ fontFamily: MONO, fontSize: 12, color: C.muted, letterSpacing: '.04em' }}>{label}</span>
      <span style={{ fontFamily: FONT, fontSize: 17, fontWeight: 500, color }}>{value}</span>
    </div>);

}

function FlowArrow({ color = C.brand }) {
  return <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}><svg width="24" height="28" viewBox="0 0 24 28" fill="none"><path d="M12 0 L12 20" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" /><path d="M6 16 L12 24 L18 16" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></div>;
}

function VitalBar({ label, value, unit, pct, color, alert = false }) {
  const ref = React.useRef(null);
  const vis = useInView(ref);
  return (
    <div ref={ref} style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontFamily: MONO, fontSize: 11, color: C.muted, letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</span>
        <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, color: alert ? C.red : color }}>{value} <span style={{ fontSize: 11, color: C.muted }}>{unit}</span></span>
      </div>
      <div style={{ height: 5, background: 'rgba(255,255,255,.06)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: vis ? `${pct}%` : '0%', background: alert ? C.red : color, borderRadius: 3, boxShadow: alert ? `0 0 10px ${C.red}` : 'none', transition: 'width 1.2s cubic-bezier(.16,1,.3,1)' }}></div>
      </div>
    </div>);

}

// 3D tilt card
function TiltCard({ children, accent = C.brand, style = {} }) {
  const mouse = useMouse();
  const isSmall = useSmall();
  const rx = isSmall ? 0 : mouse.y * -4;
  const ry = isSmall ? 0 : mouse.x * 4;
  return (
    <div style={{
      background: C.card, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
      border: `1px solid rgba(11,18,32,.06)`, borderLeft: `2px solid ${accent}`,
      borderRadius: isSmall ? 16 : 20, padding: isSmall ? '20px 18px' : '32px 36px',
      boxShadow: `0 1px 2px rgba(11,18,32,.04), 0 8px 32px -12px rgba(11,18,32,.08), 0 0 0 0.5px rgba(11,18,32,.03)`,
      transform: `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`,
      transition: 'transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s ease',
      ...style
    }}>{children}</div>);

}

// Full-width glass panel
function WidePanel({ children, accent = C.brand, style = {} }) {
  const isSmall = useSmall();
  return (
    <div style={{
      background: C.card, backdropFilter: 'blur(24px)',
      border: `1px solid ${C.line}`,
      borderRadius: isSmall ? 18 : 24, padding: isSmall ? '24px 18px' : '40px 48px',
      boxShadow: `0 24px 60px -20px rgba(11,18,32,.10), 0 0 50px -20px ${accent}10`,
      width: '100%', maxWidth: 960,
      ...style
    }}>{children}</div>);

}

// Image with overlay
function HeroImage({ src, alt, overlay = 'rgba(7,9,15,.5)', children, style = {} }) {
  const ref = React.useRef(null);
  const vis = useInView(ref);
  return (
    <div ref={ref} style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 50px -20px rgba(11,18,32,.15)', ...style }}>
      <img src={src} alt={alt} style={{
        width: '100%', display: 'block',
        transform: vis ? 'scale(1.06)' : 'scale(1)',
        transition: 'transform 8s cubic-bezier(.16,1,.3,1)'
      }} loading="lazy" />
      <div style={{ position: 'absolute', inset: 0, background: overlay }}></div>
      {children && <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 32 }}>{children}</div>}
    </div>);

}

// ─── Big background layer number (watermark) ───
function LayerWatermark({ number = '0', color = C.brand }) {
  return (
    <div style={{
      position: 'absolute', right: '-5%', top: '50%', transform: 'translateY(-50%)',
      fontFamily: SERIF, fontSize: 'clamp(200px, 30vw, 400px)', fontWeight: 800,
      color, opacity: 0.04, lineHeight: 1, pointerEvents: 'none',
      userSelect: 'none', zIndex: 0
    }}>{number}</div>);

}

// ─── Section wrapper ───
function Section({ children, id, bg, style = {} }) {
  const isMobile = useMobile();
  const isSmall = useSmall();
  return (
    <section id={id} data-section={id} style={{
      minHeight: isSmall ? 'auto' : '68vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: isSmall ? '36px 16px' : isMobile ? '44px 24px' : '48px 48px', overflow: 'hidden', background: bg || 'transparent', ...style
    }}>
      {children}
    </section>);

}

// ─── Shewhart ───
function ShewChart({ width = 500, height = 140 }) {
  const ref = React.useRef(null);
  const vis = useInView(ref);
  const sessions = [48, 52, 50, 55, 53, 58, 56, 60, 62, 72, 58, 54];
  const mean = 55,ucl = 68;
  const xS = (i) => 40 + i / (sessions.length - 1) * (width - 70);
  const yS = (v) => height - 24 - (v - 40) / 40 * (height - 48);
  return (
    <svg ref={ref} width={width} height={height} style={{ display: 'block', width: '100%', maxWidth: width }}>
      <line x1="40" y1={yS(ucl)} x2={width - 20} y2={yS(ucl)} stroke={C.red} strokeWidth="1" strokeDasharray="4 3" opacity=".5" />
      <text x={width - 16} y={yS(ucl) + 4} fill={C.red} fontSize="10" fontFamily={MONO} textAnchor="end" opacity=".6">UCL z=2.5</text>
      <line x1="40" y1={yS(mean)} x2={width - 20} y2={yS(mean)} stroke={C.brand} strokeWidth="1" strokeDasharray="4 3" opacity=".3" />
      <text x={width - 16} y={yS(mean) + 4} fill={C.brand} fontSize="10" fontFamily={MONO} textAnchor="end" opacity=".4">μ̂</text>
      {sessions.map((v, i) =>
      <g key={i} style={{ opacity: vis ? 1 : 0, transition: `opacity .6s ease ${i * 0.1}s` }}>
          {i > 0 && <line x1={xS(i - 1)} y1={yS(sessions[i - 1])} x2={xS(i)} y2={yS(v)} stroke={v > ucl ? C.red : C.accent} strokeWidth="2" opacity=".7" />}
          <circle cx={xS(i)} cy={yS(v)} r={v > ucl ? 6 : 4} fill={v > ucl ? C.red : C.accent} style={{ filter: v > ucl ? `drop-shadow(0 0 8px ${C.red})` : `drop-shadow(0 0 4px ${C.accent}60)` }} />
        </g>
      )}
      <text x="20" y={height / 2} fill={C.muted} fontSize="9" fontFamily={MONO} textAnchor="middle" transform={`rotate(-90 20 ${height / 2})`}>Belastung</text>
    </svg>);

}

// ═══════════════════════════════════════════
// SCENES
// ═══════════════════════════════════════════

function SceneOpening() {
  return (
    <Section id="opening" style={{ minHeight: '70vh' }}>
      <div style={{ textAlign: 'center', maxWidth: 700 }}>
        <Reveal>
          <p style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: C.muted, lineHeight: 1.3, letterSpacing: '-.01em' }}>
            1,8 Millionen Herzpatienten in Deutschland.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: C.ink, lineHeight: 1.3, letterSpacing: '-.01em', margin: '16px 0' }}>
            Weniger als 30% erhalten leitliniengerechte Nachsorge.
          </p>
        </Reveal>
        <Reveal delay={0.6}>
          <p style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: C.brand, lineHeight: 1.3, letterSpacing: '-.01em' }}>
            CordiVivo setzt auf eine auditierbare, deterministische Therapie‑Engine.
          </p>
        </Reveal>
      </div>
    </Section>);

}

function SceneIntro() {
  const isMobile = useMobile();
  return (
    <Section id="intro" bg="radial-gradient(ellipse 80% 60% at 50% 40%, rgba(42,111,158,.06), transparent 70%)">
      <FloatingDots color={C.brand} count={8} />
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 48, maxWidth: 1100, width: '100%', alignItems: 'center' }}>
        <div>
          <Reveal><Tag color={C.accent}>Medizinprodukt · Zertifizierbar</Tag></Reveal>
          <Reveal delay={0.12}>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(40px, 5.5vw, 64px)', fontWeight: 400, letterSpacing: '-.02em', fontStyle: 'normal', color: C.ink, lineHeight: 1.02, margin: '20px 0 18px' }}>
              Die <span style={{ color: C.brand }}>Adaptive Engine</span> im Einsatz.
            </h1>
          </Reveal>
          <Reveal delay={0.24}>
            <p style={{ fontFamily: FONT, fontSize: 19, color: C.muted, lineHeight: 1.6, maxWidth: 440, marginBottom: 32 }}>Folgen Sie Hans durch 7 Sicherheitsschichten — von der Ersteinrichtung bis zur individuell angepassten Therapie.

            </p>
          </Reveal>
          <Reveal delay={0.36}>
            <TiltCard accent={C.accent} style={{ maxWidth: 380 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <img src="assets/hans-mueller.png" style={{ width: 52, height: 52, borderRadius: 14, objectFit: 'cover' }} alt="Hans" />
                <div>
                  <div style={{ fontFamily: FONT, fontSize: 20, fontWeight: 600, color: C.ink }}>Hans </div>
                  <div style={{ fontFamily: MONO, fontSize: 11, color: C.muted }}>62 Jahre · Herzpatient</div>
                </div>
              </div>
              <DataLine label="Diagnose" value="Herzerkrankung · nach Bypass-OP" />
              <DataLine label="Belastbarkeit" value="Leicht eingeschränkt" color={C.amber} />
              <DataLine label="Gehtest" value="380 m in 6 Min." color={C.accent} />
              <DataLine label="BMI" value="28.4" />
            </TiltCard>
          </Reveal>
        </div>
        <Reveal delay={0.2} direction="right">
          <HeroImage src="assets/hans-mueller.png" alt="Hans Müller — nach dem Training"
          overlay="linear-gradient(180deg, rgba(7,9,15,.2) 0%, rgba(7,9,15,.7) 100%)"
          style={{}}>
            <div style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(255,255,255,.6)', letterSpacing: '.1em' }}>
              PATIENT · ZU HAUSE · WOCHE 5 / 12
            </div>
          </HeroImage>
        </Reveal>
      </div>
    </Section>);

}

function SceneOnboarding() {
  return (
    <Section id="L0" bg="radial-gradient(ellipse 60% 50% at 30% 50%, rgba(106,162,255,.06), transparent 70%)">
      <LayerWatermark number="0" color={C.brand} />
      <div style={{ maxWidth: 960, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Reveal><LayerBadge id="L0" color={C.brand} /></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-.01em', color: C.ink, margin: '14px 0 12px', lineHeight: 1.05 }}>Ersteinrichtung &amp; Trainingsplan</h2></Reveal>
          <Reveal delay={0.2}><p style={{ fontFamily: FONT, fontSize: 17, color: C.muted, maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>Hans absolviert einen einfachen Gehtest. Die Engine berechnet daraus sein Fitness-Level und erstellt automatisch einen persönlichen 12-Wochen-Trainingsplan.</p></Reveal>
        </div>
        {/* Interactive onboarding */}
        <Reveal delay={0.2}>
          <InteractiveOnboarding />
        </Reveal>
        
      </div>
    </Section>);

}

function SceneRedFlags() {
  const isMobile = useMobile();
  return (
    <Section id="L1" bg="radial-gradient(ellipse 50% 50% at 70% 40%, rgba(248,113,113,.06), transparent 70%)">
      <LayerWatermark number="1" color={C.red} />
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: isMobile ? 32 : 56, maxWidth: 1100, width: '100%', alignItems: 'center' }}>
        {/* Interactive red flags */}
        <Reveal>
          <InteractiveRedFlags />
        </Reveal>
        {/* Text on right */}
        <div>
          <Reveal direction="right"><LayerBadge id="L1" color={C.red} /></Reveal>
          <Reveal delay={0.1} direction="right">
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-.01em', color: C.ink, margin: '14px 0 14px', lineHeight: 1.05 }}>
              Red-Flag<br />Sicherheits-Check
            </h2>
          </Reveal>
          <Reveal delay={0.2} direction="right">
            <p style={{ fontFamily: FONT, fontSize: 16, color: C.muted, lineHeight: 1.65, marginBottom: 20 }}>
              Vor jeder Sitzung prüft die Engine wichtige Gesundheitswerte: Blutdruck, Ruhepuls, Gewichtsveränderungen und akute Beschwerden.
            </p>
            <p style={{ fontFamily: FONT, fontSize: 16, color: C.ink2, lineHeight: 1.65 }}>
              An Tag 21 ist Hans' Blutdruck zu hoch. Die Engine empfiehlt eine Pause — <span style={{ color: C.red, fontWeight: 600 }}>blockiert aber nie</span>. Hans entscheidet selbst, pausiert einen Tag, und trainiert am nächsten Tag sicher weiter.
            </p>
          </Reveal>
          <Reveal delay={0.3} direction="right">
            <div style={{ marginTop: 20 }}><Tag color={C.red}>Nur Empfehlung — nie Blockade</Tag></div>
          </Reveal>
        </div>
      </div>
    </Section>);

}

function SceneConfirmation() {
  return (
    <Section id="L2" bg="radial-gradient(ellipse 60% 50% at 50% 60%, rgba(106,162,255,.05), transparent 70%)">
      <LayerWatermark number="2" color={C.brand} />
      <div style={{ maxWidth: 700, width: '100%', textAlign: 'center' }}>
        <Reveal><LayerBadge id="L2" color={C.brand} /></Reveal>
        <Reveal delay={0.1}><h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-.01em', color: C.ink, margin: '14px 0 12px', lineHeight: 1.05 }}>Trainingsvorschlag &amp; Bestätigung</h2></Reveal>
        <Reveal delay={0.2}><p style={{ fontFamily: FONT, fontSize: 17, color: C.muted, maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.6 }}>Die Engine schlägt vor — Hans entscheidet. Er sieht Dauer, Intensität und Trainingsart. Der Mensch hat immer das letzte Wort.</p></Reveal>
        <Reveal delay={0.3}>
          <InteractiveConfirmation />
        </Reveal>
      </div>
    </Section>);

}

function SceneDoseTracking() {
  const isMobile = useMobile();
  return (
    <Section id="L3" bg="radial-gradient(ellipse 70% 50% at 60% 50%, rgba(46,143,130,.06), transparent 70%)">
      <LayerWatermark number="3" color={C.accent} />
      <FloatingDots color={C.accent} count={5} />
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? 32 : 56, maxWidth: 1100, width: '100%', alignItems: 'center' }}>
        <div>
          <Reveal><LayerBadge id="L3" color={C.accent} /></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: SERIF, fontSize: 'clamp(30px, 3.8vw, 44px)', fontWeight: 400, letterSpacing: '-.01em', color: C.ink, margin: '14px 0 12px', lineHeight: 1.05 }}>Belastungscheck &amp; Nachverfolgung</h2></Reveal>
          <Reveal delay={0.2}><p style={{ fontFamily: FONT, fontSize: 16, color: C.muted, lineHeight: 1.65 }}>Nach jeder Sitzung: Wie hat sich Hans gefühlt? Konnte er sich unterhalten? Die Engine berechnet daraus die Trainingsbelastung und überwacht, ob alles im sicheren Bereich bleibt.</p></Reveal>
          <Reveal delay={0.3}>
            <HeroImage src="assets/hans-training.png" alt="Hans beim Training mit der App"
            overlay="linear-gradient(180deg, rgba(7,9,15,.3), rgba(7,9,15,.8))"
            style={{ marginTop: 24 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, color: C.accent, letterSpacing: '.1em' }}>SITZUNG 14 · ERGOMETER · 25 MIN</div>
            </HeroImage>
          </Reveal>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Reveal delay={0.15} direction="right">
            <InteractiveDoseTracking />
          </Reveal>
        </div>
      </div>
    </Section>);

}

function SceneProgression() {
  return (
    <Section id="L4" bg="radial-gradient(ellipse 60% 50% at 40% 50%, rgba(106,162,255,.05), transparent 70%)">
      <LayerWatermark number="4" color={C.brand} />
      <div style={{ maxWidth: 960, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Reveal><LayerBadge id="L4" color={C.brand} /></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-.01em', color: C.ink, margin: '14px 0 12px', lineHeight: 1.05 }}>Progression &amp; Regression</h2></Reveal>
          <Reveal delay={0.2}><p style={{ fontFamily: FONT, fontSize: 17, color: C.muted, maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }}>Der adaptive Kern: Erst wird die Dauer gesteigert, dann die Intensität. Bei Überlastung greift sofort das automatische Erholungsprogramm.</p></Reveal>
        </div>
        <Reveal delay={0.3}>
          <InteractiveProgression />
        </Reveal>
      </div>
    </Section>);

}

function ScenePsychMultimodal() {
  const isMobile = useMobile();
  const pillars = [
  { name: 'Bewegung', sub: 'Kern', color: C.accent, size: 'large' },
  { name: 'Stress', sub: '2×/Wo', color: C.brand },
  { name: 'Ruhe', sub: '2×/Wo', color: C.purple },
  { name: 'Ernährung', sub: '1×/Wo', color: C.amber },
  { name: 'Wissen', sub: 'Kontext', color: C.brand }];

  return (
    <Section id="L5L6" bg="radial-gradient(ellipse 50% 50% at 60% 40%, rgba(192,132,252,.05), transparent 70%)">
      <LayerWatermark number="5" color={C.purple} />
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? 32 : 56, maxWidth: 1100, width: '100%', alignItems: 'center' }}>
        <div>
          <Reveal><div style={{ display: 'flex', gap: 10 }}><LayerBadge id="L5" color={C.purple} /><LayerBadge id="L6" color={C.amber} /></div></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: SERIF, fontSize: 'clamp(30px, 3.8vw, 44px)', fontWeight: 400, letterSpacing: '-.01em', color: C.ink, margin: '14px 0 12px', lineHeight: 1.05 }}>Psychologisches Monitoring &amp; 5 Therapie-Säulen</h2></Reveal>
          <Reveal delay={0.2}>
            <TiltCard accent={C.purple} style={{ width: '100%', marginTop: 20 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, color: C.muted, letterSpacing: '.12em', marginBottom: 12 }}>HANS · WOCHE 4 · WOHLBEFINDENS-CHECK</div>
              <div style={{ display: 'flex', gap: 32, marginBottom: 12 }}>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted }}>Stimmung</div>
                  <div style={{ fontFamily: FONT, fontSize: 36, fontWeight: 500, color: C.accent, lineHeight: 1 }}>1</div>
                </div>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted }}>Angst</div>
                  <div style={{ fontFamily: FONT, fontSize: 36, fontWeight: 500, color: C.accent, lineHeight: 1 }}>2</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontFamily: MONO, fontSize: 12, color: C.accent, fontWeight: 600 }}>✓ Unter Schwelle</span>
                </div>
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
                Auffällig → Vertiefter Fragebogen<br />
                Leicht erhöht → Entspannungsübungen, sanfteres Training<br />
                Deutlich erhöht → Reduziertes Training + Hinweis an den Patienten
              </div>
            </TiltCard>
          </Reveal>
        </div>
        <div>
          <Reveal delay={0.15} direction="right">
            <HeroImage src="assets/hans-garden.png" alt="Hans im Alltag"
            overlay="linear-gradient(180deg, rgba(7,9,15,.15), rgba(7,9,15,.75))"
            style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, color: C.amber, letterSpacing: '.1em' }}>MULTIMODALE BEGLEITUNG · IM ALLTAG</div>
            </HeroImage>
          </Reveal>
          <Reveal delay={0.3} direction="right">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {pillars.map((p, i) =>
              <div key={i} style={{
                width: 68, padding: '14px 4px', borderRadius: 14, textAlign: 'center',
                background: `${p.color}10`, border: `1px solid ${p.color}28`,
                boxShadow: `0 0 20px ${p.color}08`, flexShrink: 0
              }}>
                  <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 600, color: p.color }}>{p.name}</div>
                  <div style={{ fontFamily: MONO, fontSize: 8, color: C.muted, marginTop: 4 }}>{p.sub}</div>
                </div>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.4} direction="right">
            <TiltCard accent={C.amber} style={{ width: '100%', marginTop: 16 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted, letterSpacing: '.12em', marginBottom: 10 }}>WOCHENPLAN · WOCHE 5</div>
              <div style={{ display: 'flex', gap: 5 }}>
                {[['Mo', [C.accent]], ['Di', [C.purple]], ['Mi', [C.accent, C.amber]], ['Do', [C.brand]], ['Fr', [C.accent]], ['Sa', [C.purple]], ['So', []]].map(([d, types], i) =>
                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted, marginBottom: 5 }}>{d}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minHeight: 14 }}>
                      {types.map((c, j) => <div key={j} style={{ height: 7, borderRadius: 4, background: c, boxShadow: `0 0 6px ${c}40` }}></div>)}
                    </div>
                  </div>
                )}
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </Section>);

}

function SceneModes() {
  const isMobile = useMobile();
  return (
    <Section id="modes" bg="radial-gradient(ellipse 60% 50% at 50% 50%, rgba(106,162,255,.05), transparent 70%)">
      <LayerWatermark number="⇌" color={C.brand} />
      <div style={{ maxWidth: 960, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Reveal><Tag color={C.brand}>Zwei Wege · Ein Algorithmus</Tag></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-.01em', color: C.ink, margin: '16px 0', lineHeight: 1.05 }}>Zwei Wege zum Patienten</h2></Reveal>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 20 : 28 }}>
          <Reveal>
            <TiltCard accent={C.brand} style={{ height: '100%' }}>
              <Tag color={C.brand}>Mode A · Klinik</Tag>
              <h3 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: C.ink, margin: '14px 0 10px' }}>Mit Therapeut</h3>
              <p style={{ fontFamily: FONT, fontSize: 14, color: C.muted, lineHeight: 1.6, marginBottom: 18 }}>Mit Therapeut. Die Engine empfiehlt — der Therapeut prüft und genehmigt.</p>
              {['Therapeut genehmigt jeden Plan', 'Therapeut hat das letzte Wort', 'Krankenkassen-erstattet'].map((t, i) =>
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <GlowDot color={C.brand} size={7} /><span style={{ fontFamily: FONT, fontSize: 13, color: C.ink2 }}>{t}</span>
                </div>
              )}
            </TiltCard>
          </Reveal>
          <Reveal delay={0.2}>
            <TiltCard accent={C.accent} style={{ height: '100%' }}>
              <Tag color={C.accent}>Mode B · App</Tag>
              <h3 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: C.ink, margin: '14px 0 10px' }}>Ohne Therapeut</h3>
              <p style={{ fontFamily: FONT, fontSize: 14, color: C.muted, lineHeight: 1.6, marginBottom: 18 }}>Ohne Therapeut. Die Engine empfiehlt — der Patient entscheidet selbst. Immer nur Empfehlungen, nie Zwang.</p>
              {['Patient bestätigt jede Sitzung', 'Algorithmus setzt alle Sicherheitsgrenzen', 'App auf Rezept · Krankenkassen-erstattet'].map((t, i) =>
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <GlowDot color={C.accent} size={7} /><span style={{ fontFamily: FONT, fontSize: 13, color: C.ink2 }}>{t}</span>
                </div>
              )}
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </Section>);

}

function SceneSummary() {
  return (
    <Section id="summary" style={{ minHeight: '60vh' }}>
      <div style={{ maxWidth: 900, width: '100%', textAlign: 'center' }}>
        <Reveal>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 400, letterSpacing: '-.01em', color: C.ink, margin: '0 0 12px', lineHeight: 1.1 }}>
            7 Schichten. Ein System.
          </h2>
          <p style={{ fontFamily: FONT, fontSize: 16, color: C.muted, maxWidth: 460, margin: '0 auto 36px', lineHeight: 1.6 }}>
            Jede Schicht baut auf der vorherigen auf. Keine kann übersprungen werden.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <LayerSummary />
        </Reveal>
      </div>
    </Section>);

}

function SceneOutro() {
  return (
    <Section id="outro" bg="radial-gradient(ellipse 70% 60% at 50% 50%, rgba(46,143,130,.04), transparent 70%)">
      <FloatingDots color={C.accent} count={6} />
            <div style={{ maxWidth: 1100, width: '100%' }}>
        <Reveal>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-.02em', color: C.ink, lineHeight: 1.05, textAlign: 'center', margin: '0 0 40px' }}>
            Hans' Weg durch die Engine.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <InteractiveTransformation />
        </Reveal>

        <div style={{ height: 48 }}></div>

        <Reveal delay={0.4}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 400, letterSpacing: '-.02em', color: C.ink, lineHeight: 1.05, margin: '0 0 20px' }}>
              Deterministisch.<br /><span style={{ color: C.brand }}>Auditierbar.</span> <span style={{ color: C.accent }}>Sicher.</span>
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 18, color: C.muted, maxWidth: 500, margin: '0 auto 28px', lineHeight: 1.6 }}>
              7 Sicherheitsschichten. Jede Entscheidung nachvollziehbar. Keine künstliche Intelligenz, kein Zufall — nur medizinische Evidenz.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
              <Tag color={C.brand}>Software-Sicherheit</Tag><Tag color={C.accent}>Risikomanagement</Tag><Tag color={C.purple}>Medizinprodukt</Tag><Tag color={C.amber}>Vollständig dokumentiert</Tag>
            </div>
            <a href="/#invest" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              padding: '16px 32px', borderRadius: 999, background: '#1a2030', color: '#f7f6f3',
              fontFamily: FONT, fontSize: 16, fontWeight: 600, textDecoration: 'none',
              boxShadow: '0 12px 40px -12px rgba(11,18,32,.18)',
              transition: 'transform .2s, box-shadow .2s'
            }}>
              Pitch Deck anfordern
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </Reveal>
      </div>
    </Section>);

}

// ─── Progress + active tracking ───
const SECTIONS = [
{ id: 'opening', label: '·', color: C.brand },
{ id: 'intro', label: 'Intro', color: C.brand },
{ id: 'L0', label: 'L0', color: C.brand },
{ id: 'L1', label: 'L1', color: C.red },
{ id: 'L2', label: 'L2', color: C.brand },
{ id: 'L3', label: 'L3', color: C.accent },
{ id: 'L4', label: 'L4', color: C.brand },
{ id: 'L5L6', label: 'L5/L6', color: C.purple },
{ id: 'modes', label: 'A|B', color: C.brand },
{ id: 'summary', label: '∑', color: C.brand },
{ id: 'outro', label: '→', color: C.accent }];


function ProgressRail() {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {if (e.isIntersecting) {const i = els.indexOf(e.target);if (i >= 0) setActive(i);}});
    }, { threshold: 0.35 });
    els.forEach((el) => {if (el) obs.observe(el);});
    return () => obs.disconnect();
  }, []);
  React.useEffect(() => {
    const lbl = document.getElementById('layerLabel');
    if (lbl) {lbl.textContent = SECTIONS[active].label;lbl.style.color = SECTIONS[active].color;}
    const hint = document.getElementById('scrollHint');
    if (hint && active > 0) hint.style.opacity = '0';
  }, [active]);
  React.useEffect(() => {
    const rail = document.getElementById('progressRail');
    if (!rail) return;
    rail.innerHTML = '';
    SECTIONS.forEach((s, i) => {
      const d = document.createElement('button');
      d.className = 'progress-dot' + (i === active ? ' active' : '');
      d.style.setProperty('--dot-color', s.color);
      d.title = s.label;
      d.onclick = () => {const el = document.getElementById(s.id);if (el) {const y = el.getBoundingClientRect().top + window.scrollY - 40;window.scrollTo({ top: y, behavior: 'smooth' });}};
      rail.appendChild(d);
    });
  }, [active]);
  return null;
}

function EngineScrollApp() {
  return (
    <>
      <ProgressRail />
      <SceneOpening />
      <SceneIntro />
      <SceneOnboarding />
      <SceneRedFlags />
      <SceneConfirmation />
      <SceneDoseTracking />
      <SceneProgression />
      <ScenePsychMultimodal />
      <SceneModes />
      <SceneSummary />
      <SceneOutro />
    </>);

}