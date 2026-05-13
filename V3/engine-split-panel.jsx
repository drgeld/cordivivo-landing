// engine-split-panel.jsx — Sticky image panel + split helpers
// Depends on: C, FONT, SERIF, MONO from engine-film-scroll.jsx

const STAGE_MAP = {
  opening:  { src: 'assets/hans-mueller.png',  caption: 'Hans, 62 Jahre · Herzpatient',           sub: 'PATIENT · PORTRÄT',           color: C.brand },
  intro:    { src: 'assets/hans-mueller.png',  caption: 'Diagnose: Herzerkrankung · nach Bypass-OP', sub: 'ANAMNESE · TAG 1',          color: C.brand },
  L0:       { src: 'assets/hans-walking.png',  caption: 'Der 6-Minuten-Gehtest',                  sub: 'ERSTEINRICHTUNG · GEHTEST',    color: C.brand },
  L1:       { src: 'assets/hans-bp.png',       caption: 'Täglicher Sicherheits-Check',            sub: 'RED FLAGS · TAG 21',           color: C.red },
  L2:       { src: 'assets/hans-phone.png',    caption: 'Trainingsvorschlag bestätigen',           sub: 'BESTÄTIGUNG · SITZUNG 14',    color: C.brand },
  L3:       { src: 'assets/hans-pause.png',    caption: 'Wie fühlt sich Hans?',                   sub: 'BELASTUNGSCHECK · SITZUNG 14', color: C.accent },
  L4:       { src: 'assets/hans-running.png',  caption: 'Erste Fortschritte',                     sub: 'PROGRESSION · WOCHE 6',        color: C.brand },
  L5L6:     { src: 'assets/hans-garden.png',   caption: 'Ganzheitliche Begleitung',               sub: 'WOHLBEFINDEN · WOCHE 4',       color: C.purple },
  modes:    { src: 'assets/hans-phone.png',    caption: 'Zwei Wege — ein Algorithmus',            sub: 'MODUS A & B',                  color: C.brand },
  summary:  { src: 'assets/hans-running.png',  caption: '7 Schichten. Ein System.',               sub: 'ZUSAMMENFASSUNG',              color: C.brand },
  outro:    { src: 'assets/hans-pingpong.png', caption: 'Woche 12 — Ziel erreicht',               sub: 'ERGEBNIS · WOCHE 12',          color: C.accent },
};
const STAGE_IDS = ['opening','intro','L0','L1','L2','L3','L4','L5L6','modes','summary','outro'];

// Sticky image panel — clean: just image + zoom + caption gradient
function StickyImagePanel({ activeId }) {
  const stage = STAGE_MAP[activeId] || STAGE_MAP.opening;
  const idx = STAGE_IDS.indexOf(activeId);
  const currentSrc = stage.src;

  const prevSrcRef = React.useRef(currentSrc);
  const [prevSrc, setPrevSrc] = React.useState(currentSrc);
  const [imgKey, setImgKey] = React.useState(0);
  const [instant, setInstant] = React.useState(false);

  React.useEffect(() => {
    if (currentSrc !== prevSrcRef.current) {
      setPrevSrc(prevSrcRef.current);
      prevSrcRef.current = currentSrc;
      // Fast scroll (>2 px/ms) = instant swap, slow = fade
      const speed = window.__scrollSpeed ? window.__scrollSpeed.current : 0;
      setInstant(speed > 2);
      setImgKey(k => k + 1);
    }
  }, [currentSrc]);

  return (
    <div style={{
      position: 'sticky', top: 0, height: '100vh',
      overflow: 'hidden', background: '#0b0d12',
    }}>
      <div className="split-panel-edge" />
      {/* Previous image — held at zoom end state so it doesn't snap back */}
      <img src={prevSrc} alt="" className="split-img" style={{ zIndex: 1 }} />
      {/* Active image + zoom, fades in as one layer */}
      <div key={imgKey} className={'split-layer-active' + (instant ? ' instant' : '')} style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
        <img src={currentSrc} alt="" className="split-img" />
      </div>
      {/* Simple bottom gradient for caption readability */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(0,0,0,.7) 0%, rgba(0,0,0,.15) 35%, transparent 60%)',
      }} />
      {/* Caption */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5, padding: '32px 36px' }}>
        <div style={{
          fontFamily: MONO, fontSize: 9, letterSpacing: '.16em', fontWeight: 600,
          color: stage.color, marginBottom: 10, opacity: .85,
        }}>{stage.sub}</div>
        <div style={{
          fontFamily: FONT, fontSize: 18, fontWeight: 500,
          color: 'rgba(255,255,255,.92)', lineHeight: 1.45,
        }}>{stage.caption}</div>
        <div style={{ display: 'flex', gap: 3, marginTop: 24 }}>
          {STAGE_IDS.map((id, i) => (
            <div key={id} style={{
              flex: 1, height: 2.5, borderRadius: 1.5,
              background: i <= idx
                ? (i === idx ? STAGE_MAP[id].color : STAGE_MAP[id].color + '50')
                : 'rgba(255,255,255,.1)',
              boxShadow: i === idx ? `0 0 6px ${STAGE_MAP[id].color}60` : 'none',
              transition: 'all .5s ease',
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Left-column section wrapper — centered, spacious, full-width content
function SplitSection({ id, children, style = {} }) {
  return (
    <section id={id} data-section={id} style={{
      minHeight: '90vh', position: 'relative',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      alignItems: 'center',
      padding: '80px 36px 80px 48px',
      ...style,
    }}>
      <div style={{ width: '100%', maxWidth: 620 }}>
        {children}
      </div>
      {/* Subtle divider between sections */}
      <div style={{
        position: 'absolute', bottom: 0, left: '8%', right: '8%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(11,18,32,.07), transparent)',
      }} />
    </section>
  );
}

// Section header helper
function SplitHeader({ badge, badgeColor, title, desc, extra }) {
  return (
    <div style={{ marginBottom: 28 }}>
      {badge && <Reveal><LayerBadge id={badge} color={badgeColor || C.brand} /></Reveal>}
      <Reveal delay={0.1}>
        <h2 style={{
          fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400,
          letterSpacing: '-.01em', color: C.ink, margin: '14px 0 14px', lineHeight: 1.08,
        }}>{title}</h2>
      </Reveal>
      {desc && <Reveal delay={0.2}><p style={{ fontFamily: FONT, fontSize: 17, color: C.muted, lineHeight: 1.65 }}>{desc}</p></Reveal>}
      {extra && <Reveal delay={0.3}>{extra}</Reveal>}
    </div>
  );
}

// Progress rail
function SplitProgressRail({ activeId }) {
  const idx = STAGE_IDS.indexOf(activeId);
  return (
    <nav style={{
      position: 'fixed', left: 20, top: '50%', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: 7, zIndex: 50,
    }}>
      {STAGE_IDS.map((id, i) => {
        const isActive = i === idx;
        const clr = STAGE_MAP[id].color;
        return (
          <button key={id} onClick={() => {
            const el = document.getElementById(id);
            if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 40, behavior: 'smooth' });
          }} style={{
            width: isActive ? 20 : 6, height: 6, borderRadius: 3,
            background: isActive ? clr : 'rgba(11,18,32,.12)',
            boxShadow: isActive ? `0 0 8px ${clr}60` : 'none',
            border: 'none', padding: 0, cursor: 'pointer',
            transition: 'all .5s cubic-bezier(.16,1,.3,1)',
          }} title={id} />
        );
      })}
    </nav>
  );
}

Object.assign(window, { STAGE_MAP, STAGE_IDS, StickyImagePanel, SplitSection, SplitHeader, SplitProgressRail });
