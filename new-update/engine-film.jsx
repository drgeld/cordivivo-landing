// CordiVivo Engine Film — Cinematic 60s walkthrough
// Patient: Hans Müller, 62, NYHA II, KHK, post-CABG, 6MWT 380m

const { Stage, Sprite, useTime, useSprite } = window;

// ─── Design tokens ───
const C = {
  bg: '#07090f',
  surface: '#0e1320',
  card: 'rgba(14,19,32,.85)',
  ink: '#f1f4f9',
  ink2: '#c8d0de',
  muted: '#6b7a94',
  brand: '#6aa2ff',
  accent: '#5be3c6',
  red: '#f87171',
  purple: '#c084fc',
  amber: '#fbbf24',
  line: 'rgba(255,255,255,.08)',
};
const FONT = '"Space Grotesk", "Inter", system-ui, sans-serif';
const MONO = '"JetBrains Mono", "SF Mono", monospace';

// ─── Reusable components ───

function FadeIn({ children, delay = 0, duration = 0.6, direction = 'up', style = {} }) {
  const { progress } = useSprite();
  const localP = Easing.easeOutCubic(Math.max(0, Math.min(1, (progress - delay / (duration + delay)))));
  const dy = direction === 'up' ? 30 : direction === 'down' ? -30 : 0;
  const dx = direction === 'left' ? 40 : direction === 'right' ? -40 : 0;
  return (
    <div style={{
      opacity: localP,
      transform: `translate(${dx * (1 - localP)}px, ${dy * (1 - localP)}px)`,
      ...style,
    }}>{children}</div>
  );
}

function GlowDot({ color, size = 10, style = {} }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color,
      boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}40`,
      ...style,
    }}></div>
  );
}

function Tag({ children, color = C.brand }) {
  return (
    <span style={{
      fontFamily: MONO, fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase',
      fontWeight: 600, color, padding: '4px 12px', borderRadius: 999,
      background: `${color}18`, display: 'inline-block',
    }}>{children}</span>
  );
}

function LayerBadge({ id, color }) {
  return (
    <span style={{
      fontFamily: MONO, fontSize: 13, fontWeight: 700, color,
      background: `${color}18`, padding: '5px 12px', borderRadius: 8,
      display: 'inline-block',
    }}>{id}</span>
  );
}

function DataLine({ label, value, color = C.ink }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: `1px solid ${C.line}` }}>
      <span style={{ fontFamily: MONO, fontSize: 12, color: C.muted, letterSpacing: '.04em' }}>{label}</span>
      <span style={{ fontFamily: FONT, fontSize: 16, fontWeight: 500, color }}>{value}</span>
    </div>
  );
}

function FlowArrow({ color = C.brand }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
      <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
        <path d="M12 0 L12 20" stroke={color} strokeWidth="1.5" strokeDasharray="4 3"/>
        <path d="M6 16 L12 24 L18 16" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function GlassCard({ children, style = {}, accent = C.brand }) {
  return (
    <div style={{
      background: C.card,
      backdropFilter: 'blur(20px)',
      border: `1px solid ${C.line}`,
      borderLeft: `2px solid ${accent}`,
      borderRadius: 16,
      padding: '24px 28px',
      boxShadow: `0 20px 60px -20px rgba(0,0,0,.5), 0 0 40px -20px ${accent}30`,
      ...style,
    }}>{children}</div>
  );
}

// ─── Mini chart components ───

function ShewChart({ progress, width = 360, height = 120 }) {
  // Simulated session data building over time
  const sessions = [48, 52, 50, 55, 53, 58, 56, 60, 62, 72, 58, 54];
  const mean = 55;
  const ucl = 68;
  const visibleCount = Math.floor(progress * sessions.length);
  const pts = sessions.slice(0, visibleCount);
  
  const xScale = (i) => 30 + (i / (sessions.length - 1)) * (width - 60);
  const yScale = (v) => height - 20 - ((v - 40) / 40) * (height - 40);
  
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {/* UCL line */}
      <line x1="30" y1={yScale(ucl)} x2={width - 20} y2={yScale(ucl)} stroke={C.red} strokeWidth="1" strokeDasharray="4 3" opacity=".6"/>
      <text x={width - 16} y={yScale(ucl) + 4} fill={C.red} fontSize="9" fontFamily={MONO} textAnchor="end" opacity=".7">UCL</text>
      {/* Mean line */}
      <line x1="30" y1={yScale(mean)} x2={width - 20} y2={yScale(mean)} stroke={C.brand} strokeWidth="1" strokeDasharray="4 3" opacity=".4"/>
      <text x={width - 16} y={yScale(mean) + 4} fill={C.brand} fontSize="9" fontFamily={MONO} textAnchor="end" opacity=".5">μ̂</text>
      {/* Data points */}
      {pts.map((v, i) => (
        <g key={i}>
          {i > 0 && (
            <line x1={xScale(i - 1)} y1={yScale(pts[i - 1])} x2={xScale(i)} y2={yScale(v)}
              stroke={v > ucl ? C.red : C.accent} strokeWidth="1.5" opacity=".7"/>
          )}
          <circle cx={xScale(i)} cy={yScale(v)} r={v > ucl ? 5 : 3.5}
            fill={v > ucl ? C.red : C.accent}
            style={{ filter: v > ucl ? `drop-shadow(0 0 6px ${C.red})` : 'none' }}/>
        </g>
      ))}
      {/* Axis */}
      <line x1="28" y1="10" x2="28" y2={height - 15} stroke={C.line} strokeWidth="1"/>
      <text x="14" y={height / 2} fill={C.muted} fontSize="8" fontFamily={MONO} textAnchor="middle" transform={`rotate(-90 14 ${height/2})`}>sRPE-TL</text>
    </svg>
  );
}

function VitalBar({ label, value, unit, pct, color, alert = false }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontFamily: MONO, fontSize: 10, color: C.muted, letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</span>
        <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: alert ? C.red : color }}>{value} <span style={{ fontSize: 10, color: C.muted }}>{unit}</span></span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,.06)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: alert ? C.red : color, borderRadius: 2, boxShadow: alert ? `0 0 8px ${C.red}` : 'none', transition: 'width .6s ease' }}></div>
      </div>
    </div>
  );
}

// ─── SCENES ───

function Scene1_Intro() {
  return (
    <Sprite start={0} end={6}>
      <IntroContent />
    </Sprite>
  );
}

function IntroContent() {
  const { progress } = useSprite();
  const p1 = Easing.easeOutCubic(Math.min(1, progress * 3));       // 0-0.33
  const p2 = Easing.easeOutCubic(Math.max(0, Math.min(1, (progress - 0.2) * 2.5))); // 0.2-0.6
  const p3 = Easing.easeOutCubic(Math.max(0, Math.min(1, (progress - 0.45) * 2.5)));
  
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Central glow */}
      <div style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        background: `radial-gradient(circle, ${C.brand}15, transparent 70%)`,
        opacity: p1, filter: 'blur(40px)',
      }}></div>

      <div style={{ position: 'relative', textAlign: 'center' }}>
        <div style={{ opacity: p1, transform: `translateY(${20 * (1 - p1)}px)`, marginBottom: 20 }}>
          <Tag color={C.accent}>CV-SRS-ALG-001 v1.6 · IEC 62304</Tag>
        </div>

        <h1 style={{
          fontFamily: FONT, fontSize: 52, fontWeight: 500, letterSpacing: '-.03em',
          color: C.ink, opacity: p1, transform: `translateY(${30 * (1 - p1)}px)`,
          lineHeight: 1.05, margin: '0 0 16px',
        }}>
          Die <span style={{ color: C.brand }}>Adaptive Engine</span>
          <br/>im Einsatz.
        </h1>

        <p style={{
          fontFamily: FONT, fontSize: 18, color: C.muted, maxWidth: 500,
          margin: '0 auto 32px', opacity: p2, transform: `translateY(${20 * (1 - p2)}px)`,
          lineHeight: 1.55,
        }}>
          Folgen Sie einem Patienten durch 7 Sicherheitsschichten —
          von der ersten Minute bis zur adaptierten Therapie.
        </p>

        {/* Patient card */}
        <div style={{ opacity: p3, transform: `translateY(${24 * (1 - p3)}px) scale(${0.95 + p3 * 0.05})` }}>
          <GlassCard accent={C.accent} style={{ textAlign: 'left', maxWidth: 400, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: `linear-gradient(135deg, ${C.brand}30, ${C.accent}30)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>👤</div>
              <div>
                <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 600, color: C.ink }}>Hans Müller</div>
                <div style={{ fontFamily: MONO, fontSize: 11, color: C.muted }}>Patient #CV-0042 · 62 Jahre</div>
              </div>
            </div>
            <DataLine label="Diagnose" value="KHK · Post-CABG" />
            <DataLine label="NYHA" value="Klasse II" color={C.amber} />
            <DataLine label="6MWT" value="380 m" color={C.accent} />
            <DataLine label="BMI" value="28.4" />
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function Scene2_Onboarding() {
  return (
    <Sprite start={5.5} end={12}>
      <OnboardingContent />
    </Sprite>
  );
}

function OnboardingContent() {
  const { progress } = useSprite();
  const p1 = Easing.easeOutCubic(Math.min(1, progress * 4));
  const p2 = Easing.easeOutCubic(Math.max(0, Math.min(1, (progress - 0.15) * 3)));
  const p3 = Easing.easeOutCubic(Math.max(0, Math.min(1, (progress - 0.35) * 3)));
  const p4 = Easing.easeOutCubic(Math.max(0, Math.min(1, (progress - 0.55) * 3)));

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48 }}>
      {/* Left: narrative */}
      <div style={{ maxWidth: 380, opacity: p1, transform: `translateX(${-30 * (1 - p1)}px)` }}>
        <LayerBadge id="L0" color={C.brand} />
        <h2 style={{ fontFamily: FONT, fontSize: 36, fontWeight: 500, letterSpacing: '-.025em', color: C.ink, margin: '12px 0 10px', lineHeight: 1.1 }}>
          Onboarding
        </h2>
        <p style={{ fontFamily: FONT, fontSize: 15, color: C.muted, lineHeight: 1.6 }}>
          Hans absolviert den 6-Minuten-Gehtest. Die Engine berechnet seinen Fitness-Level und erstellt einen individualisierten 12-Wochen-Plan.
        </p>
      </div>

      {/* Right: flow visualization */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        <div style={{ opacity: p1, transform: `scale(${0.9 + p1 * 0.1})` }}>
          <GlassCard accent={C.brand} style={{ width: 280, textAlign: 'center' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted, letterSpacing: '.12em', marginBottom: 6 }}>6-MINUTEN-GEHTEST</div>
            <div style={{ fontFamily: FONT, fontSize: 40, fontWeight: 500, color: C.accent }}>380<span style={{ fontSize: 18, color: C.muted }}> m</span></div>
          </GlassCard>
        </div>

        <div style={{ opacity: p2 }}><FlowArrow /></div>

        <div style={{ opacity: p2, transform: `scale(${0.9 + p2 * 0.1})` }}>
          <GlassCard accent={C.brand} style={{ width: 280, textAlign: 'center' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted, letterSpacing: '.12em', marginBottom: 6 }}>CAHALIN 1996 FORMEL</div>
            <div style={{ fontFamily: FONT, fontSize: 28, fontWeight: 500, color: C.brand }}>4.2 <span style={{ fontSize: 14, color: C.muted }}>MET</span></div>
            <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted, marginTop: 4 }}>× 0.95 NYHA-II · × 0.98 BMI</div>
          </GlassCard>
        </div>

        <div style={{ opacity: p3 }}><FlowArrow /></div>

        <div style={{ opacity: p3, transform: `scale(${0.9 + p3 * 0.1})` }}>
          <GlassCard accent={C.accent} style={{ width: 280, textAlign: 'center' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted, letterSpacing: '.12em', marginBottom: 6 }}>BELASTUNGSSTUFE</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 4 }}>
              {['A', 'B', 'C', 'D'].map(s => (
                <div key={s} style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: s === 'B' ? C.accent : 'rgba(255,255,255,.04)',
                  border: `1px solid ${s === 'B' ? C.accent : C.line}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONT, fontSize: 18, fontWeight: 600,
                  color: s === 'B' ? C.bg : C.muted,
                  boxShadow: s === 'B' ? `0 0 20px ${C.accent}40` : 'none',
                }}>{s}</div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div style={{ opacity: p4 }}><FlowArrow color={C.accent} /></div>

        <div style={{ opacity: p4, transform: `scale(${0.9 + p4 * 0.1})` }}>
          <GlassCard accent={C.accent} style={{ width: 280 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted, letterSpacing: '.12em', marginBottom: 8 }}>12-WOCHEN-PLAN GENERIERT</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(w => (
                <div key={w} style={{
                  flex: 1, height: 20 + w * 2, borderRadius: 3,
                  background: `linear-gradient(180deg, ${C.brand}60, ${C.accent}60)`,
                  opacity: 0.5 + w * 0.04,
                }}></div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function Scene3_RedFlags() {
  return (
    <Sprite start={11.5} end={20}>
      <RedFlagsContent />
    </Sprite>
  );
}

function RedFlagsContent() {
  const { progress } = useSprite();
  const p1 = Easing.easeOutCubic(Math.min(1, progress * 4));
  const p2 = Easing.easeOutCubic(Math.max(0, Math.min(1, (progress - 0.15) * 3)));
  const pAlert = Easing.easeOutCubic(Math.max(0, Math.min(1, (progress - 0.55) * 3)));
  const pResolved = Easing.easeOutCubic(Math.max(0, Math.min(1, (progress - 0.75) * 3)));
  
  const showAlert = progress > 0.5;
  const resolved = progress > 0.72;

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48 }}>
      <div style={{ maxWidth: 340, opacity: p1, transform: `translateX(${-30 * (1 - p1)}px)` }}>
        <LayerBadge id="L1" color={C.red} />
        <h2 style={{ fontFamily: FONT, fontSize: 36, fontWeight: 500, letterSpacing: '-.025em', color: C.ink, margin: '12px 0 10px', lineHeight: 1.1 }}>
          Red-Flag<br/>Sicherheits-Check
        </h2>
        <p style={{ fontFamily: FONT, fontSize: 15, color: C.muted, lineHeight: 1.6 }}>
          Vor jeder Sitzung prüft die Engine absolute Kontraindikationen. Die Engine blockiert nie — sie berät.
        </p>
        <div style={{ marginTop: 16, opacity: pAlert }}>
          <Tag color={C.red}>Advisory-only Architektur</Tag>
        </div>
      </div>

      <div style={{ width: 360 }}>
        <GlassCard accent={showAlert && !resolved ? C.red : C.accent} style={{ width: '100%' }}>
          <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted, letterSpacing: '.12em', marginBottom: 14 }}>PRÄ-SESSION VITALDATEN · HANS MÜLLER</div>
          
          <div style={{ opacity: p2 }}>
            <VitalBar label="Blutdruck" value={showAlert ? "185/112" : "138/82"} unit="mmHg" pct={showAlert ? 92 : 68} color={C.brand} alert={showAlert && !resolved} />
            <VitalBar label="Ruhepuls" value="72" unit="bpm" pct={55} color={C.accent} />
            <VitalBar label="Gewicht Δ3d" value="+0.4" unit="kg" pct={20} color={C.brand} />
          </div>

          {showAlert && !resolved && (
            <div style={{
              marginTop: 14, padding: '12px 16px', borderRadius: 10,
              background: `${C.red}12`, border: `1px solid ${C.red}30`,
              opacity: pAlert,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <GlowDot color={C.red} size={8} />
                <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: C.red, letterSpacing: '.06em' }}>🔴 RED ADVISORY</span>
              </div>
              <div style={{ fontFamily: FONT, fontSize: 13, color: C.ink2, lineHeight: 1.5 }}>
                BP ≥ 180/110 — Hypertensive Urgenz. Empfehlung: kein Training heute. Patient entscheidet.
              </div>
            </div>
          )}

          {resolved && (
            <div style={{
              marginTop: 14, padding: '12px 16px', borderRadius: 10,
              background: `${C.accent}12`, border: `1px solid ${C.accent}30`,
              opacity: pResolved,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <GlowDot color={C.accent} size={8} />
                <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: C.accent }}>NÄCHSTER TAG · 138/82 mmHg</span>
              </div>
              <div style={{ fontFamily: FONT, fontSize: 13, color: C.ink2 }}>
                ✓ Alle Checks bestanden → Weiter zu Layer 2
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}

function Scene4_Confirmation() {
  return (
    <Sprite start={19.5} end={26}>
      <ConfirmationContent />
    </Sprite>
  );
}

function ConfirmationContent() {
  const { progress } = useSprite();
  const p1 = Easing.easeOutCubic(Math.min(1, progress * 4));
  const p2 = Easing.easeOutCubic(Math.max(0, Math.min(1, (progress - 0.25) * 3)));
  const p3 = Easing.easeOutCubic(Math.max(0, Math.min(1, (progress - 0.55) * 3)));

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48 }}>
      <div style={{ maxWidth: 340, opacity: p1, transform: `translateX(${-30 * (1 - p1)}px)` }}>
        <LayerBadge id="L2" color={C.brand} />
        <h2 style={{ fontFamily: FONT, fontSize: 36, fontWeight: 500, letterSpacing: '-.025em', color: C.ink, margin: '12px 0 10px', lineHeight: 1.1 }}>
          Session-Proposal
        </h2>
        <p style={{ fontFamily: FONT, fontSize: 15, color: C.muted, lineHeight: 1.6 }}>
          Die Engine schlägt vor. Hans entscheidet. Er sieht Dauer, Intensität und Trainingsmodus — und bestätigt oder passt an.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <div style={{ opacity: p1, transform: `scale(${0.95 + p1 * 0.05})` }}>
          <GlassCard accent={C.brand} style={{ width: 320 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted, letterSpacing: '.12em', marginBottom: 12 }}>THERAPIEVORSCHLAG · SITZUNG 14</div>
            <DataLine label="Dauer" value="25 min" color={C.accent} />
            <DataLine label="CR-10 Zielzone" value="3.0 – 3.5" color={C.brand} />
            <DataLine label="Modus" value="Ergometer · MCT" />
            <DataLine label="Stufe" value="B · Woche 5" color={C.amber} />
          </GlassCard>
        </div>

        <div style={{ opacity: p2 }}><FlowArrow color={C.accent} /></div>

        <div style={{ opacity: p2, display: 'flex', gap: 12 }}>
          <div style={{
            padding: '12px 24px', borderRadius: 999,
            background: p3 > 0 ? C.accent : 'transparent',
            border: `1px solid ${C.accent}`,
            color: p3 > 0 ? C.bg : C.accent,
            fontFamily: FONT, fontSize: 14, fontWeight: 600,
            boxShadow: p3 > 0 ? `0 0 24px ${C.accent}40` : 'none',
            transition: 'all .4s ease',
          }}>✓ Bestätigen</div>
          <div style={{
            padding: '12px 24px', borderRadius: 999,
            border: `1px solid ${C.line}`,
            color: C.muted,
            fontFamily: FONT, fontSize: 14, fontWeight: 500,
          }}>Anpassen</div>
          <div style={{
            padding: '12px 24px', borderRadius: 999,
            border: `1px solid ${C.line}`,
            color: C.muted,
            fontFamily: FONT, fontSize: 14, fontWeight: 500,
          }}>Pausieren</div>
        </div>

        {p3 > 0 && (
          <div style={{ opacity: p3, fontFamily: MONO, fontSize: 12, color: C.accent, letterSpacing: '.08em' }}>
            CONFIRMED → Patient trainiert
          </div>
        )}
      </div>
    </div>
  );
}

function Scene5_DoseTracking() {
  return (
    <Sprite start={25.5} end={35}>
      <DoseContent />
    </Sprite>
  );
}

function DoseContent() {
  const { progress } = useSprite();
  const p1 = Easing.easeOutCubic(Math.min(1, progress * 4));
  const chartP = Math.max(0, Math.min(1, (progress - 0.2) / 0.6));

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48 }}>
      <div style={{ maxWidth: 340, opacity: p1, transform: `translateX(${-30 * (1 - p1)}px)` }}>
        <LayerBadge id="L3" color={C.accent} />
        <h2 style={{ fontFamily: FONT, fontSize: 36, fontWeight: 500, letterSpacing: '-.025em', color: C.ink, margin: '12px 0 10px', lineHeight: 1.1 }}>
          Dosis-Tracking
        </h2>
        <p style={{ fontFamily: FONT, fontSize: 15, color: C.muted, lineHeight: 1.6 }}>
          Talk Test und Borg CR-10 nach jeder Sitzung. Die Engine berechnet den sRPE-TL und überwacht per Shewhart I-Chart ob die Belastung im sicheren Korridor liegt.
        </p>
        <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Tag color={C.accent}>Foster sRPE-TL</Tag>
          <Tag color={C.brand}>Shewhart I-Chart</Tag>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Talk Test */}
        <div style={{ opacity: p1, transform: `scale(${0.95 + p1 * 0.05})` }}>
          <GlassCard accent={C.accent} style={{ width: 380 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted, letterSpacing: '.12em', marginBottom: 10 }}>TALK TEST · POST-SESSION</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[{ l: 'Comfortable', c: C.accent, v: '≤ VT1' }, { l: 'Difficult', c: C.amber, v: 'VT1–VT2' }, { l: 'Impossible', c: C.red, v: '> VT2' }].map((t, i) => (
                <div key={i} style={{
                  flex: 1, padding: '10px 8px', borderRadius: 10, textAlign: 'center',
                  background: i === 0 ? `${t.c}15` : 'rgba(255,255,255,.02)',
                  border: `1px solid ${i === 0 ? t.c + '40' : C.line}`,
                }}>
                  <div style={{ fontFamily: MONO, fontSize: 10, color: t.c, fontWeight: 600 }}>{t.l}</div>
                  <div style={{ fontFamily: MONO, fontSize: 9, color: C.muted, marginTop: 2 }}>{t.v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, fontFamily: MONO, fontSize: 12, color: C.ink2 }}>
              CR-10: <span style={{ color: C.accent, fontWeight: 600 }}>3.0</span> · Dauer: <span style={{ color: C.accent, fontWeight: 600 }}>25 min</span> · sRPE-TL: <span style={{ color: C.brand, fontWeight: 600 }}>75</span>
            </div>
          </GlassCard>
        </div>

        {/* Shewhart Chart */}
        <div style={{ opacity: Math.min(1, chartP * 3), transform: `translateY(${20 * (1 - Math.min(1, chartP * 3))}px)` }}>
          <GlassCard accent={C.brand} style={{ width: 380 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontFamily: MONO, fontSize: 10, color: C.muted, letterSpacing: '.12em' }}>SHEWHART I-CHART · ROLLING 12</span>
              {chartP > 0.7 && <span style={{ fontFamily: MONO, fontSize: 10, color: C.red, fontWeight: 700 }}>⚠ z ≥ 2.5 DETECTED</span>}
            </div>
            <ShewChart progress={Easing.easeInOutCubic(chartP)} width={330} height={110} />
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function Scene6_Progression() {
  return (
    <Sprite start={34.5} end={42}>
      <ProgressionContent />
    </Sprite>
  );
}

function ProgressionContent() {
  const { progress } = useSprite();
  const p1 = Easing.easeOutCubic(Math.min(1, progress * 4));
  const p2 = Easing.easeOutCubic(Math.max(0, Math.min(1, (progress - 0.25) * 3)));
  const p3 = Easing.easeOutCubic(Math.max(0, Math.min(1, (progress - 0.6) * 3)));

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48 }}>
      <div style={{ maxWidth: 340, opacity: p1, transform: `translateX(${-30 * (1 - p1)}px)` }}>
        <LayerBadge id="L4" color={C.brand} />
        <h2 style={{ fontFamily: FONT, fontSize: 36, fontWeight: 500, letterSpacing: '-.025em', color: C.ink, margin: '12px 0 10px', lineHeight: 1.1 }}>
          Progression &<br/>Regression
        </h2>
        <p style={{ fontFamily: FONT, fontSize: 15, color: C.muted, lineHeight: 1.6 }}>
          Der adaptive Kern: Volumen wächst vor Intensität. Bei Überlastung greift das Shewhart-getriebene Active Recovery Protocol.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: 380 }}>
        {/* Progression rules */}
        <div style={{ opacity: p1 }}>
          <GlassCard accent={C.accent} style={{ width: '100%' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, color: C.accent, letterSpacing: '.12em', marginBottom: 10 }}>PROGRESSION</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${C.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 12, color: C.accent, fontWeight: 700 }}>3×</div>
                <div><div style={{ fontFamily: FONT, fontSize: 13, color: C.ink }}>Leichte Sitzungen → <span style={{ color: C.accent }}>+10% Dauer</span></div></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${C.brand}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 12, color: C.brand, fontWeight: 700 }}>4×</div>
                <div><div style={{ fontFamily: FONT, fontSize: 13, color: C.ink }}>Leichte Sitzungen → <span style={{ color: C.brand }}>+0.5 CR-10</span></div></div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Hans's progression */}
        <div style={{ opacity: p2 }}>
          <GlassCard accent={C.brand} style={{ width: '100%' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted, letterSpacing: '.12em', marginBottom: 10 }}>HANS · WOCHE 1–8</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 60 }}>
              {[20, 22, 22, 25, 25, 25, 28, 30].map((d, i) => {
                const vis = i / 8 < p2;
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <div style={{ fontFamily: MONO, fontSize: 8, color: C.muted, opacity: vis ? 1 : 0 }}>{d}′</div>
                    <div style={{
                      width: '100%', height: vis ? d * 1.8 : 0, borderRadius: 3,
                      background: `linear-gradient(180deg, ${C.brand}, ${C.accent})`,
                      transition: 'height .6s ease', opacity: 0.7,
                    }}></div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Active Recovery */}
        <div style={{ opacity: p3 }}>
          <GlassCard accent={C.red} style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <GlowDot color={C.red} size={8} />
              <span style={{ fontFamily: MONO, fontSize: 10, color: C.red, letterSpacing: '.08em', fontWeight: 700 }}>ACTIVE RECOVERY · z ≥ 2.5</span>
            </div>
            <div style={{ fontFamily: FONT, fontSize: 13, color: C.ink2, lineHeight: 1.5 }}>
              Shewhart z-Score überschritten → Automatische Reduktion auf 50% Dauer, Floor CR-10. Rückkehr nach 2 stabilen Sitzungen.
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function Scene7_PsychMultimodal() {
  return (
    <Sprite start={41.5} end={50}>
      <PsychContent />
    </Sprite>
  );
}

function PsychContent() {
  const { progress } = useSprite();
  const p1 = Easing.easeOutCubic(Math.min(1, progress * 4));
  const p2 = Easing.easeOutCubic(Math.max(0, Math.min(1, (progress - 0.3) * 3)));
  const p3 = Easing.easeOutCubic(Math.max(0, Math.min(1, (progress - 0.55) * 3)));

  const pillars = [
    { name: 'Bewegung', sub: 'L0–L4', color: C.accent },
    { name: 'Stress', sub: '2×/Wo', color: C.brand },
    { name: 'Entspannung', sub: '2×/Wo', color: C.purple },
    { name: 'Ernährung', sub: '1×/Wo', color: C.amber },
    { name: 'Edukation', sub: 'Kontext', color: C.brand },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* L5 */}
        <div style={{ opacity: p1, transform: `translateX(${-20 * (1 - p1)}px)` }}>
          <LayerBadge id="L5" color={C.purple} />
          <h2 style={{ fontFamily: FONT, fontSize: 32, fontWeight: 500, letterSpacing: '-.025em', color: C.ink, margin: '10px 0 8px', lineHeight: 1.1 }}>
            Psychologisches Monitoring
          </h2>
          <p style={{ fontFamily: FONT, fontSize: 14, color: C.muted, lineHeight: 1.55, maxWidth: 340 }}>
            Alle 4 Wochen: PHQ-4 → PHQ-9/GAD-7 Expansion. Automatische RPE-Anpassung bei erhöhten Scores.
          </p>
        </div>

        {/* L5 card */}
        <div style={{ opacity: p1 }}>
          <GlassCard accent={C.purple} style={{ width: 360 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted, letterSpacing: '.12em', marginBottom: 10 }}>HANS · WOCHE 4 · PHQ-4 PRESCREEN</div>
            <div style={{ display: 'flex', gap: 24, marginBottom: 10 }}>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 9, color: C.muted }}>PHQ-2</div>
                <div style={{ fontFamily: FONT, fontSize: 28, fontWeight: 500, color: C.accent }}>1</div>
              </div>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 9, color: C.muted }}>GAD-2</div>
                <div style={{ fontFamily: FONT, fontSize: 28, fontWeight: 500, color: C.accent }}>2</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ fontFamily: MONO, fontSize: 11, color: C.accent, fontWeight: 600 }}>✓ Unter Schwelle — keine Expansion nötig</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* L6 */}
        <div style={{ opacity: p2, transform: `translateX(${20 * (1 - p2)}px)` }}>
          <LayerBadge id="L6" color={C.amber} />
          <h2 style={{ fontFamily: FONT, fontSize: 32, fontWeight: 500, letterSpacing: '-.025em', color: C.ink, margin: '10px 0 8px', lineHeight: 1.1 }}>
            5 Therapie-Säulen
          </h2>
        </div>

        {/* Pillars */}
        <div style={{ opacity: p2, display: 'flex', gap: 8 }}>
          {pillars.map((p, i) => (
            <div key={i} style={{
              opacity: Math.min(1, Math.max(0, (p3 - i * 0.1) * 5)),
              transform: `translateY(${10 * (1 - Math.min(1, Math.max(0, (p3 - i * 0.1) * 5)))}px)`,
              width: 72, padding: '14px 6px', borderRadius: 12, textAlign: 'center',
              background: `${p.color}10`, border: `1px solid ${p.color}30`,
            }}>
              <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: p.color }}>{p.name}</div>
              <div style={{ fontFamily: MONO, fontSize: 9, color: C.muted, marginTop: 4 }}>{p.sub}</div>
            </div>
          ))}
        </div>

        {/* Week schedule */}
        <div style={{ opacity: p3 }}>
          <GlassCard accent={C.amber} style={{ width: 380 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, color: C.muted, letterSpacing: '.12em', marginBottom: 8 }}>HANS · WOCHENPLAN · WOCHE 5</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((d, i) => {
                const types = [
                  [C.accent],          // Mo: Bewegung
                  [C.purple],          // Di: Entspannung
                  [C.accent, C.amber], // Mi: Bewegung + Ernährung
                  [C.brand],           // Do: Stress
                  [C.accent],          // Fr: Bewegung
                  [C.purple],          // Sa: Entspannung
                  [],                  // So: Ruhe
                ];
                return (
                  <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontFamily: MONO, fontSize: 9, color: C.muted, marginBottom: 4 }}>{d}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 20 }}>
                      {types[i].map((c, j) => (
                        <div key={j} style={{ height: 6, borderRadius: 3, background: c }}></div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function Scene8_ModesOutro() {
  return (
    <Sprite start={49.5} end={60}>
      <ModesOutroContent />
    </Sprite>
  );
}

function ModesOutroContent() {
  const { progress } = useSprite();
  const p1 = Easing.easeOutCubic(Math.min(1, progress * 4));
  const p2 = Easing.easeOutCubic(Math.max(0, Math.min(1, (progress - 0.2) * 3)));
  const pOutro = Easing.easeOutCubic(Math.max(0, Math.min(1, (progress - 0.65) * 3)));

  const showOutro = progress > 0.6;

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {!showOutro ? (
        <>
          <div style={{ opacity: p1, textAlign: 'center', marginBottom: 32 }}>
            <Tag color={C.brand}>Zwei Betriebsmodi · Ein Algorithmus</Tag>
            <h2 style={{ fontFamily: FONT, fontSize: 40, fontWeight: 500, letterSpacing: '-.03em', color: C.ink, margin: '14px 0 0', lineHeight: 1.1 }}>
              Mode A vs. Mode B
            </h2>
          </div>

          <div style={{ display: 'flex', gap: 24, opacity: p2 }}>
            <GlassCard accent={C.brand} style={{ width: 320 }}>
              <Tag color={C.brand}>Mode A</Tag>
              <h3 style={{ fontFamily: FONT, fontSize: 24, fontWeight: 500, color: C.ink, margin: '12px 0 8px' }}>Tele-IRENA</h3>
              <p style={{ fontFamily: FONT, fontSize: 13, color: C.muted, lineHeight: 1.55, marginBottom: 14 }}>
                Therapeut-in-the-Loop. Die Engine empfiehlt — der Therapeut genehmigt. CDSS-Muster: „suggest and validate".
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {['Therapeut genehmigt jeden Plan', 'RPE-Ceiling Authority beim Kliniker', 'DRV §50 · Anlage 50'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <GlowDot color={C.brand} size={6} />
                    <span style={{ fontFamily: FONT, fontSize: 12, color: C.ink2 }}>{t}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard accent={C.accent} style={{ width: 320 }}>
              <Tag color={C.accent}>Mode B</Tag>
              <h3 style={{ fontFamily: FONT, fontSize: 24, fontWeight: 500, color: C.ink, margin: '12px 0 8px' }}>DiGA-Pfad</h3>
              <p style={{ fontFamily: FONT, fontSize: 13, color: C.muted, lineHeight: 1.55, marginBottom: 14 }}>
                Autonome patientenbestätigte Therapie. Algorithmus empfiehlt, Patient entscheidet. Advisory-only.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {['Patient bestätigt jede Sitzung', 'Algorithmus setzt alle Grenzen', 'BfArM · GKV-erstattet'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <GlowDot color={C.accent} size={6} />
                    <span style={{ fontFamily: FONT, fontSize: 12, color: C.ink2 }}>{t}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', opacity: pOutro, transform: `scale(${0.95 + pOutro * 0.05})` }}>
          <div style={{
            position: 'absolute', width: 500, height: 500, borderRadius: '50%',
            background: `radial-gradient(circle, ${C.accent}12, transparent 70%)`,
            left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
            filter: 'blur(60px)',
          }}></div>
          <div style={{ position: 'relative' }}>
            <h2 style={{
              fontFamily: FONT, fontSize: 52, fontWeight: 500, letterSpacing: '-.035em',
              color: C.ink, lineHeight: 1.05, margin: '0 0 20px',
            }}>
              Deterministisch.<br/>
              <span style={{ color: C.brand }}>Auditierbar.</span><br/>
              <span style={{ color: C.accent }}>Sicher.</span>
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 18, color: C.muted, maxWidth: 460, margin: '0 auto 28px', lineHeight: 1.55 }}>
              7 Schichten. 13 FMEA-Hazards. Jeder Pfad reproduzierbar geloggt.
              Kein ML, kein Zufall — nur Evidenz.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Tag color={C.brand}>IEC 62304</Tag>
              <Tag color={C.accent}>ISO 14971</Tag>
              <Tag color={C.purple}>MDR Klasse IIa</Tag>
              <Tag color={C.amber}>CV-SRS-ALG-001 v1.6</Tag>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Layer indicator (bottom) ───
function LayerIndicator() {
  const t = useTime();
  const layers = [
    { id: 'L0', color: C.brand, start: 5.5 },
    { id: 'L1', color: C.red, start: 11.5 },
    { id: 'L2', color: C.brand, start: 19.5 },
    { id: 'L3', color: C.accent, start: 25.5 },
    { id: 'L4', color: C.brand, start: 34.5 },
    { id: 'L5', color: C.purple, start: 41.5 },
    { id: 'L6', color: C.amber, start: 49.5 },
  ];

  let activeIdx = -1;
  for (let i = layers.length - 1; i >= 0; i--) {
    if (t >= layers[i].start) { activeIdx = i; break; }
  }

  if (t < 5 || t > 57) return null;

  return (
    <div style={{
      position: 'absolute', bottom: 52, left: '50%', transform: 'translateX(-50%)',
      display: 'flex', gap: 6, zIndex: 20,
    }}>
      {layers.map((l, i) => (
        <div key={i} style={{
          width: activeIdx === i ? 28 : 8, height: 8, borderRadius: 4,
          background: activeIdx === i ? l.color : 'rgba(255,255,255,.15)',
          transition: 'all .5s cubic-bezier(.16,1,.3,1)',
          boxShadow: activeIdx === i ? `0 0 10px ${l.color}60` : 'none',
        }}></div>
      ))}
    </div>
  );
}

// ─── Main Scene ───
function EngineFilm() {
  return (
    <Stage width={1280} height={720} duration={60} background={C.bg}>
      <Scene1_Intro />
      <Scene2_Onboarding />
      <Scene3_RedFlags />
      <Scene4_Confirmation />
      <Scene5_DoseTracking />
      <Scene6_Progression />
      <Scene7_PsychMultimodal />
      <Scene8_ModesOutro />
      <LayerIndicator />
    </Stage>
  );
}

window.EngineFilm = EngineFilm;
