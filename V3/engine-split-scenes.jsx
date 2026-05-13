// engine-split-scenes.jsx — Scene components + main app for split layout
// Depends on: engine-film-scroll.jsx (C, FONT, SERIF, MONO, Reveal, Tag, LayerBadge,
//   GlowDot, DataLine, TiltCard, useMobile, EngineScrollApp)
// Depends on: engine-interactive.jsx (InteractiveOnboarding, InteractiveRedFlags, etc.)
// Depends on: engine-split-panel.jsx (STAGE_MAP, STAGE_IDS, StickyImagePanel, etc.)

function SplitOpening() {
  return (
    <SplitSection id="opening" style={{ minHeight: '70vh', textAlign: 'center' }}>
      <div>
        <Reveal>
          <p style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 400, color: C.muted, lineHeight: 1.35 }}>
            1,8 Millionen Herzpatienten in Deutschland.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 400, color: C.ink, lineHeight: 1.35, margin: '14px 0' }}>
            Weniger als 30% erhalten leitliniengerechte Nachsorge.
          </p>
        </Reveal>
        <Reveal delay={0.6}>
          <p style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 400, color: C.brand, lineHeight: 1.35 }}>
            Bis jetzt.
          </p>
        </Reveal>
      </div>
    </SplitSection>
  );
}

function SplitIntro() {
  return (
    <SplitSection id="intro">
      <Reveal><Tag color={C.accent}>Medizinprodukt · Zertifizierbar</Tag></Reveal>
      <Reveal delay={0.12}>
        <h1 style={{
          fontFamily: SERIF, fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 400,
          letterSpacing: '-.02em', color: C.ink, lineHeight: 1.05, margin: '20px 0 16px',
        }}>
          Die <span style={{ color: C.brand }}>Adaptive Engine</span> im Einsatz.
        </h1>
      </Reveal>
      <Reveal delay={0.24}>
        <p style={{ fontFamily: FONT, fontSize: 18, color: C.muted, lineHeight: 1.6, marginBottom: 28 }}>
          Folgen Sie Hans durch 7 Sicherheitsschichten — von der Ersteinrichtung bis zur individuell angepassten Therapie.
        </p>
      </Reveal>
      <Reveal delay={0.36}>
        <TiltCard accent={C.accent} style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <img src="assets/hans-mueller.png" style={{ width: 48, height: 48, borderRadius: 14, objectFit: 'cover' }} alt="Hans" />
            <div>
              <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 600, color: C.ink }}>Hans</div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: C.muted }}>62 Jahre · Herzpatient</div>
            </div>
          </div>
          <DataLine label="Diagnose" value="Herzerkrankung · nach Bypass-OP" />
          <DataLine label="Belastbarkeit" value="Leicht eingeschränkt" color={C.amber} />
          <DataLine label="Gehtest" value="380 m in 6 Min." color={C.accent} />
          <DataLine label="BMI" value="28.4" />
        </TiltCard>
      </Reveal>
    </SplitSection>
  );
}

function SplitL0() {
  return (
    <SplitSection id="L0">
      <SplitHeader badge="L0" badgeColor={C.brand}
        title="Ersteinrichtung & Trainingsplan"
        desc="Hans absolviert einen einfachen Gehtest. Die Engine berechnet daraus sein Fitness-Level und erstellt automatisch einen persönlichen 12-Wochen-Trainingsplan." />
      <Reveal delay={0.3}><InteractiveOnboarding /></Reveal>
    </SplitSection>
  );
}

function SplitL1() {
  return (
    <SplitSection id="L1">
      <SplitHeader badge="L1" badgeColor={C.red}
        title={<span>Red-Flag Sicherheits-Check</span>}
        desc="Vor jeder Sitzung prüft die Engine wichtige Gesundheitswerte: Blutdruck, Ruhepuls, Gewichtsveränderungen und akute Beschwerden."
        extra={
          <p style={{ fontFamily: FONT, fontSize: 15, color: C.ink2, lineHeight: 1.6, maxWidth: 520, marginTop: 8 }}>
            An Tag 21 ist Hans' Blutdruck zu hoch. Die Engine empfiehlt eine Pause — <span style={{ color: C.red, fontWeight: 600 }}>blockiert aber nie</span>.
          </p>
        } />
      <Reveal delay={0.3}><InteractiveRedFlags /></Reveal>
    </SplitSection>
  );
}

function SplitL2() {
  return (
    <SplitSection id="L2">
      <SplitHeader badge="L2" badgeColor={C.brand}
        title="Trainingsvorschlag & Bestätigung"
        desc="Die Engine schlägt vor — Hans entscheidet. Er sieht Dauer, Intensität und Trainingsart. Der Mensch hat immer das letzte Wort." />
      <Reveal delay={0.3}><InteractiveConfirmation /></Reveal>
    </SplitSection>
  );
}

function SplitL3() {
  return (
    <SplitSection id="L3">
      <SplitHeader badge="L3" badgeColor={C.accent}
        title="Belastungscheck & Nachverfolgung"
        desc="Nach jeder Sitzung: Wie hat sich Hans gefühlt? Die Engine berechnet daraus die Trainingsbelastung." />
      <Reveal delay={0.3}><InteractiveDoseTracking /></Reveal>
    </SplitSection>
  );
}

function SplitL4() {
  return (
    <SplitSection id="L4">
      <SplitHeader badge="L4" badgeColor={C.brand}
        title="Progression & Regression"
        desc="Erst wird die Dauer gesteigert, dann die Intensität. Bei Überlastung greift sofort das automatische Erholungsprogramm." />
      <Reveal delay={0.3}><InteractiveProgression /></Reveal>
    </SplitSection>
  );
}

function SplitL5L6() {
  const pillars = [
    { name: 'Bewegung', sub: 'Kern', color: C.accent },
    { name: 'Stress', sub: '2×/Wo', color: C.brand },
    { name: 'Ruhe', sub: '2×/Wo', color: C.purple },
    { name: 'Ernährung', sub: '1×/Wo', color: C.amber },
    { name: 'Wissen', sub: 'Kontext', color: C.brand },
  ];
  return (
    <SplitSection id="L5L6">
      <div style={{ marginBottom: 28 }}>
        <Reveal><div style={{ display: 'flex', gap: 10 }}><LayerBadge id="L5" color={C.purple} /><LayerBadge id="L6" color={C.amber} /></div></Reveal>
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 400, letterSpacing: '-.01em', color: C.ink, margin: '14px 0 12px', lineHeight: 1.08 }}>
            Psychologisches Monitoring &amp; 5 Säulen
          </h2>
        </Reveal>
      </div>
      <Reveal delay={0.2}>
        <TiltCard accent={C.purple} style={{ width: '100%', marginBottom: 20 }}>
          <div style={{ fontFamily: MONO, fontSize: 11, color: C.muted, letterSpacing: '.12em', marginBottom: 12 }}>HANS · WOCHE 4 · WOHLBEFINDENS-CHECK</div>
          <div style={{ display: 'flex', gap: 32, marginBottom: 12 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted }}>Stimmung</div>
              <div style={{ fontFamily: FONT, fontSize: 32, fontWeight: 500, color: C.accent, lineHeight: 1 }}>1</div>
            </div>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted }}>Angst</div>
              <div style={{ fontFamily: FONT, fontSize: 32, fontWeight: 500, color: C.accent, lineHeight: 1 }}>2</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontFamily: MONO, fontSize: 12, color: C.accent, fontWeight: 600 }}>✓ Unter Schwelle</span>
            </div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
            Auffällig → Vertiefter Fragebogen<br />
            Leicht erhöht → Entspannungsübungen<br />
            Deutlich erhöht → Reduziertes Training
          </div>
        </TiltCard>
      </Reveal>
      <Reveal delay={0.3}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {pillars.map((p, i) => (
            <div key={i} style={{
              padding: '12px 14px', borderRadius: 12, textAlign: 'center',
              background: `${p.color}10`, border: `1px solid ${p.color}28`,
            }}>
              <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: p.color }}>{p.name}</div>
              <div style={{ fontFamily: MONO, fontSize: 9, color: C.muted, marginTop: 3 }}>{p.sub}</div>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.4}>
        <TiltCard accent={C.amber} style={{ width: '100%' }}>
          <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted, letterSpacing: '.12em', marginBottom: 10 }}>WOCHENPLAN · WOCHE 5</div>
          <div style={{ display: 'flex', gap: 5 }}>
            {[['Mo',[C.accent]],['Di',[C.purple]],['Mi',[C.accent,C.amber]],['Do',[C.brand]],['Fr',[C.accent]],['Sa',[C.purple]],['So',[]]].map(([d,types],i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted, marginBottom: 5 }}>{d}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minHeight: 14 }}>
                  {types.map((c,j) => <div key={j} style={{ height: 7, borderRadius: 4, background: c, boxShadow: `0 0 6px ${c}40` }}></div>)}
                </div>
              </div>
            ))}
          </div>
        </TiltCard>
      </Reveal>
    </SplitSection>
  );
}

function SplitModes() {
  return (
    <SplitSection id="modes">
      <div style={{ marginBottom: 28 }}>
        <Reveal><Tag color={C.brand}>Zwei Wege · Ein Algorithmus</Tag></Reveal>
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 400, letterSpacing: '-.01em', color: C.ink, margin: '16px 0', lineHeight: 1.08 }}>
            Zwei Wege zum Patienten
          </h2>
        </Reveal>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Reveal>
          <TiltCard accent={C.brand}>
            <Tag color={C.brand}>Mode A · Klinik</Tag>
            <h3 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 400, color: C.ink, margin: '12px 0 8px' }}>Mit Therapeut</h3>
            <p style={{ fontFamily: FONT, fontSize: 14, color: C.muted, lineHeight: 1.6, marginBottom: 14 }}>Die Engine empfiehlt — der Therapeut prüft und genehmigt.</p>
            {['Therapeut genehmigt jeden Plan','Therapeut hat das letzte Wort','Krankenkassen-erstattet'].map((t,i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                <GlowDot color={C.brand} size={6} /><span style={{ fontFamily: FONT, fontSize: 13, color: C.ink2 }}>{t}</span>
              </div>
            ))}
          </TiltCard>
        </Reveal>
        <Reveal delay={0.15}>
          <TiltCard accent={C.accent}>
            <Tag color={C.accent}>Mode B · App</Tag>
            <h3 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 400, color: C.ink, margin: '12px 0 8px' }}>Ohne Therapeut</h3>
            <p style={{ fontFamily: FONT, fontSize: 14, color: C.muted, lineHeight: 1.6, marginBottom: 14 }}>Der Patient entscheidet selbst. Immer nur Empfehlungen, nie Zwang.</p>
            {['Patient bestätigt jede Sitzung','Algorithmus setzt Sicherheitsgrenzen','App auf Rezept'].map((t,i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                <GlowDot color={C.accent} size={6} /><span style={{ fontFamily: FONT, fontSize: 13, color: C.ink2 }}>{t}</span>
              </div>
            ))}
          </TiltCard>
        </Reveal>
      </div>
    </SplitSection>
  );
}

function SplitSummary() {
  return (
    <SplitSection id="summary" style={{ minHeight: 'auto' }}>
      <Reveal>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 400, letterSpacing: '-.01em', color: C.ink, margin: '0 0 12px', lineHeight: 1.1 }}>
          7 Schichten. Ein System.
        </h2>
        <p style={{ fontFamily: FONT, fontSize: 15, color: C.muted, maxWidth: 440, lineHeight: 1.6, marginBottom: 28 }}>
          Jede Schicht baut auf der vorherigen auf.
        </p>
      </Reveal>
      <Reveal delay={0.2}><LayerSummary /></Reveal>
    </SplitSection>
  );
}

function SplitOutro() {
  return (
    <SplitSection id="outro">
      <Reveal>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 400, letterSpacing: '-.02em', color: C.ink, lineHeight: 1.05, margin: '0 0 28px' }}>
          Hans' Weg durch die Engine.
        </h2>
      </Reveal>
      <Reveal delay={0.2}><InteractiveTransformation /></Reveal>
      <div style={{ height: 48 }}></div>
      <Reveal delay={0.4}>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 400, letterSpacing: '-.02em', color: C.ink, lineHeight: 1.08, margin: '0 0 16px' }}>
          Deterministisch.<br /><span style={{ color: C.brand }}>Auditierbar.</span> <span style={{ color: C.accent }}>Sicher.</span>
        </h2>
        <p style={{ fontFamily: FONT, fontSize: 16, color: C.muted, maxWidth: 460, lineHeight: 1.6, marginBottom: 24 }}>
          7 Sicherheitsschichten. Jede Entscheidung nachvollziehbar. Keine künstliche Intelligenz — nur medizinische Evidenz.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          <Tag color={C.brand}>Software-Sicherheit</Tag>
          <Tag color={C.accent}>Risikomanagement</Tag>
          <Tag color={C.purple}>Medizinprodukt</Tag>
          <Tag color={C.amber}>Dokumentiert</Tag>
        </div>
        <a href="cordivivo-landing-dark-v2.html#invest" style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          padding: '14px 28px', borderRadius: 999, background: '#1a2030', color: '#f7f6f3',
          fontFamily: FONT, fontSize: 15, fontWeight: 600, textDecoration: 'none',
          boxShadow: '0 12px 40px -12px rgba(11,18,32,.18)',
        }}>
          Pitch Deck anfordern
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </Reveal>
    </SplitSection>
  );
}

// ═══════════════════════════════════════
// MAIN SPLIT APP
// ═══════════════════════════════════════
function EngineSplitApp() {
  const [activeId, setActiveId] = React.useState('opening');
  const mobile = useMobile();

  // Scroll-based sync — immediate with hysteresis to prevent flashes
  const scrollSpeedRef = React.useRef(0);
  const lastScrollY = React.useRef(window.scrollY);
  const lastScrollTime = React.useRef(Date.now());
  const currentBestRef = React.useRef('opening');

  React.useEffect(() => {
    function onScroll() {
      const now = Date.now();
      const dt = now - lastScrollTime.current;
      const dy = Math.abs(window.scrollY - lastScrollY.current);
      if (dt > 0) scrollSpeedRef.current = dy / dt;
      lastScrollY.current = window.scrollY;
      lastScrollTime.current = now;

      const vpCenter = window.innerHeight / 2;
      let best = null, bestDist = Infinity;
      let currentDist = Infinity;
      for (const id of STAGE_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - vpCenter);
        if (dist < bestDist) { bestDist = dist; best = id; }
        if (id === currentBestRef.current) currentDist = dist;
      }
      // Only switch if new section is at least 120px closer, or current is off-screen
      if (best && (best === currentBestRef.current || currentDist - bestDist > 120 || currentDist > window.innerHeight * 0.6)) {
        if (best !== currentBestRef.current) {
          currentBestRef.current = best;
          setActiveId(best);
        }
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Expose scroll speed globally for the image panel
  React.useEffect(() => {
    window.__scrollSpeed = scrollSpeedRef;
  }, []);

  React.useEffect(() => {
    const lbl = document.getElementById('layerLabel');
    if (lbl) {
      const labels = { opening:'·', intro:'Intro', L0:'L0', L1:'L1', L2:'L2', L3:'L3', L4:'L4', L5L6:'L5/L6', modes:'A|B', summary:'∑', outro:'→' };
      lbl.textContent = labels[activeId] || '';
      lbl.style.color = (STAGE_MAP[activeId] || {}).color || C.brand;
    }
    var hint = document.getElementById('scrollHint');
    if (hint && activeId !== 'opening') hint.style.opacity = '0';
  }, [activeId]);

  if (mobile) {
    return <window.EngineScrollApp />;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 40%', minHeight: '100vh' }}>
      <div style={{ position: 'relative' }}>
        <SplitProgressRail activeId={activeId} />
        <SplitOpening />
        <SplitIntro />
        <SplitL0 />
        <SplitL1 />
        <SplitL2 />
        <SplitL3 />
        <SplitL4 />
        <SplitL5L6 />
        <SplitModes />
        <SplitSummary />
        <SplitOutro />
      </div>
      <div><StickyImagePanel activeId={activeId} /></div>
    </div>
  );
}

window.EngineSplitApp = EngineSplitApp;
