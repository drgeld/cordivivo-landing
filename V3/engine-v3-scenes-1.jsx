// engine-v3-scenes-1.jsx — Hero, Problem, Hans Intro, L0, L1, L2
// Depends on: D, DISPLAY, FONT, MONO, CinematicSection, CVSection, FadeIn,
//   GlassCard, DataLine, Tag, LayerBadge, LayerWatermark, SectionHeader,
//   HeartbeatLine, interp, interpEase
//   InteractiveOnboarding, InteractiveRedFlags, InteractiveConfirmation

// ═══ HERO ═══
function HeroSection() {
  return (
    <CinematicSection id="hero" height="170vh">
      {(p) => {
        const logoO = interp(p, 0, 0.08, 0, 0.5);
        const w1O = interp(p, 0.02, 0.20, 0, 1);
        const w1Y = interpEase(p, 0.02, 0.20, 50, 0);
        const w2O = interp(p, 0.10, 0.28, 0, 1);
        const w2Y = interpEase(p, 0.10, 0.28, 50, 0);
        const w3O = interp(p, 0.18, 0.38, 0, 1);
        const w3Y = interpEase(p, 0.18, 0.38, 50, 0);
        const subO = interp(p, 0.32, 0.52, 0, 1);
        const subY = interpEase(p, 0.32, 0.52, 30, 0);
        const hbO = interp(p, 0.36, 0.58, 0, 1);
        const tagO = interp(p, 0.48, 0.66, 0, 1);
        const exitO = interp(p, 0.74, 0.97, 1, 0);
        const exitS = interp(p, 0.74, 0.97, 1, 0.92);
        const scrollO = interp(p, 0, 0.25, 0.6, 0);

        return (
          <div style={{
            textAlign: 'center', width: '100%', padding: '0 clamp(20px,5vw,48px)',
            opacity: exitO, transform: 'scale('+exitS+')',
            transition: 'none',
          }}>
            {/* Ambient gradient */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(42,111,158,0.05), transparent 70%)',
            }}></div>

            {/* Logo */}
            <div style={{ marginBottom: 56, opacity: logoO, position: 'relative' }}>
              <img src="assets/cordivivo-logo.png" alt="CordiVivo"
                style={{ height: 28, width: 'auto' }} />
            </div>

            {/* Title words */}
            <h1 style={{ fontFamily: DISPLAY, fontWeight: 700, letterSpacing: '-.03em', lineHeight: 0.95, position: 'relative' }}>
              <span style={{
                display: 'block', fontSize: 'clamp(36px,5vw,64px)',
                color: D.textMuted, opacity: w1O,
                transform: 'translateY('+w1Y+'px)',
              }}>Die</span>
              <span style={{
                display: 'block', fontSize: 'clamp(44px,8vw,88px)',
                color: D.text, opacity: w2O,
                transform: 'translateY('+w2Y+'px)',
                marginTop: 4,
              }}>Adaptive</span>
              <span style={{
                display: 'block', fontSize: 'clamp(44px,8vw,88px)',
                background: 'linear-gradient(135deg, '+D.brand+', '+D.accent+')',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text', opacity: w3O,
                transform: 'translateY('+w3Y+'px)',
              }}>Engine</span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontFamily: FONT, fontSize: 'clamp(15px,1.8vw,20px)',
              color: D.textSoft, maxWidth: 460, margin: '28px auto 0',
              lineHeight: 1.6, opacity: subO,
              transform: 'translateY('+subY+'px)',
              position: 'relative',
            }}>
              7 Sicherheitsschichten. Eine Mission.<br/>
              Folgen Sie einem Patienten durch das System.
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 24, opacity: tagO, position: 'relative' }}>
              <Tag color={D.brand}>Deterministisch</Tag>
              <Tag color={D.accent}>Auditierbar</Tag>
              <Tag color={D.purple}>Medizinprodukt</Tag>
            </div>

            {/* Heartbeat line */}
            <div style={{
              position: 'absolute', bottom: '12%', left: 0, right: 0,
              opacity: hbO * 1,
            }}>
              <HeartbeatLine color={D.brand} />
            </div>

            {/* Scroll indicator */}
            <div style={{
              position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
              opacity: scrollO, animation: 'float 3s ease-in-out infinite',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            }}>
              <span style={{ fontFamily: MONO, fontSize: 9, color: D.textMuted, letterSpacing: '.2em' }}>SCROLL</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={D.textMuted} strokeWidth="1.5">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        );
      }}
    </CinematicSection>
  );
}

// ═══ PROBLEM (Stats) ═══
function ProblemSection() {
  return (
    <CinematicSection id="problem" height="190vh">
      {(p) => {
        const n1O = interp(p, 0, 0.20, 0, 1);
        const n1Y = interpEase(p, 0, 0.22, 60, 0);
        const s1O = interp(p, 0.14, 0.34, 0, 1);

        const n2O = interp(p, 0.30, 0.48, 0, 1);
        const n2Y = interpEase(p, 0.30, 0.50, 60, 0);
        const s2O = interp(p, 0.42, 0.60, 0, 1);

        const n3O = interp(p, 0.56, 0.72, 0, 1);
        const n3Y = interpEase(p, 0.56, 0.74, 40, 0);
        const n3S = interpEase(p, 0.56, 0.74, 0.9, 1);

        const exitO = interp(p, 0.82, 0.98, 1, 0);

        return (
          <div style={{ textAlign: 'center', width: '100%', padding: '0 clamp(20px,5vw,48px)', opacity: exitO, position: 'relative' }}>
            {/* Stat 1 */}
            <div style={{ marginBottom: 56, opacity: n1O, transform: 'translateY('+n1Y+'px)' }}>
              <div style={{
                fontFamily: DISPLAY, fontSize: 'clamp(52px,10vw,110px)', fontWeight: 700,
                letterSpacing: '-.04em', color: D.text, lineHeight: 1,
              }}>1,8 Mio</div>
              <div style={{
                fontFamily: FONT, fontSize: 'clamp(16px,2vw,22px)',
                color: D.textSoft, marginTop: 12, opacity: s1O,
              }}>Herzpatienten in Deutschland</div>
            </div>

            {/* Stat 2 */}
            <div style={{ marginBottom: 56, opacity: n2O, transform: 'translateY('+n2Y+'px)' }}>
              <div style={{
                fontFamily: DISPLAY, fontSize: 'clamp(44px,8vw,96px)', fontWeight: 700,
                letterSpacing: '-.04em', lineHeight: 1,
                color: D.brand,
              }}>&lt; 30%</div>
              <div style={{
                fontFamily: FONT, fontSize: 'clamp(16px,2vw,22px)',
                color: D.textSoft, marginTop: 12, opacity: s2O,
              }}>erhalten leitliniengerechte Nachsorge</div>
            </div>

            {/* Dramatic closer */}
            <div style={{ opacity: n3O, transform: 'translateY('+n3Y+'px) scale('+n3S+')' }}>
              <div style={{
                fontFamily: DISPLAY, fontSize: 'clamp(40px,7vw,80px)', fontWeight: 700,
                letterSpacing: '-.03em', lineHeight: 1,
                background: 'linear-gradient(135deg, '+D.brand+', '+D.accent+')',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Bis jetzt.</div>
            </div>
          </div>
        );
      }}
    </CinematicSection>
  );
}

// ═══ HANS INTRO ═══
function HansIntroSection() {
  const mobile = useMobile();
  return (
    <CVSection id="hans" bg="radial-gradient(ellipse 60% 40% at 50% 30%, rgba(42,111,158,0.04), transparent 70%)">
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'minmax(0,1fr) minmax(0,1fr)', gap: mobile ? 36 : 56, alignItems: 'center' }}>
        <div>
          <FadeIn><Tag color={D.accent}>Medizinprodukt · Zertifizierbar</Tag></FadeIn>
          <FadeIn delay={0.12}>
            <h2 style={{
              fontFamily: DISPLAY, fontSize: 'clamp(34px,4.5vw,52px)', fontWeight: 600,
              letterSpacing: '-.03em', color: D.text, lineHeight: 1.05, margin: '20px 0 16px',
            }}>
              Die Engine<br/>im <span style={{ color: D.brand }}>Einsatz</span>.
            </h2>
          </FadeIn>
          <FadeIn delay={0.24}>
            <p style={{ fontFamily: FONT, fontSize: 17, color: D.textSoft, lineHeight: 1.65, marginBottom: 28 }}>
              Folgen Sie Hans durch 7 Sicherheitsschichten — von der Ersteinrichtung bis zur individuell angepassten Therapie.
            </p>
          </FadeIn>
          <FadeIn delay={0.36}>
            <GlassCard accent={D.accent} glow>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <img src="assets/hans-mueller.png" style={{ width: 52, height: 52, borderRadius: 14, objectFit: 'cover', filter: 'brightness(0.97)' }} alt="Hans" />
                <div>
                  <div style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 600, color: D.text }}>Hans</div>
                  <div style={{ fontFamily: MONO, fontSize: 11, color: D.textMuted }}>62 Jahre · Herzpatient</div>
                </div>
              </div>
              <DataLine label="Diagnose" value="Herzerkrankung · nach Bypass-OP" />
              <DataLine label="Belastbarkeit" value="Leicht eingeschränkt" color={D.amber} />
              <DataLine label="Gehtest" value="380 m in 6 Min." color={D.accent} />
              <DataLine label="BMI" value="28.4" />
            </GlassCard>
          </FadeIn>
        </div>
        <FadeIn delay={0.2} x={40} y={0}>
          <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden' }}>
            <img src="assets/hans-mueller.png" alt="Hans" style={{
              width: '100%', display: 'block', aspectRatio: '4/5', objectFit: 'cover',
              filter: 'brightness(0.95) saturate(0.95)',
            }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,10,30,.55) 0%, rgba(0,10,30,.1) 35%, transparent 70%)' }}></div>
            <div style={{ position: 'absolute', bottom: 24, left: 24 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, color: D.accent, letterSpacing: '.14em', marginBottom: 4 }}>PATIENT · PORTRÄT</div>
              <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,.85)' }}>Hans, 62 — nach Bypass-OP</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </CVSection>
  );
}

// ═══ L0: Onboarding ═══
function L0Section() {
  return (
    <CVSection id="L0" bg="radial-gradient(ellipse 50% 40% at 30% 50%, rgba(42,111,158,0.04), transparent 70%)">
      <LayerWatermark number="0" color={D.brand} />
      <SectionHeader badge="L0" badgeColor={D.brand}
        title="Ersteinrichtung & Trainingsplan"
        desc="Hans absolviert einen einfachen Gehtest. Die Engine berechnet daraus sein Fitness-Level und erstellt automatisch einen persönlichen 12-Wochen-Trainingsplan." />
      <FadeIn delay={0.35}>
        <div style={{ maxWidth: 600 }}>
          <InteractiveOnboarding />
        </div>
      </FadeIn>
    </CVSection>
  );
}

// ═══ L1: Red Flags ═══
function L1Section() {
  const mobile = useMobile();
  return (
    <CVSection id="L1" bg="radial-gradient(ellipse 50% 40% at 70% 40%, rgba(196,80,80,0.03), transparent 70%)">
      <LayerWatermark number="1" color={D.red} />
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'minmax(0,1.1fr) minmax(0,1fr)', gap: mobile ? 36 : 56, alignItems: 'start' }}>
        <FadeIn>
          <div style={{ maxWidth: 520 }}>
            <InteractiveRedFlags />
          </div>
        </FadeIn>
        <div>
          <FadeIn delay={0.1}><LayerBadge id="L1" color={D.red} /></FadeIn>
          <FadeIn delay={0.15}>
            <h2 style={{
              fontFamily: DISPLAY, fontSize: 'clamp(32px,4.5vw,52px)', fontWeight: 700,
              letterSpacing: '-.03em', color: D.text, margin: '18px 0 14px', lineHeight: 1.05,
            }}>Red-Flag<br/>Sicherheits-Check</h2>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p style={{ fontFamily: FONT, fontSize: 16, color: D.textSoft, lineHeight: 1.65, marginBottom: 16 }}>
              Vor jeder Sitzung prüft die Engine wichtige Gesundheitswerte: Blutdruck, Ruhepuls, Gewichtsveränderungen und akute Beschwerden.
            </p>
            <p style={{ fontFamily: FONT, fontSize: 15, color: D.textSoft, lineHeight: 1.65 }}>
              An Tag 21 ist Hans' Blutdruck zu hoch. Die Engine empfiehlt eine Pause — <span style={{ color: D.red, fontWeight: 600 }}>blockiert aber nie</span>.
            </p>
          </FadeIn>
        </div>
      </div>
    </CVSection>
  );
}

// ═══ L2: Confirmation ═══
function L2Section() {
  return (
    <CVSection id="L2" bg="radial-gradient(ellipse 50% 40% at 50% 50%, rgba(42,111,158,0.03), transparent 70%)">
      <LayerWatermark number="2" color={D.brand} />
      <div style={{ textAlign: 'center' }}>
        <SectionHeader badge="L2" badgeColor={D.brand}
          title="Trainingsvorschlag & Bestätigung"
          desc="Die Engine schlägt vor — Hans entscheidet. Er sieht Dauer, Intensität und Trainingsart. Der Mensch hat immer das letzte Wort." />
      </div>
      <FadeIn delay={0.35}>
        <InteractiveConfirmation />
      </FadeIn>
    </CVSection>
  );
}

Object.assign(window, {
  HeroSection, ProblemSection, HansIntroSection,
  L0Section, L1Section, L2Section,
});
