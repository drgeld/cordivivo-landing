// engine-v3-widgets.jsx — Dark cinematic interactive elements
// Depends on: D, DISPLAY, FONT, MONO, GlassCard, DataLine, VitalBar, GlowDot,
//   LiveIndicator, StatusStamp, Tag, EngineSlider, LiveTimestamp, FadeIn, useInView

// ═══ L0: Interactive 6MWT → Stufe ═══
function InteractiveOnboarding() {
  const [distance, setDistance] = React.useState(380);
  const [manualStufe, setManualStufe] = React.useState(null);
  const met = Math.round(((distance * 0.03 + 3.95) / 3.5) * 10) / 10;
  const adj = Math.round(met * 0.95 * 0.98 * 10) / 10;
  const calcS = adj >= 7.1 ? 'A' : adj >= 5.0 ? 'B' : adj >= 3.5 ? 'C' : 'D';
  const stufe = manualStufe || calcS;
  const sc = { A: D.accent, B: D.brand, C: D.amber, D: D.red };
  const sd = { A: { d: 770 }, B: { d: 550 }, C: { d: 380 }, D: { d: 220 } };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
      <EngineSlider value={distance} onChange={v => { setDistance(v); setManualStufe(null); }}
        min={150} max={800} step={5} color={D.brand} label="Gehtest-Distanz" valueLabel={distance + ' m'} />
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'center' }}>
        <GlassCard accent={D.brand} style={{ flex: 1, textAlign: 'center', padding: '20px 16px' }}>
          <div style={{ fontFamily: MONO, fontSize: 9, color: D.textMuted, letterSpacing: '.12em', marginBottom: 6 }}>FITNESS</div>
          <div style={{ fontFamily: DISPLAY, fontSize: 38, fontWeight: 700, color: D.brand, lineHeight: 1, transition: 'color .3s' }}>{adj.toFixed(1)}</div>
          <div style={{ fontFamily: MONO, fontSize: 10, color: D.textMuted, marginTop: 4 }}>Einheiten</div>
        </GlassCard>
        <svg width="28" height="20" viewBox="0 0 28 20" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
          <path d="M0 10h20" stroke={sc[stufe]} strokeWidth="1.5" strokeDasharray="3 2"/>
          <path d="M18 5l6 5-6 5" stroke={sc[stufe]} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
        <GlassCard accent={sc[stufe]} style={{ flex: 1, textAlign: 'center', padding: '20px 16px' }}>
          <div style={{ fontFamily: MONO, fontSize: 9, color: D.textMuted, letterSpacing: '.12em', marginBottom: 8 }}>STUFE</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
            {['A','B','C','D'].map(s => (
              <div key={s} onClick={() => { setManualStufe(s); setDistance(sd[s].d); }} style={{
                cursor: 'pointer', width: 38, height: 38, borderRadius: 10,
                background: s === stufe ? sc[stufe] : 'rgba(0,20,50,0.03)',
                border: '1.5px solid ' + (s === stufe ? sc[stufe] : D.border),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: DISPLAY, fontSize: 16, fontWeight: 700,
                color: s === stufe ? '#fff' : D.textMuted,
                boxShadow: s === stufe ? '0 0 20px '+sc[stufe]+'40' : 'none',
                transition: 'all .3s ease',
              }}>{s}</div>
            ))}
          </div>
        </GlassCard>
      </div>
      <div style={{ textAlign: 'center', fontFamily: MONO, fontSize: 10, color: D.textMuted, opacity: 0.5 }}>
        Regler bewegen oder Stufe anklicken
      </div>
    </div>
  );
}

// ═══ L1: Red Flags Toggle ═══
function InteractiveRedFlags() {
  const [isRed, setIsRed] = React.useState(false);
  const bp = isRed ? '185/112' : '138/82';
  const hr = isRed ? '102' : '72';
  const wt = isRed ? '+2.4' : '+0.4';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden', border: '1px solid '+D.border }}>
        <button onClick={() => setIsRed(false)} style={{
          flex: 1, padding: '13px 16px', border: 'none', cursor: 'pointer',
          fontFamily: FONT, fontSize: 13, fontWeight: 600,
          background: !isRed ? D.accent+'15' : 'transparent',
          color: !isRed ? D.accent : D.textMuted,
          borderRight: '1px solid '+D.border, transition: 'all .3s',
        }}>✓ Normaler Tag</button>
        <button onClick={() => setIsRed(true)} style={{
          flex: 1, padding: '13px 16px', border: 'none', cursor: 'pointer',
          fontFamily: FONT, fontSize: 13, fontWeight: 600,
          background: isRed ? D.red+'12' : 'transparent',
          color: isRed ? D.red : D.textMuted, transition: 'all .3s',
        }}>⚠ Auffälliger Tag</button>
      </div>
      <GlassCard accent={isRed ? D.red : D.accent} glow={isRed} style={{ width: '100%', transition: 'all .4s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontFamily: MONO, fontSize: 11, color: isRed ? D.red : D.accent, letterSpacing: '.1em', transition: 'color .3s' }}>
            {isRed ? '⚠ RED FLAG DETEKTIERT' : '✓ ALLE CHECKS BESTANDEN'}
          </span>
          <LiveIndicator label={isRed ? 'WARNUNG' : 'OK'} color={isRed ? D.red : D.accent} />
        </div>
        <VitalBar label="Blutdruck" value={bp} unit="mmHg" pct={isRed ? 93 : 68} color={D.brand} alert={isRed} />
        <VitalBar label="Ruhepuls" value={hr} unit="bpm" pct={isRed ? 78 : 55} color={D.accent} alert={isRed} />
        <VitalBar label="Gewicht Δ3d" value={wt} unit="kg" pct={isRed ? 75 : 20} color={D.brand} alert={isRed} />
        <div style={{ marginTop: 14 }}>
          {isRed ? (
            <div style={{ padding: '12px 16px', borderRadius: 10, background: D.red+'08', border: '1px solid '+D.red+'18' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <GlowDot color={D.red} size={7} />
                <span style={{ fontFamily: MONO, fontSize: 11, color: D.red, fontWeight: 700 }}>EMPFEHLUNG: HEUTE KEIN TRAINING</span>
              </div>
              <div style={{ fontFamily: FONT, fontSize: 12.5, color: D.textSoft, lineHeight: 1.5 }}>
                Blutdruck und Gewicht auffällig. Hans entscheidet selbst — die Engine blockiert nie.
              </div>
            </div>
          ) : <StatusStamp status="ok" label="Training kann starten" />}
        </div>
      </GlassCard>
    </div>
  );
}

// ═══ L2: Confirmation ═══
function InteractiveConfirmation() {
  const [choice, setChoice] = React.useState(null);
  const mobile = useMobile();
  const paths = {
    confirm: { color: D.accent, icon: '✓', title: 'Training startet', desc: 'Hans trainiert 25 min auf dem Ergometer. Belastungszone: leicht bis mittel.', session: '25 min · Ergometer · Stufe C' },
    adapt: { color: D.amber, icon: '↓', title: 'Reduzierte Sitzung', desc: 'Hans fühlt sich heute nicht ganz fit. Die Engine passt an: kürzere Dauer, niedrigere Intensität.', session: '15 min · Leichtes Gehen · Stufe C (reduziert)' },
    pause: { color: D.textMuted, icon: '⏸', title: 'Ruhetag eingeplant', desc: 'Hans pausiert heute. Die Engine verschiebt die Sitzung und passt den Wochenplan automatisch an.', session: 'Ruhetag · Nächste Sitzung: morgen' },
  };
  const active = choice ? paths[choice] : null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 500, margin: '0 auto' }}>
      <GlassCard accent={D.brand} style={{ textAlign: 'left' }}>
        <div style={{ fontFamily: MONO, fontSize: 11, color: D.textMuted, letterSpacing: '.12em', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          THERAPIEVORSCHLAG · SITZUNG 14<LiveTimestamp />
        </div>
        <DataLine label="Dauer" value="25 min" color={D.accent} />
        <DataLine label="Belastungszone" value="Leicht bis mittel" color={D.brand} />
        <DataLine label="Trainingsart" value="Fahrradergometer" />
        <DataLine label="Stufe" value="C · Woche 5" color={D.amber} />
      </GlassCard>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: mobile ? 'wrap' : 'nowrap' }}>
        {[
          { key: 'confirm', label: '✓ Bestätigen', color: D.accent },
          { key: 'adapt', label: '↓ Anpassen', color: D.amber },
          { key: 'pause', label: '⏸ Pausieren', color: D.textMuted },
        ].map(b => (
          <button key={b.key} onClick={() => setChoice(b.key)} style={{
            padding: mobile ? '11px 16px' : '12px 22px', borderRadius: 999, cursor: 'pointer',
            fontFamily: FONT, fontSize: mobile ? 13 : 14, fontWeight: 600,
            background: choice === b.key ? b.color : 'transparent',
            color: choice === b.key ? (b.key === 'pause' ? D.text : '#fff') : b.color,
            border: '1.5px solid ' + (choice === b.key ? b.color : b.color + '30'),
            boxShadow: choice === b.key ? '0 0 24px '+b.color+'30' : 'none',
            transition: 'all .3s ease', flex: mobile ? '1 1 auto' : 'unset',
          }}>{b.label}</button>
        ))}
      </div>
      {active && (
        <GlassCard accent={active.color}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: active.color+'12',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, border: '1px solid '+active.color+'25',
            }}>{active.icon}</div>
            <div>
              <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: D.text }}>{active.title}</div>
              <div style={{ fontFamily: MONO, fontSize: 10, color: active.color }}>{active.session}</div>
            </div>
          </div>
          <p style={{ fontFamily: FONT, fontSize: 13.5, color: D.textSoft, lineHeight: 1.6, margin: 0 }}>{active.desc}</p>
        </GlassCard>
      )}
    </div>
  );
}

// ═══ L3: Dose Tracking ═══
function InteractiveDoseTracking() {
  const [ex, setEx] = React.useState(3);
  const tt = ex <= 3 ? 0 : ex <= 5 ? 1 : 2;
  const tl = ['Kann sprechen', 'Schwer zu sprechen', 'Kann nicht sprechen'];
  const te = [2, 4, 7]; const tc = [D.accent, D.amber, D.red];
  const load = Math.round(ex * 25);
  const zl = ex <= 3 ? 'Optimal' : ex <= 5 ? 'Erhöht' : 'Überlastung';
  const zc = ex <= 3 ? D.accent : ex <= 5 ? D.amber : D.red;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
      <EngineSlider value={ex} onChange={setEx} min={1} max={8} step={0.5}
        color={zc} label="Gefühlte Belastung" valueLabel={ex.toFixed(1)} />
      <GlassCard accent={zc} style={{ width: '100%', transition: 'all .3s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontFamily: MONO, fontSize: 11, color: D.textMuted, letterSpacing: '.1em' }}>SPRECHTEST</span>
          <LiveIndicator label="ERFASST" color={zc} />
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {[0,1,2].map(i => (
            <div key={i} onClick={() => setEx(te[i])} style={{
              cursor: 'pointer', flex: 1, padding: '10px 6px', borderRadius: 10, textAlign: 'center',
              background: tt === i ? tc[i]+'12' : 'rgba(0,20,50,0.02)',
              border: '1.5px solid ' + (tt === i ? tc[i]+'40' : D.border),
              boxShadow: tt === i ? '0 0 16px '+tc[i]+'10' : 'none',
              transition: 'all .35s',
            }}>
              <div style={{ fontFamily: MONO, fontSize: 10, color: tc[i], fontWeight: 600 }}>{tl[i]}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 24, padding: '12px 0', borderTop: '1px solid '+D.line }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 9, color: D.textMuted }}>TRAININGSLOAD</div>
            <div style={{ fontFamily: DISPLAY, fontSize: 28, fontWeight: 700, color: zc, transition: 'color .3s' }}>{load}</div>
          </div>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 9, color: D.textMuted }}>ZONE</div>
            <div style={{ fontFamily: DISPLAY, fontSize: 28, fontWeight: 700, color: zc, transition: 'color .3s' }}>{zl}</div>
          </div>
        </div>
        {ex > 5 && (
          <div style={{ marginTop: 10, padding: '10px 14px', borderRadius: 8, background: D.red+'06', border: '1px solid '+D.red+'15' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, color: D.red, fontWeight: 600 }}>⚠ AUTOMATISCHE ERHOLUNG WIRD AUSGELÖST</div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}

// ═══ L4: Progression ═══
function InteractiveProgression() {
  const [week, setWeek] = React.useState(1);
  const mobile = useMobile();
  const wd = [
    { dur: 15, int: 'Niedrig', st: 'normal' }, { dur: 18, int: 'Niedrig', st: 'normal' },
    { dur: 20, int: 'Niedrig', st: 'progress' }, { dur: 22, int: 'Leicht', st: 'progress' },
    { dur: 25, int: 'Leicht', st: 'progress' }, { dur: 28, int: 'Mittel', st: 'spike' },
    { dur: 18, int: 'Niedrig', st: 'recovery' }, { dur: 22, int: 'Leicht', st: 'progress' },
  ];
  const d = wd[week - 1];
  const sl = { normal: { t: 'Kalibrierung', c: D.textMuted }, progress: { t: 'Progression · Dauer steigt', c: D.accent }, spike: { t: '⚠ Überlastung erkannt!', c: D.red }, recovery: { t: 'Erholung aktiv', c: D.amber } };
  const s = sl[d.st];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
        {wd.map((_, i) => {
          const bc = wd[i].st === 'spike' ? D.red : wd[i].st === 'recovery' ? D.amber : D.accent;
          return (
            <button key={i} onClick={() => setWeek(i+1)} style={{
              width: mobile ? 36 : 42, height: mobile ? 36 : 42, borderRadius: 10, border: 'none', cursor: 'pointer',
              fontFamily: MONO, fontSize: mobile ? 12 : 13, fontWeight: 600,
              background: week === i+1 ? bc+'15' : 'rgba(0,20,50,0.03)',
              color: week === i+1 ? bc : D.textMuted,
              border: '1.5px solid ' + (week === i+1 ? bc : D.border),
              transition: 'all .25s',
            }}>{i + 1}</button>
          );
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 16 }}>
        <GlassCard accent={s.c} style={{ transition: 'all .3s' }}>
          <div style={{ fontFamily: MONO, fontSize: 10, color: D.textMuted, letterSpacing: '.1em', marginBottom: 12 }}>TRAININGSDAUER</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 80 }}>
            {wd.map((w, i) => {
              const on = i < week; const cur = i === week - 1;
              const bc = w.st === 'spike' ? D.red : w.st === 'recovery' ? D.amber : D.accent;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  {on && <div style={{ fontFamily: MONO, fontSize: 8, color: cur ? bc : D.textMuted }}>{w.dur}'</div>}
                  <div style={{
                    width: '100%', borderRadius: 4,
                    height: on ? w.dur * 2.5 : 4,
                    background: on ? bc : 'rgba(0,20,50,0.06)',
                    opacity: cur ? 1 : on ? 0.4 : 0.15,
                    boxShadow: cur ? '0 0 12px '+bc+'40' : 'none',
                    transition: 'all .4s ease',
                  }}></div>
                </div>
              );
            })}
          </div>
        </GlassCard>
        <GlassCard accent={s.c} style={{ transition: 'all .3s' }}>
          <div style={{ fontFamily: MONO, fontSize: 10, color: D.textMuted, letterSpacing: '.1em', marginBottom: 12 }}>WOCHE {week} · STATUS</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <GlowDot color={s.c} size={10} />
            <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: s.c }}>{s.t}</span>
          </div>
          <DataLine label="Dauer" value={d.dur+' min'} color={s.c} />
          <DataLine label="Intensität" value={d.int} color={s.c} />
          {d.st === 'spike' && <div style={{ marginTop: 10, padding: '10px 14px', borderRadius: 8, background: D.red+'06', border: '1px solid '+D.red+'15' }}>
            <div style={{ fontFamily: FONT, fontSize: 12, color: D.red, lineHeight: 1.5 }}>Belastung zu hoch — Engine reduziert auf 50%.</div>
          </div>}
          {d.st === 'recovery' && <div style={{ marginTop: 10, padding: '10px 14px', borderRadius: 8, background: D.amber+'06', border: '1px solid '+D.amber+'15' }}>
            <div style={{ fontFamily: FONT, fontSize: 12, color: D.amber, lineHeight: 1.5 }}>Rückkehr nach 2 stabilen Sitzungen.</div>
          </div>}
          {d.st === 'progress' && <div style={{ marginTop: 10 }}><StatusStamp status="ok" label="Sichere Steigerung" /></div>}
        </GlassCard>
      </div>
    </div>
  );
}

// ═══ Outro: Week 1→12 Transformation ═══
function InteractiveTransformation() {
  const [week, setWeek] = React.useState(12);
  const p = (week - 1) / 11;
  const lerp = (a, b) => Math.round(a + (b - a) * p);
  const lerpF = (a, b) => (a + (b - a) * p).toFixed(1);
  const gehtest = lerp(380, 480); const fitness = lerpF(4.2, 5.8);
  const dauer = lerp(15, 35);
  const well = week <= 3 ? 'Niedrig' : week <= 7 ? 'Mittel' : week <= 10 ? 'Gut' : 'Sehr gut';
  const wc = week <= 3 ? D.red : week <= 7 ? D.amber : D.accent;
  return (
    <div style={{ maxWidth: 560, width: '100%', margin: '0 auto' }}>
      <EngineSlider value={week} onChange={setWeek} min={1} max={12} step={1}
        color={D.accent} label="Therapiewoche" valueLabel={'Woche ' + week} />
      <div style={{ marginTop: 20 }}>
        <GlassCard accent={wc} glow style={{ width: '100%', transition: 'all .4s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src="assets/hans-mueller.png" style={{
                width: 48, height: 48, borderRadius: 12, objectFit: 'cover',
                filter: 'saturate('+(0.5+p*0.5)+') brightness(0.9)',
                transition: 'filter .5s',
              }} alt="Hans" />
              <div>
                <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: D.text }}>Hans Müller</div>
                <div style={{ fontFamily: MONO, fontSize: 10, color: wc, transition: 'color .3s' }}>
                  {week <= 3 ? 'Startphase' : week <= 7 ? 'Aufbauphase' : week <= 10 ? 'Stabil' : 'Ziel erreicht'}
                </div>
              </div>
            </div>
            <LiveIndicator label={'W'+week} color={wc} />
          </div>
          <DataLine label="Gehtest" value={gehtest+' m'} color={p > 0.5 ? D.accent : D.textMuted} />
          <DataLine label="Fitness" value={fitness+' Einheiten'} color={p > 0.3 ? D.brand : D.textMuted} />
          <DataLine label="Trainingsdauer" value={dauer+' min'} color={p > 0.4 ? D.accent : D.textMuted} />
          <DataLine label="Wohlbefinden" value={well} color={wc} />
          <div style={{ marginTop: 14, height: 6, borderRadius: 3, background: 'rgba(0,20,50,0.06)', overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: p*100+'%', borderRadius: 3,
              background: 'linear-gradient(90deg, '+D.brand+', '+D.accent+')',
              boxShadow: '0 0 12px '+D.accent+'40',
              transition: 'width .4s ease',
            }}></div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// ═══ Layer Summary ═══
function LayerSummary() {
  const layers = [
    { id: 'L0', name: 'Ersteinrichtung', color: D.brand },
    { id: 'L1', name: 'Sicherheits-Check', color: D.red },
    { id: 'L2', name: 'Bestätigung', color: D.brand },
    { id: 'L3', name: 'Belastungscheck', color: D.accent },
    { id: 'L4', name: 'Anpassung', color: D.brand },
    { id: 'L5', name: 'Wohlbefinden', color: D.purple },
    { id: 'L6', name: '5 Säulen', color: D.amber },
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
      {layers.map((l, i) => (
        <React.Fragment key={i}>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            padding: '16px 14px', borderRadius: 14, minWidth: 95,
            background: l.color+'08', border: '1px solid '+l.color+'15',
            cursor: 'pointer', transition: 'transform .3s, box-shadow .3s',
          }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px '+l.color+'20'; }}
             onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, color: l.color }}>{l.id}</div>
            <div style={{ fontFamily: FONT, fontSize: 10, color: D.textSoft, textAlign: 'center', lineHeight: 1.3 }}>{l.name}</div>
          </div>
          {i < layers.length - 1 && (
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" style={{ flexShrink: 0, opacity: 0.25 }}>
              <path d="M0 6h12M10 2l4 4-4 4" stroke={D.textMuted} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

Object.assign(window, {
  InteractiveOnboarding, InteractiveRedFlags, InteractiveConfirmation,
  InteractiveDoseTracking, InteractiveProgression, InteractiveTransformation, LayerSummary,
});
