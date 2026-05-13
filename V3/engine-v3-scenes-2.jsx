// engine-v3-scenes-2.jsx — L3, L4, L5/L6, Modes, Summary, Outro + Nav + App
// Depends on all previous files

// ═══ L3: Dose Tracking ═══
function L3Section() {
  const mobile = useMobile();
  return (
    <CVSection id="L3" bg="radial-gradient(ellipse 50% 40% at 60% 50%, rgba(46,143,130,0.03), transparent 70%)">
      <LayerWatermark number="3" color={D.accent} />
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'minmax(0,1fr) minmax(0,1.2fr)', gap: mobile ? 32 : 56, alignItems: 'start' }}>
        <div>
          <SectionHeader badge="L3" badgeColor={D.accent}
            title="Belastungscheck & Nachverfolgung"
            desc="Nach jeder Sitzung: Wie hat sich Hans gefühlt? Konnte er sich unterhalten? Die Engine berechnet daraus die Trainingsbelastung." />
          <FadeIn delay={0.3}>
            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', marginTop: 20 }}>
              <img src="assets/hans-running.png" alt="Hans beim Training" style={{
                width: '100%', display: 'block', aspectRatio: '16/10', objectFit: 'cover', objectPosition: 'center 10%',
                filter: 'brightness(0.92) saturate(0.95)',
              }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,10,30,.55) 0%, transparent 60%)' }}></div>
              <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
                <div style={{ fontFamily: MONO, fontSize: 10, color: D.accent, letterSpacing: '.12em' }}>SITZUNG 14 · ERGOMETER · 25 MIN</div>
              </div>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.15}>
          <InteractiveDoseTracking />
        </FadeIn>
      </div>
    </CVSection>
  );
}

// ═══ L4: Progression ═══
function L4Section() {
  return (
    <CVSection id="L4" bg="radial-gradient(ellipse 50% 40% at 40% 50%, rgba(42,111,158,0.03), transparent 70%)">
      <LayerWatermark number="4" color={D.brand} />
      <SectionHeader badge="L4" badgeColor={D.brand}
        title="Progression & Regression"
        desc="Der adaptive Kern: Erst wird die Dauer gesteigert, dann die Intensität. Bei Überlastung greift sofort das automatische Erholungsprogramm." />
      <FadeIn delay={0.3}>
        <InteractiveProgression />
      </FadeIn>
    </CVSection>
  );
}

// ═══ L5/L6: Psych + Multimodal ═══
function L5L6Section() {
  const mobile = useMobile();
  const pillars = [
    { name: 'Bewegung', sub: 'Kern', color: D.accent },
    { name: 'Stress', sub: '2×/Wo', color: D.brand },
    { name: 'Ruhe', sub: '2×/Wo', color: D.purple },
    { name: 'Ernährung', sub: '1×/Wo', color: D.amber },
    { name: 'Wissen', sub: 'Kontext', color: D.brand },
  ];
  return (
    <CVSection id="L5L6" bg="radial-gradient(ellipse 50% 40% at 60% 40%, rgba(107,95,160,0.03), transparent 70%)">
      <LayerWatermark number="5" color={D.purple} />
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'minmax(0,1.2fr) minmax(0,1fr)', gap: mobile ? 32 : 56, alignItems: 'start' }}>
        <div>
          <FadeIn><div style={{ display: 'flex', gap: 10 }}><LayerBadge id="L5" color={D.purple} /><LayerBadge id="L6" color={D.amber} /></div></FadeIn>
          <FadeIn delay={0.1}>
            <h2 style={{
              fontFamily: DISPLAY, fontSize: 'clamp(32px,4.5vw,52px)', fontWeight: 700,
              letterSpacing: '-.03em', color: D.text, margin: '18px 0 14px', lineHeight: 1.05,
            }}>Psychologisches Monitoring & 5 Säulen</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GlassCard accent={D.purple} glow style={{ width: '100%', marginTop: 20 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, color: D.textMuted, letterSpacing: '.12em', marginBottom: 12 }}>HANS · WOCHE 4 · WOHLBEFINDENS-CHECK</div>
              <div style={{ display: 'flex', gap: 32, marginBottom: 12 }}>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 10, color: D.textMuted }}>Stimmung</div>
                  <div style={{ fontFamily: DISPLAY, fontSize: 36, fontWeight: 700, color: D.accent, lineHeight: 1 }}>1</div>
                </div>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 10, color: D.textMuted }}>Angst</div>
                  <div style={{ fontFamily: DISPLAY, fontSize: 36, fontWeight: 700, color: D.accent, lineHeight: 1 }}>2</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontFamily: MONO, fontSize: 12, color: D.accent, fontWeight: 600 }}>✓ Unter Schwelle</span>
                </div>
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: D.textMuted, lineHeight: 1.7 }}>
                Auffällig → Vertiefter Fragebogen<br/>
                Leicht erhöht → Entspannungsübungen<br/>
                Deutlich erhöht → Reduziertes Training
              </div>
            </GlassCard>
          </FadeIn>
        </div>
        <div>
          <FadeIn delay={0.15}>
            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
              <img src="assets/hans-garden.png" alt="Hans im Alltag" style={{
                width: '100%', display: 'block', aspectRatio: '4/5', objectFit: 'cover',
                filter: 'brightness(0.92) saturate(0.95)',
              }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,10,30,.5) 0%, transparent 50%)' }}></div>
              <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
                <div style={{ fontFamily: MONO, fontSize: 10, color: D.amber, letterSpacing: '.12em' }}>MULTIMODALE BEGLEITUNG</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {pillars.map((p, i) => (
                <div key={i} style={{
                  padding: '12px 14px', borderRadius: 12, textAlign: 'center', flex: '1 1 auto', minWidth: 75,
                  background: p.color+'08', border: '1px solid '+p.color+'18',
                }}>
                  <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: p.color }}>{p.name}</div>
                  <div style={{ fontFamily: MONO, fontSize: 9, color: D.textMuted, marginTop: 3 }}>{p.sub}</div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <GlassCard accent={D.amber} style={{ width: '100%' }}>
              <div style={{ fontFamily: MONO, fontSize: 10, color: D.textMuted, letterSpacing: '.12em', marginBottom: 10 }}>WOCHENPLAN · WOCHE 5</div>
              <div style={{ display: 'flex', gap: 5 }}>
                {[['Mo',[D.accent]],['Di',[D.purple]],['Mi',[D.accent,D.amber]],['Do',[D.brand]],['Fr',[D.accent]],['Sa',[D.purple]],['So',[]]].map(([d,types],i) => (
                  <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontFamily: MONO, fontSize: 10, color: D.textMuted, marginBottom: 5 }}>{d}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minHeight: 14 }}>
                      {types.map((c,j) => <div key={j} style={{ height: 7, borderRadius: 4, background: c, boxShadow: '0 0 8px '+c+'40' }}></div>)}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </CVSection>
  );
}

// ═══ MODES ═══
function ModesSection() {
  const mobile = useMobile();
  return (
    <CVSection id="modes" bg="radial-gradient(ellipse 50% 40% at 50% 50%, rgba(42,111,158,0.03), transparent 70%)">
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <FadeIn><Tag color={D.brand}>Zwei Wege · Ein Algorithmus</Tag></FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: DISPLAY, fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700,
            letterSpacing: '-.03em', color: D.text, margin: '18px 0', lineHeight: 1.05,
          }}>Zwei Wege zum Patienten</h2>
        </FadeIn>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'minmax(0,1fr) minmax(0,1fr)', gap: 24 }}>
        <FadeIn>
          <GlassCard accent={D.brand} glow style={{ height: '100%' }}>
            <Tag color={D.brand}>Mode A · Klinik</Tag>
            <h3 style={{ fontFamily: DISPLAY, fontSize: 26, fontWeight: 600, color: D.text, margin: '14px 0 10px' }}>Mit Therapeut</h3>
            <p style={{ fontFamily: FONT, fontSize: 14, color: D.textSoft, lineHeight: 1.6, marginBottom: 18 }}>Die Engine empfiehlt — der Therapeut prüft und genehmigt.</p>
            {['Therapeut genehmigt jeden Plan','Therapeut hat das letzte Wort','Krankenkassen-erstattet'].map((t,i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                <GlowDot color={D.brand} size={6} />
                <span style={{ fontFamily: FONT, fontSize: 13, color: D.textSoft }}>{t}</span>
              </div>
            ))}
          </GlassCard>
        </FadeIn>
        <FadeIn delay={0.15}>
          <GlassCard accent={D.accent} glow style={{ height: '100%' }}>
            <Tag color={D.accent}>Mode B · App</Tag>
            <h3 style={{ fontFamily: DISPLAY, fontSize: 26, fontWeight: 600, color: D.text, margin: '14px 0 10px' }}>Ohne Therapeut</h3>
            <p style={{ fontFamily: FONT, fontSize: 14, color: D.textSoft, lineHeight: 1.6, marginBottom: 18 }}>Der Patient entscheidet selbst. Immer nur Empfehlungen, nie Zwang.</p>
            {['Patient bestätigt jede Sitzung','Algorithmus setzt Sicherheitsgrenzen','App auf Rezept'].map((t,i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                <GlowDot color={D.accent} size={6} />
                <span style={{ fontFamily: FONT, fontSize: 13, color: D.textSoft }}>{t}</span>
              </div>
            ))}
          </GlassCard>
        </FadeIn>
      </div>
    </CVSection>
  );
}

// ═══ SUMMARY ═══
function SummarySection() {
  return (
    <CVSection id="summary" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div style={{ textAlign: 'center' }}>
        <FadeIn>
          <h2 style={{
            fontFamily: DISPLAY, fontSize: 'clamp(32px,4.5vw,48px)', fontWeight: 700,
            letterSpacing: '-.03em', color: D.text, margin: '0 0 12px', lineHeight: 1.1,
          }}>7 Schichten. Ein System.</h2>
          <p style={{ fontFamily: FONT, fontSize: 16, color: D.textSoft, maxWidth: 440, margin: '0 auto 36px', lineHeight: 1.6 }}>
            Jede Schicht baut auf der vorherigen auf.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <LayerSummary />
        </FadeIn>
      </div>
    </CVSection>
  );
}

// ═══ OUTRO ═══
function OutroSection() {
  return (
    <CVSection id="outro" bg="radial-gradient(ellipse 60% 40% at 50% 60%, rgba(46,143,130,0.03), transparent 70%)">
      <FadeIn>
        <h2 style={{
          fontFamily: DISPLAY, fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700,
          letterSpacing: '-.03em', color: D.text, lineHeight: 1.05, textAlign: 'center', margin: '0 0 40px',
        }}>Hans' Weg durch die Engine.</h2>
      </FadeIn>
      <FadeIn delay={0.2}>
        <InteractiveTransformation />
      </FadeIn>
      <div style={{ height: 80 }}></div>

      {/* Final image + statement */}
      <FadeIn delay={0.3}>
        <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', marginBottom: 56 }}>
          <img src="assets/hans-pingpong.png" alt="Hans — Woche 12" style={{
            width: '100%', display: 'block', aspectRatio: '21/9', objectFit: 'cover', objectPosition: 'center 35%',
            filter: 'brightness(0.9) saturate(0.95)',
          }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,10,30,.55) 0%, rgba(6,7,10,.4) 50%, rgba(6,7,10,.7) 100%)' }}></div>
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
            padding: '0 clamp(24px, 5vw, 64px)',
          }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 10, color: D.accent, letterSpacing: '.16em', marginBottom: 12 }}>WOCHE 12 · ZIEL ERREICHT</div>
              <div style={{
                fontFamily: DISPLAY, fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700,
                letterSpacing: '-.02em', color: '#ffffff', lineHeight: 1.1,
              }}>
                Von 380m auf 480m.<br/>
                <span style={{ color: D.accent }}>Eigenständig. Sicher.</span>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontFamily: DISPLAY, fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700,
            letterSpacing: '-.03em', color: D.text, lineHeight: 1.08, margin: '0 0 18px',
          }}>
            Deterministisch.<br/>
            <span style={{ color: D.brand }}>Auditierbar.</span>{' '}
            <span style={{ color: D.accent }}>Sicher.</span>
          </h2>
          <p style={{ fontFamily: FONT, fontSize: 17, color: D.textSoft, maxWidth: 480, margin: '0 auto 24px', lineHeight: 1.6 }}>
            7 Sicherheitsschichten. Jede Entscheidung nachvollziehbar. Keine künstliche Intelligenz — nur medizinische Evidenz.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
            <Tag color={D.brand}>Software-Sicherheit</Tag>
            <Tag color={D.accent}>Risikomanagement</Tag>
            <Tag color={D.purple}>Medizinprodukt</Tag>
            <Tag color={D.amber}>Dokumentiert</Tag>
          </div>
          <a href="../index.html" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            padding: '16px 36px', borderRadius: 999,
            background: D.brand,
            color: '#fff', fontFamily: DISPLAY, fontSize: 16, fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 4px 16px '+D.brand+'30, 0 8px 24px -8px rgba(0,0,0,.12)',
            transition: 'transform .2s, box-shadow .2s',
          }}>
            Pitch Deck anfordern
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </FadeIn>
      <div style={{ height: 80 }}></div>
    </CVSection>
  );
}

// ═══ TOP BAR ═══
function TopBar({ label }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
      padding: 'clamp(10px,2vw,12px) clamp(16px,3vw,28px)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: 'rgba(240,243,248,0.88)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
    }}>
      <a href="../index.html" style={{
        color: D.textMuted, textDecoration: 'none', fontSize: 13,
        display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT,
        transition: 'color .2s',
      }} onMouseEnter={e => e.currentTarget.style.color = D.text}
         onMouseLeave={e => e.currentTarget.style.color = D.textMuted}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Zurück
      </a>
      <img src="assets/cordivivo-logo.png" alt="CordiVivo" style={{ height: 18, width: 'auto', opacity: 0.35 }} />
      <span style={{ fontFamily: MONO, fontSize: 10, color: D.textMuted, letterSpacing: '.1em', minWidth: 80, textAlign: 'right' }}>
        {label}
      </span>
    </div>
  );
}

// ═══ PROGRESS NAV ═══
function ProgressNav({ activeIdx, sections }) {
  return (
    <nav style={{
      position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 50,
    }}>
      {sections.map((s, i) => {
        const on = i === activeIdx;
        return (
          <button key={s.id} onClick={() => {
            const el = document.getElementById(s.id);
            if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
          }} style={{
            width: on ? 22 : 5, height: 5, borderRadius: 3,
            background: on ? (s.color || D.brand) : 'rgba(0,20,50,0.12)',
            border: 'none', cursor: 'pointer', padding: 0,
            boxShadow: on ? '0 0 10px '+(s.color || D.brand)+'50' : 'none',
            transition: 'all .5s cubic-bezier(.16,1,.3,1)',
          }} title={s.label} />
        );
      })}
    </nav>
  );
}

// ═══ MAIN APP ═══
function EngineV3App() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const mobile = useMobile();

  const SECTIONS = [
    { id: 'hero', label: '', color: D.brand },
    { id: 'problem', label: '', color: D.brand },
    { id: 'hans', label: 'Hans', color: D.brand },
    { id: 'L0', label: 'L0', color: D.brand },
    { id: 'L1', label: 'L1', color: D.red },
    { id: 'L2', label: 'L2', color: D.brand },
    { id: 'L3', label: 'L3', color: D.accent },
    { id: 'L4', label: 'L4', color: D.brand },
    { id: 'L5L6', label: 'L5/6', color: D.purple },
    { id: 'modes', label: 'A|B', color: D.brand },
    { id: 'summary', label: '∑', color: D.brand },
    { id: 'outro', label: '→', color: D.accent },
  ];

  const LABELS = [
    'Adaptive Engine', 'Das Problem', 'Patient Hans',
    'L0 · Ersteinrichtung', 'L1 · Sicherheit', 'L2 · Bestätigung',
    'L3 · Belastung', 'L4 · Progression', 'L5/L6 · Ganzheitlich',
    'Zwei Modi', 'Zusammenfassung', 'Ergebnis',
  ];

  React.useEffect(() => {
    let raf;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vpC = window.innerHeight / 2;
        let best = 0, bestDist = Infinity;
        SECTIONS.forEach((s, i) => {
          const el = document.getElementById(s.id);
          if (!el) return;
          const r = el.getBoundingClientRect();
          const d = Math.abs(r.top + r.height / 2 - vpC);
          if (d < bestDist) { bestDist = d; best = i; }
        });
        setActiveIdx(best);
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <React.Fragment>
      <TopBar label={LABELS[activeIdx]} />
      {!mobile && <ProgressNav activeIdx={activeIdx} sections={SECTIONS} />}
      <HeroSection />
      <ProblemSection />
      <HansIntroSection />
      <L0Section />
      <L1Section />
      <L2Section />
      <L3Section />
      <L4Section />
      <L5L6Section />
      <ModesSection />
      <SummarySection />
      <OutroSection />
    </React.Fragment>
  );
}

window.EngineV3App = EngineV3App;
