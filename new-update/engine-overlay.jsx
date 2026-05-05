// CordiVivo Engine Explorer — Overlay UI (React/Babel)

const LAYERS = [
  {
    id: 'L0', color: '#6aa2ff', tag: 'Einmalig · Erst-Onboarding',
    title: 'Onboarding & Initialplan',
    desc: '6MWT → MET-Schätzung (Cahalin 1996) → individueller 12-Wochen-Trainingsplan. Zuordnung zu Belastungsstufe A / B / C / D.',
    evidence: ['Cahalin 1996', 'AACVPR', '4 Stufen'],
    diagram: 'onboarding',
  },
  {
    id: 'L1', color: '#f87171', tag: 'Vor jeder Sitzung · Safety Gate',
    title: 'Red-Flag Sicherheits-Check',
    desc: 'Absolute Kontraindikationen: BP ≥ 180/110, HR > 100, Gewicht > 2 kg/3d, akute Symptome. Advisory-only — Patient behält Entscheidungshoheit.',
    evidence: ['ESC Guidelines', 'Advisory-only', 'Audit-Trail'],
    diagram: 'redflags',
  },
  {
    id: 'L2', color: '#6aa2ff', tag: 'Human-in-the-Loop',
    title: 'Session-Proposal & Bestätigung',
    desc: 'Patient sieht Dauer, CR-10 Zielzone, Trainingsmodus. Bestätigt, passt an oder pausiert. Erfasst subjektive Zustände.',
    evidence: ['Informed Consent', 'Borg CR-10', 'Foster 2001'],
    diagram: 'confirmation',
  },
  {
    id: 'L3', color: '#5be3c6', tag: 'Intra- & Post-Session',
    title: 'Talk Test & Dosis-Tracking',
    desc: '3-stufiger Talk Test (VT1 → CR-10 3; VT2 → CR-10 5). sRPE-TL = RPE × Dauer. Shewhart I-Chart über Rolling-12-Session Baseline.',
    evidence: ['Foster sRPE-TL', 'Shewhart (West 2026)', 'Tennant 2007'],
    diagram: 'dosetracking',
  },
  {
    id: 'L4', color: '#6aa2ff', tag: 'Adaptiver Kern · Post-Session',
    title: 'Progressions- & Regressionslogik',
    desc: 'Duration-first: Volumen vor Intensität. 3× leicht → +10% Dauer. 4× leicht → +0.5 CR-10. Active Recovery bei Shewhart z ≥ 2.5.',
    evidence: ['AACVPR', 'EAPC 2020', 'Foster Monotony'],
    diagram: 'progression',
  },
  {
    id: 'L5', color: '#c084fc', tag: 'Alle 4 Wochen · Psychologisch',
    title: 'PHQ-9 / GAD-7 Monitoring',
    desc: 'PHQ-4 Prescreen → PHQ-9/GAD-7 Expansion. Elevated: +Psychoedukation, −5% RPE. Severe (≥15): −15% RPE + Patientenhinweis.',
    evidence: ['PHQ-9 (Kroenke)', 'GAD-7 (Spitzer)', 'Gatekeeper Principle'],
    diagram: 'psychological',
  },
  {
    id: 'L6', color: '#fbbf24', tag: 'Kontinuierlich · 5 Säulen',
    title: 'Multimodales Content-Scheduling',
    desc: '5 DRV-Säulen: Bewegung, Stressmanagement, Entspannung (2×/Woche), Ernährung (1×/Woche), Edukation (kontextgetriggert).',
    evidence: ['DRV-Standards', '5 Pillars', 'Kontextgetriggert'],
    diagram: 'multimodal',
  },
];

// Mini-diagram SVGs per layer
function MiniDiagram({ type, color }) {
  const s = { width: '100%', maxWidth: 280 };
  const c = color;
  const m = 'rgba(255,255,255,.5)';
  const bg = 'rgba(255,255,255,.04)';

  if (type === 'onboarding') return (
    <svg viewBox="0 0 280 60" style={s} fill="none">
      <rect x="0" y="15" width="64" height="30" rx="6" stroke={c} strokeWidth="1.2" fill={bg}/>
      <text x="32" y="34" textAnchor="middle" fill={m} fontSize="9" fontFamily="JetBrains Mono,monospace">6MWT</text>
      <line x1="68" y1="30" x2="92" y2="30" stroke={c} strokeWidth="1" strokeDasharray="3 2"/>
      <polygon points="90,26 98,30 90,34" fill={c}/>
      <rect x="100" y="15" width="64" height="30" rx="6" stroke={c} strokeWidth="1.2" fill={bg}/>
      <text x="132" y="34" textAnchor="middle" fill={m} fontSize="9" fontFamily="JetBrains Mono,monospace">MET</text>
      <line x1="168" y1="30" x2="192" y2="30" stroke={c} strokeWidth="1" strokeDasharray="3 2"/>
      <polygon points="190,26 198,30 190,34" fill={c}/>
      <rect x="200" y="15" width="76" height="30" rx="6" stroke={c} strokeWidth="1.2" fill={bg}/>
      <text x="238" y="34" textAnchor="middle" fill={m} fontSize="9" fontFamily="JetBrains Mono,monospace">Stufe A–D</text>
    </svg>
  );

  if (type === 'redflags') return (
    <svg viewBox="0 0 280 70" style={s} fill="none">
      {['BP ≥ 180/110', 'HR > 100', 'ΔWeight > 2kg', 'Akute Sx'].map((label, i) => (
        <g key={i}>
          <rect x={i * 70} y="8" width="62" height="24" rx="5" stroke="#f87171" strokeWidth="1" fill="rgba(248,113,113,.06)"/>
          <text x={i * 70 + 31} y="24" textAnchor="middle" fill="#f87171" fontSize="7.5" fontFamily="JetBrains Mono,monospace">{label}</text>
        </g>
      ))}
      <line x1="0" y1="42" x2="280" y2="42" stroke="rgba(248,113,113,.2)" strokeWidth="1"/>
      <text x="140" y="58" textAnchor="middle" fill={m} fontSize="8.5" fontFamily="JetBrains Mono,monospace">ANY → 🔴 ADVISORY (never blocks)</text>
    </svg>
  );

  if (type === 'confirmation') return (
    <svg viewBox="0 0 280 60" style={s} fill="none">
      <rect x="20" y="10" width="80" height="40" rx="8" stroke={c} strokeWidth="1.2" fill={bg}/>
      <text x="60" y="34" textAnchor="middle" fill={m} fontSize="9" fontFamily="JetBrains Mono,monospace">Proposal</text>
      <line x1="104" y1="30" x2="128" y2="30" stroke={c} strokeWidth="1" strokeDasharray="3 2"/>
      <circle cx="156" cy="30" r="16" stroke={c} strokeWidth="1.2" fill={bg}/>
      <text x="156" y="34" textAnchor="middle" fill="white" fontSize="14">?</text>
      <line x1="176" y1="18" x2="210" y2="8" stroke="#5be3c6" strokeWidth="1"/>
      <text x="220" y="12" fill="#5be3c6" fontSize="8" fontFamily="JetBrains Mono,monospace">CONFIRM</text>
      <line x1="176" y1="30" x2="210" y2="30" stroke={c} strokeWidth="1"/>
      <text x="220" y="34" fill={c} fontSize="8" fontFamily="JetBrains Mono,monospace">ADAPT</text>
      <line x1="176" y1="42" x2="210" y2="52" stroke="#f87171" strokeWidth="1"/>
      <text x="220" y="56" fill="#f87171" fontSize="8" fontFamily="JetBrains Mono,monospace">SKIP</text>
    </svg>
  );

  if (type === 'dosetracking') return (
    <svg viewBox="0 0 280 70" style={s} fill="none">
      <text x="4" y="12" fill={m} fontSize="8" fontFamily="JetBrains Mono,monospace">TALK TEST</text>
      <rect x="0" y="18" width="80" height="18" rx="4" fill="rgba(91,227,198,.08)" stroke="#5be3c6" strokeWidth=".8"/>
      <text x="40" y="30" textAnchor="middle" fill="#5be3c6" fontSize="7.5" fontFamily="JetBrains Mono,monospace">COMFORTABLE</text>
      <rect x="84" y="18" width="65" height="18" rx="4" fill="rgba(251,191,36,.08)" stroke="#fbbf24" strokeWidth=".8"/>
      <text x="116" y="30" textAnchor="middle" fill="#fbbf24" fontSize="7.5" fontFamily="JetBrains Mono,monospace">DIFFICULT</text>
      <rect x="153" y="18" width="72" height="18" rx="4" fill="rgba(248,113,113,.08)" stroke="#f87171" strokeWidth=".8"/>
      <text x="189" y="30" textAnchor="middle" fill="#f87171" fontSize="7.5" fontFamily="JetBrains Mono,monospace">IMPOSSIBLE</text>
      <text x="4" y="54" fill={m} fontSize="8" fontFamily="JetBrains Mono,monospace">sRPE-TL = CR-10 × Duration</text>
      <text x="4" y="66" fill={m} fontSize="8" fontFamily="JetBrains Mono,monospace">z = (sRPE_TL − μ̂) / σ_eff</text>
    </svg>
  );

  if (type === 'progression') return (
    <svg viewBox="0 0 280 60" style={s} fill="none">
      <rect x="0" y="5" width="130" height="22" rx="4" fill={bg} stroke={c} strokeWidth=".8"/>
      <text x="65" y="19" textAnchor="middle" fill={c} fontSize="8" fontFamily="JetBrains Mono,monospace">3× easy → +10% Duration</text>
      <rect x="0" y="32" width="130" height="22" rx="4" fill={bg} stroke={c} strokeWidth=".8"/>
      <text x="65" y="46" textAnchor="middle" fill={c} fontSize="8" fontFamily="JetBrains Mono,monospace">4× easy → +0.5 CR-10</text>
      <rect x="145" y="5" width="130" height="22" rx="4" fill="rgba(248,113,113,.06)" stroke="#f87171" strokeWidth=".8"/>
      <text x="210" y="19" textAnchor="middle" fill="#f87171" fontSize="8" fontFamily="JetBrains Mono,monospace">CR-10 ≥ 5 → −20% Deload</text>
      <rect x="145" y="32" width="130" height="22" rx="4" fill="rgba(248,113,113,.06)" stroke="#f87171" strokeWidth=".8"/>
      <text x="210" y="46" textAnchor="middle" fill="#f87171" fontSize="8" fontFamily="JetBrains Mono,monospace">z ≥ 2.5 → Active Recovery</text>
    </svg>
  );

  if (type === 'psychological') return (
    <svg viewBox="0 0 280 55" style={s} fill="none">
      <rect x="0" y="5" width="60" height="45" rx="6" stroke="#c084fc" strokeWidth="1" fill="rgba(192,132,252,.06)"/>
      <text x="30" y="24" textAnchor="middle" fill="#c084fc" fontSize="8" fontFamily="JetBrains Mono,monospace">PHQ-4</text>
      <text x="30" y="38" textAnchor="middle" fill={m} fontSize="7" fontFamily="JetBrains Mono,monospace">Prescreen</text>
      <line x1="64" y1="28" x2="88" y2="18" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 2"/>
      <line x1="64" y1="28" x2="88" y2="38" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 2"/>
      <rect x="92" y="5" width="60" height="22" rx="5" stroke="#c084fc" strokeWidth=".8" fill="rgba(192,132,252,.04)"/>
      <text x="122" y="20" textAnchor="middle" fill="#c084fc" fontSize="8" fontFamily="JetBrains Mono,monospace">PHQ-9</text>
      <rect x="92" y="30" width="60" height="22" rx="5" stroke="#c084fc" strokeWidth=".8" fill="rgba(192,132,252,.04)"/>
      <text x="122" y="45" textAnchor="middle" fill="#c084fc" fontSize="8" fontFamily="JetBrains Mono,monospace">GAD-7</text>
      <line x1="156" y1="28" x2="178" y2="28" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 2"/>
      <polygon points="176,24 184,28 176,32" fill="#c084fc"/>
      <text x="196" y="22" fill={m} fontSize="7.5" fontFamily="JetBrains Mono,monospace">10–14 → −5% RPE</text>
      <text x="196" y="36" fill={m} fontSize="7.5" fontFamily="JetBrains Mono,monospace">≥ 15 → −15% RPE</text>
    </svg>
  );

  if (type === 'multimodal') return (
    <svg viewBox="0 0 280 40" style={s} fill="none">
      {['Bewegung', 'Stress', 'Entspannung', 'Ernährung', 'Edukation'].map((p, i) => (
        <g key={i}>
          <rect x={i * 56} y="5" width="52" height="28" rx="5" stroke="#fbbf24" strokeWidth=".8" fill="rgba(251,191,36,.05)"/>
          <text x={i * 56 + 26} y="23" textAnchor="middle" fill="#fbbf24" fontSize="7" fontFamily="JetBrains Mono,monospace">{p}</text>
        </g>
      ))}
    </svg>
  );

  return null;
}

function LayerPanel({ layer, index, visible }) {
  const panelStyles = {
    position: 'absolute',
    right: '5vw',
    top: '50%',
    transform: visible ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(40px)',
    opacity: visible ? 1 : 0,
    transition: 'all .6s cubic-bezier(.16,1,.3,1)',
    pointerEvents: visible ? 'auto' : 'none',
    width: 'min(420px, 38vw)',
    background: 'rgba(11,18,32,.82)',
    backdropFilter: 'saturate(160%) blur(20px)',
    WebkitBackdropFilter: 'saturate(160%) blur(20px)',
    border: `1px solid rgba(255,255,255,.08)`,
    borderLeft: `2px solid ${layer.color}`,
    borderRadius: 16,
    padding: '28px 28px 24px',
    boxShadow: '0 20px 60px -20px rgba(0,0,0,.6)',
  };

  const tagStyle = {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase',
    color: layer.color, fontWeight: 600,
  };

  const idStyle = {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 11, fontWeight: 700,
    color: layer.color,
    background: `${layer.color}18`,
    padding: '3px 8px', borderRadius: 6,
    marginRight: 8,
  };

  return (
    <div style={panelStyles}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span style={idStyle}>{layer.id}</span>
        <span style={tagStyle}>{layer.tag}</span>
      </div>
      <h3 style={{
        fontFamily: '"Space Grotesk", sans-serif',
        fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 500,
        letterSpacing: '-.02em', color: '#f1f4f9',
        margin: '6px 0 10px', lineHeight: 1.1,
      }}>{layer.title}</h3>
      <p style={{
        fontSize: 13.5, color: '#8a94a8', lineHeight: 1.6, margin: '0 0 14px',
      }}>{layer.desc}</p>

      <div style={{ margin: '14px 0 16px', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,.06)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <MiniDiagram type={layer.diagram} color={layer.color} />
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {layer.evidence.map((e, i) => (
          <span key={i} style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10, letterSpacing: '.04em', fontWeight: 500,
            padding: '3px 9px', borderRadius: 999,
            background: `${layer.color}12`, color: layer.color,
          }}>{e}</span>
        ))}
      </div>
    </div>
  );
}

function ProgressIndicator({ active, total }) {
  return (
    <div style={{
      position: 'fixed', left: 28, top: '50%', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: 8, zIndex: 20,
    }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          width: active === i ? 24 : 6, height: 6, borderRadius: 3,
          background: active === i ? LAYERS[i].color : 'rgba(255,255,255,.15)',
          transition: 'all .4s cubic-bezier(.16,1,.3,1)',
          cursor: 'pointer',
        }} onClick={() => {
          const scrollH = document.documentElement.scrollHeight - window.innerHeight;
          const target = (i / (total - 1)) * scrollH;
          window.scrollTo({ top: target, behavior: 'smooth' });
        }} title={LAYERS[i].id + ' — ' + LAYERS[i].title}></div>
      ))}
    </div>
  );
}

function EngineOverlay() {
  const [activeLayer, setActiveLayer] = React.useState(0);
  const [scrollPct, setScrollPct] = React.useState(0);

  React.useEffect(() => {
    function onScroll() {
      const scrollH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollH > 0 ? window.scrollY / scrollH : 0;
      setScrollPct(pct);
      setActiveLayer(Math.round(pct * (LAYERS.length - 1)));
      if (window.setScrollProgress) window.setScrollProgress(pct);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
      <ProgressIndicator active={activeLayer} total={LAYERS.length} />

      {LAYERS.map((layer, i) => (
        <LayerPanel key={i} layer={layer} index={i} visible={activeLayer === i} />
      ))}

      {/* Top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30,
        pointerEvents: 'auto',
        padding: '14px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(7,9,15,.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,.06)',
      }}>
        <a href="cordivivo-landing-dark-v2.html" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          color: '#8a94a8', textDecoration: 'none', fontSize: 14,
          fontFamily: 'Inter, sans-serif',
          pointerEvents: 'auto',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Zurück
        </a>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase',
          color: '#8a94a8',
        }}>
          CordiVivo · Adaptive Engine · CV‑SRS‑ALG‑001 v1.6
        </div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11, color: LAYERS[activeLayer].color,
          fontWeight: 600,
        }}>
          {LAYERS[activeLayer].id} / L6
        </div>
      </div>

      {/* Scroll hint at bottom */}
      {scrollPct < 0.05 && (
        <div style={{
          position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          color: 'rgba(255,255,255,.4)',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
          animation: 'fadeInUp .8s ease both',
        }}>
          <span>Scrollen um die Engine zu erkunden</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ animation: 'bounceDown 2s infinite' }}>
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  );
}

window.EngineOverlay = EngineOverlay;
