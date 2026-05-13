// engine-v3-core.jsx — Medical-Professional Light Theme
// Clean, authoritative, trustworthy — Philips meets Stripe

// ═══ Light Medical Palette ═══
const D = {
  bg: '#f0f3f8', surface: '#ffffff',
  card: '#ffffff', cardHover: '#f8f9fb',
  border: 'rgba(0,20,50,0.08)', borderLight: 'rgba(0,20,50,0.04)',
  glass: 'rgba(240,243,248,0.88)',
  text: '#1a2030', textSoft: '#4a5568', textMuted: '#8a94a6',
  brand: '#2a6f9e', accent: '#2e8f82', red: '#c45050',
  purple: '#6b5fa0', amber: '#9a7a30',
  line: 'rgba(0,20,50,0.07)',
};
const DISPLAY = '"Sora", system-ui, sans-serif';
const FONT = '"Inter", system-ui, sans-serif';
const MONO = '"JetBrains Mono", "SF Mono", monospace';

// ═══ Utilities ═══
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function interp(p, s, e, a, b) {
  if (p <= s) return a; if (p >= e) return b;
  return a + (b - a) * ((p - s) / (e - s));
}
function interpEase(p, s, e, a, b) {
  if (p <= s) return a; if (p >= e) return b;
  let t = (p - s) / (e - s);
  t = t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
  return a + (b - a) * t;
}

// ═══ Hooks ═══
function useScrollProgress(ref) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf;
    function calc() {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const extra = r.height - vh;
      setP(extra <= 0 ? (r.top <= 0 ? 1 : 0) : clamp(-r.top / extra, 0, 1));
    }
    function onScroll() { cancelAnimationFrame(raf); raf = requestAnimationFrame(calc); }
    window.addEventListener('scroll', onScroll, { passive: true });
    calc();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return p;
}

function useInView(ref, threshold) {
  const t = threshold || 0.05;
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) setVis(true);
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: t });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return vis;
}

function useMobile() {
  const [m, setM] = React.useState(window.matchMedia('(max-width:900px)').matches);
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width:900px)');
    const h = e => setM(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return m;
}

function useCounter(target, duration, decimals) {
  const dur = duration || 1200; const dec = decimals || 0;
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  const vis = useInView(ref);
  React.useEffect(() => {
    if (!vis) return;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / dur);
      setVal(parseFloat((target * (1 - Math.pow(1-t,3))).toFixed(dec)));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [vis, target, dur, dec]);
  return [val, ref];
}

// ═══ Layout Components ═══
function CinematicSection({ id, height, children, bg }) {
  const ref = React.useRef(null);
  const p = useScrollProgress(ref);
  return (
    <div ref={ref} id={id} style={{ height: height || '200vh', position: 'relative', background: bg || 'transparent' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {typeof children === 'function' ? children(p) : children}
      </div>
    </div>
  );
}

function CVSection({ id, children, bg, style }) {
  const mobile = useMobile();
  return (
    <section id={id} className="cv-section" style={{
      position: 'relative', overflow: 'hidden',
      padding: mobile ? '72px 20px' : 'clamp(72px,10vw,140px) clamp(20px,4vw,48px)',
      background: bg || 'transparent',
      ...(style || {}),
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        {children}
      </div>
    </section>
  );
}

function FadeIn({ children, delay, y, x, duration, style }) {
  const d = delay || 0; const dy = y !== undefined ? y : 50;
  const dx = x || 0; const dur = duration || 0.9;
  const ref = React.useRef(null);
  const vis = useInView(ref);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translate(0,0)' : 'translate('+dx+'px,'+dy+'px)',
      transition: 'opacity '+dur+'s cubic-bezier(.16,1,.3,1) '+d+'s, transform '+dur+'s cubic-bezier(.16,1,.3,1) '+d+'s',
      ...(style || {}),
    }}>{children}</div>
  );
}

// ═══ Clean Card (white, shadow, left accent) ═══
function GlassCard({ children, accent, style, glow }) {
  const a = accent || D.brand;
  return (
    <div style={{
      background: '#fff',
      border: '1px solid ' + D.border,
      borderLeft: '3px solid ' + a,
      borderRadius: 16, padding: 'clamp(16px,3vw,28px) clamp(16px,3vw,32px)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.06)',
      ...(style || {}),
    }}>{children}</div>
  );
}

// ═══ Primitives ═══
function GlowDot({ color, size }) {
  const c = color || D.brand; const s = size || 8;
  return <div style={{
    width: s, height: s, borderRadius: '50%', background: c,
    boxShadow: '0 0 '+s+'px '+c+'40', flexShrink: 0,
  }}></div>;
}

function DataLine({ label, value, color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid '+D.line }}>
      <span style={{ fontFamily: MONO, fontSize: 11, color: D.textMuted, letterSpacing: '.06em' }}>{label}</span>
      <span style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: color || D.text }}>{value}</span>
    </div>
  );
}

function VitalBar({ label, value, unit, pct, color, alert }) {
  const c = alert ? D.red : color;
  const ref = React.useRef(null); const vis = useInView(ref);
  return (
    <div ref={ref} style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: MONO, fontSize: 10, color: D.textMuted, letterSpacing: '.1em', textTransform: 'uppercase' }}>{label}</span>
        <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: c }}>{value} <span style={{ fontSize: 10, color: D.textMuted }}>{unit}</span></span>
      </div>
      <div style={{ height: 4, background: 'rgba(0,20,50,0.06)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: vis ? pct+'%' : '0%', background: c, borderRadius: 2,
          transition: 'width 1.2s cubic-bezier(.16,1,.3,1)',
        }}></div>
      </div>
    </div>
  );
}

function Tag({ children, color }) {
  const c = color || D.brand;
  return <span style={{
    fontFamily: MONO, fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase',
    fontWeight: 600, color: c, padding: '5px 14px', borderRadius: 999,
    background: c+'14', border: '1px solid '+c+'22', display: 'inline-block',
  }}>{children}</span>;
}

function LayerBadge({ id, color }) {
  const c = color || D.brand;
  return <span style={{
    fontFamily: DISPLAY, fontSize: 15, fontWeight: 700, color: c,
    background: c+'12', border: '1px solid '+c+'22',
    padding: '7px 16px', borderRadius: 12, display: 'inline-block',
  }}>{id}</span>;
}

function LayerWatermark({ number, color }) {
  const c = color || D.brand;
  return <div style={{
    position: 'absolute', right: '-5%', top: '50%', transform: 'translateY(-50%)',
    fontFamily: DISPLAY, fontSize: 'clamp(200px,30vw,400px)', fontWeight: 800,
    color: c, opacity: 0.04, lineHeight: 1, pointerEvents: 'none', userSelect: 'none', zIndex: 0,
  }}>{number}</div>;
}

function LiveIndicator({ label, color }) {
  const c = color || D.accent; const l = label || 'LIVE';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <div style={{
        width: 6, height: 6, borderRadius: '50%', background: c,
        animation: 'liveBlink 1.8s ease-in-out infinite',
      }}></div>
      <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '.14em', fontWeight: 700, color: c }}>{l}</span>
    </div>
  );
}

function LiveTimestamp() {
  const [t, setT] = React.useState(new Date());
  React.useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i); }, []);
  const h = String(t.getHours()).padStart(2,'0');
  const m = String(t.getMinutes()).padStart(2,'0');
  const s = String(t.getSeconds()).padStart(2,'0');
  return <span style={{ fontFamily: MONO, fontSize: 11, color: D.textMuted, letterSpacing: '.06em' }}>{h}:{m}:<span style={{ color: D.brand }}>{s}</span></span>;
}

function StatusStamp({ status, label }) {
  const ok = status === 'ok'; const c = ok ? D.accent : D.red;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 16px', borderRadius: 10,
      background: c+'0c', border: '1px solid '+c+'20',
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: 6,
        background: c+'18', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, color: c,
      }}>{ok ? '✓' : '!'}</div>
      <span style={{ fontFamily: MONO, fontSize: 11, color: c, fontWeight: 600 }}>{label}</span>
    </div>
  );
}

// ═══ Engine Slider ═══
function EngineSlider({ value, onChange, min, max, step, color, label, valueLabel }) {
  const s = step || 1; const c = color || D.brand;
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ padding: '16px 20px', borderRadius: 14, background: c+'08', border: '1px solid '+c+'14' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.12em', color: D.textMuted, textTransform: 'uppercase' }}>{label}</span>
        <span style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 600, color: c }}>{valueLabel}</span>
      </div>
      <input type="range" min={min} max={max} step={s} value={value} onChange={e => onChange(Number(e.target.value))}
        style={{
          width: '100%', height: 4, '--slider-c': c, '--slider-g': c+'40',
          background: 'linear-gradient(90deg, '+c+' '+pct+'%, rgba(0,20,50,0.08) '+pct+'%)',
          borderRadius: 2,
        }} />
    </div>
  );
}

// ═══ Heartbeat Line ═══
function HeartbeatLine({ color }) {
  const c = color || D.brand;
  const w = 1200, mid = 30;
  const d = 'M0,'+mid+' L'+w*.3+','+mid+' L'+w*.34+','+(mid-4)+' Q'+w*.36+','+mid+' '+w*.38+','+mid+' L'+w*.42+','+mid+' L'+w*.44+','+(mid-22)+' L'+w*.47+','+(mid+12)+' L'+w*.49+','+mid+' L'+w*.55+','+mid+' Q'+w*.58+','+(mid-7)+' '+w*.62+','+mid+' L'+w+','+mid;
  return (
    <svg width="100%" height="60" viewBox={'0 0 '+w+' 60'} preserveAspectRatio="none" style={{ display: 'block' }}>
      <path d={d} fill="none" stroke={c} strokeWidth="1.5" opacity="0.1" />
      <path d={d} fill="none" stroke={c} strokeWidth="2" opacity="0.25"
        strokeDasharray={w*2} strokeDashoffset={w*2}
        style={{ animation: 'heartbeatTrace 4s ease-in-out infinite' }} />
    </svg>
  );
}

// ═══ Section Header ═══
function SectionHeader({ badge, badgeColor, title, desc, extra }) {
  return (
    <div style={{ marginBottom: 36 }}>
      {badge && <FadeIn><LayerBadge id={badge} color={badgeColor || D.brand} /></FadeIn>}
      <FadeIn delay={0.1}>
        <h2 style={{
          fontFamily: DISPLAY, fontSize: 'clamp(32px,4.5vw,52px)', fontWeight: 600,
          letterSpacing: '-.02em', color: D.text, margin: '18px 0 16px', lineHeight: 1.08,
        }}>{title}</h2>
      </FadeIn>
      {desc && <FadeIn delay={0.2}><p style={{ fontFamily: FONT, fontSize: 17, color: D.textSoft, lineHeight: 1.65, maxWidth: 560 }}>{desc}</p></FadeIn>}
      {extra && <FadeIn delay={0.3}>{extra}</FadeIn>}
    </div>
  );
}

// ═══ Exports ═══
Object.assign(window, {
  D, DISPLAY, FONT, MONO,
  clamp, interp, interpEase,
  useScrollProgress, useInView, useMobile, useCounter,
  CinematicSection, CVSection, FadeIn,
  GlassCard, GlowDot, DataLine, VitalBar, Tag, LayerBadge, LayerWatermark,
  LiveIndicator, LiveTimestamp, StatusStamp,
  EngineSlider, HeartbeatLine, SectionHeader,
});
