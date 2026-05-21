// engine-interactive.jsx — Interactive elements for CordiVivo Engine Film
// Depends on: C, FONT, SERIF, MONO, TiltCard, DataLine, VitalBar, GlowDot, 
//             LiveIndicator, StatusStamp, Tag, AnimNum, FlowArrow, ProcessingBar

// ─── Shared slider style ───
function EngineSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
  color,
  label,
  valueLabel
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px',
      borderRadius: 14,
      background: `${color}06`,
      border: `1px solid ${color}15`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 10,
      letterSpacing: '.1em',
      color: C.muted,
      textTransform: 'uppercase'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT,
      fontSize: 18,
      fontWeight: 600,
      color
    }
  }, valueLabel)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value)),
    style: {
      width: '100%',
      height: 4,
      appearance: 'none',
      WebkitAppearance: 'none',
      background: `linear-gradient(90deg, ${color} ${(value - min) / (max - min) * 100}%, ${C.line} ${(value - min) / (max - min) * 100}%)`,
      borderRadius: 2,
      outline: 'none',
      cursor: 'pointer',
      accentColor: color
    }
  }), /*#__PURE__*/React.createElement("style", null, `input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:${color};border:3px solid ${C.bg};box-shadow:0 2px 8px rgba(0,0,0,.15);cursor:pointer;}input[type=range]::-moz-range-thumb{width:22px;height:22px;border-radius:50%;background:${color};border:3px solid ${C.bg};box-shadow:0 2px 8px rgba(0,0,0,.15);cursor:pointer;}`));
}

// ═══════════════════════════════════════
// L0: Interactive 6MWT → Stufe
// ═══════════════════════════════════════
function InteractiveOnboarding() {
  const [distance, setDistance] = React.useState(380);
  const [manualStufe, setManualStufe] = React.useState(null);

  // Cahalin formula: (6MWT * 0.03 + 3.95) / 3.5
  const met = Math.round((distance * 0.03 + 3.95) / 3.5 * 10) / 10;
  const adjustedMet = Math.round(met * 0.95 * 0.98 * 10) / 10;
  const calcStufe = adjustedMet >= 7.1 ? 'A' : adjustedMet >= 5.0 ? 'B' : adjustedMet >= 3.5 ? 'C' : 'D';
  const stufe = manualStufe || calcStufe;
  const stufeColors = {
    A: C.accent,
    B: C.brand,
    C: C.amber,
    D: C.red
  };

  // Reverse: clicking a Stufe sets a representative distance + MET
  const stufeData = {
    A: {
      dist: 770,
      met: 7.8
    },
    B: {
      dist: 550,
      met: 5.6
    },
    C: {
      dist: 380,
      met: 4.2
    },
    D: {
      dist: 220,
      met: 2.9
    }
  };
  function clickStufe(s) {
    setManualStufe(s);
    setDistance(stufeData[s].dist);
  }
  function onSliderChange(v) {
    setDistance(v);
    setManualStufe(null); // clear manual override when slider moves
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(EngineSlider, {
    value: distance,
    onChange: onSliderChange,
    min: 150,
    max: 800,
    step: 5,
    color: C.brand,
    label: "Gehtest-Distanz",
    valueLabel: `${distance} m`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(TiltCard, {
    accent: C.brand,
    style: {
      flex: 1,
      textAlign: 'center',
      padding: '20px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 9,
      color: C.muted,
      letterSpacing: '.12em',
      marginBottom: 6
    }
  }, "FITNESS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT,
      fontSize: 36,
      fontWeight: 500,
      color: C.brand,
      lineHeight: 1,
      transition: 'color .3s'
    }
  }, adjustedMet.toFixed(1)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 10,
      color: C.muted,
      marginTop: 4
    }
  }, "Einheiten")), /*#__PURE__*/React.createElement("svg", {
    width: "28",
    height: "20",
    viewBox: "0 0 28 20",
    fill: "none",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 10h20",
    stroke: stufeColors[stufe],
    strokeWidth: "1.5",
    strokeDasharray: "3 2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 5l6 5-6 5",
    stroke: stufeColors[stufe],
    strokeWidth: "1.5",
    fill: "none",
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement(TiltCard, {
    accent: stufeColors[stufe],
    style: {
      flex: 1,
      textAlign: 'center',
      padding: '20px 16px',
      transition: 'border-color .3s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 9,
      color: C.muted,
      letterSpacing: '.12em',
      marginBottom: 6
    }
  }, "STUFE"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 6
    }
  }, ['A', 'B', 'C', 'D'].map(s => /*#__PURE__*/React.createElement("div", {
    key: s,
    onClick: () => clickStufe(s),
    style: {
      cursor: 'pointer',
      width: 36,
      height: 36,
      borderRadius: 10,
      background: s === stufe ? stufeColors[stufe] : 'rgba(0,0,0,.02)',
      border: `1.5px solid ${s === stufe ? stufeColors[stufe] : C.line}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT,
      fontSize: 16,
      fontWeight: 600,
      color: s === stufe ? '#fff' : C.muted,
      boxShadow: s === stufe ? `0 0 16px ${stufeColors[stufe]}30` : 'none',
      transition: 'all .3s ease'
    }
  }, s))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontFamily: MONO,
      fontSize: 10,
      color: C.muted,
      opacity: 0.6
    }
  }, "Regler bewegen oder Stufe anklicken"));
}

// ═══════════════════════════════════════
// L1: Toggle normal vs red flag
// ═══════════════════════════════════════
function InteractiveRedFlags() {
  const [isRedFlag, setIsRedFlag] = React.useState(false);
  const bp = isRedFlag ? '185/112' : '138/82';
  const bpPct = isRedFlag ? 93 : 68;
  const hr = isRedFlag ? '102' : '72';
  const hrPct = isRedFlag ? 78 : 55;
  const hrAlert = isRedFlag;
  const weight = isRedFlag ? '+2.4' : '+0.4';
  const weightPct = isRedFlag ? 75 : 20;
  const weightAlert = isRedFlag;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      borderRadius: 12,
      overflow: 'hidden',
      border: `1px solid ${C.line}`
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsRedFlag(false),
    style: {
      flex: 1,
      padding: '12px 16px',
      border: 'none',
      cursor: 'pointer',
      fontFamily: FONT,
      fontSize: 13,
      fontWeight: 600,
      background: !isRedFlag ? `${C.accent}12` : 'transparent',
      color: !isRedFlag ? C.accent : C.muted,
      borderRight: `1px solid ${C.line}`,
      transition: 'all .3s ease'
    }
  }, "\u2713 Normaler Tag"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsRedFlag(true),
    style: {
      flex: 1,
      padding: '12px 16px',
      border: 'none',
      cursor: 'pointer',
      fontFamily: FONT,
      fontSize: 13,
      fontWeight: 600,
      background: isRedFlag ? `${C.red}10` : 'transparent',
      color: isRedFlag ? C.red : C.muted,
      transition: 'all .3s ease'
    }
  }, "\u26A0 Auff\xE4lliger Tag")), /*#__PURE__*/React.createElement(TiltCard, {
    accent: isRedFlag ? C.red : C.accent,
    style: {
      width: '100%',
      transition: 'border-color .4s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 11,
      color: isRedFlag ? C.red : C.accent,
      letterSpacing: '.1em',
      transition: 'color .3s'
    }
  }, isRedFlag ? '⚠ RED FLAG DETEKTIERT' : '✓ ALLE CHECKS BESTANDEN'), /*#__PURE__*/React.createElement(LiveIndicator, {
    label: isRedFlag ? 'WARNUNG' : 'OK',
    color: isRedFlag ? C.red : C.accent
  })), /*#__PURE__*/React.createElement(VitalBar, {
    label: "Blutdruck",
    value: bp,
    unit: "mmHg",
    pct: bpPct,
    color: C.brand,
    alert: isRedFlag
  }), /*#__PURE__*/React.createElement(VitalBar, {
    label: "Ruhepuls",
    value: hr,
    unit: "bpm",
    pct: hrPct,
    color: C.accent,
    alert: hrAlert
  }), /*#__PURE__*/React.createElement(VitalBar, {
    label: "Gewicht \u03943d",
    value: weight,
    unit: "kg",
    pct: weightPct,
    color: C.brand,
    alert: weightAlert
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      transition: 'all .4s ease'
    }
  }, isRedFlag ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px',
      borderRadius: 10,
      background: `${C.red}08`,
      border: `1px solid ${C.red}20`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement(GlowDot, {
    color: C.red,
    size: 7
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 11,
      color: C.red,
      fontWeight: 700
    }
  }, "EMPFEHLUNG: HEUTE KEIN TRAINING")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT,
      fontSize: 12.5,
      color: C.ink2,
      lineHeight: 1.5
    }
  }, "Blutdruck und Gewicht auff\xE4llig. Hans entscheidet selbst \u2014 die Engine blockiert nie.")) : /*#__PURE__*/React.createElement(StatusStamp, {
    status: "ok",
    label: "Training kann starten"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontFamily: MONO,
      fontSize: 10,
      color: C.muted,
      opacity: 0.6
    }
  }, "Umschalten, um die Engine-Reaktion zu sehen"));
}

// ═══════════════════════════════════════
// L3: Exertion slider → zones
// ═══════════════════════════════════════
function InteractiveDoseTracking() {
  const [exertion, setExertion] = React.useState(3);
  const talkTest = exertion <= 3 ? 0 : exertion <= 5 ? 1 : 2;
  const talkLabels = ['Kann sprechen', 'Schwer zu sprechen', 'Kann nicht sprechen'];
  const talkExertions = [2, 4, 7]; // representative exertion per zone
  const talkColors = [C.accent, C.amber, C.red];
  const load = Math.round(exertion * 25);
  const zoneLabel = exertion <= 3 ? 'Optimal' : exertion <= 5 ? 'Erhöht' : 'Überlastung';
  const zoneColor = exertion <= 3 ? C.accent : exertion <= 5 ? C.amber : C.red;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(EngineSlider, {
    value: exertion,
    onChange: setExertion,
    min: 1,
    max: 8,
    step: 0.5,
    color: zoneColor,
    label: "Gef\xFChlte Belastung",
    valueLabel: exertion.toFixed(1)
  }), /*#__PURE__*/React.createElement(TiltCard, {
    accent: zoneColor,
    style: {
      width: '100%',
      transition: 'border-color .3s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 11,
      color: C.muted,
      letterSpacing: '.1em'
    }
  }, "SPRECHTEST-ERGEBNIS"), /*#__PURE__*/React.createElement(LiveIndicator, {
    label: "ERFASST",
    color: zoneColor
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 14
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: () => setExertion(talkExertions[i]),
    style: {
      cursor: 'pointer',
      flex: 1,
      padding: '10px 6px',
      borderRadius: 10,
      textAlign: 'center',
      background: talkTest === i ? `${talkColors[i]}12` : 'rgba(0,0,0,.01)',
      border: `1.5px solid ${talkTest === i ? talkColors[i] + '40' : C.line}`,
      boxShadow: talkTest === i ? `0 0 16px ${talkColors[i]}10` : 'none',
      transition: 'all .35s ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 10,
      color: talkColors[i],
      fontWeight: 600,
      transition: 'color .3s'
    }
  }, talkLabels[i])))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      padding: '12px 0',
      borderTop: `1px solid ${C.line}`
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 9,
      color: C.muted
    }
  }, "TRAININGSLOAD"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT,
      fontSize: 28,
      fontWeight: 500,
      color: zoneColor,
      transition: 'color .3s'
    }
  }, load)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 9,
      color: C.muted
    }
  }, "ZONE"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT,
      fontSize: 28,
      fontWeight: 500,
      color: zoneColor,
      transition: 'color .3s'
    }
  }, zoneLabel))), exertion > 5 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      padding: '10px 14px',
      borderRadius: 8,
      background: `${C.red}06`,
      border: `1px solid ${C.red}15`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 10,
      color: C.red,
      fontWeight: 600
    }
  }, "\u26A0 AUTOMATISCHE ERHOLUNG WIRD AUSGEL\xD6ST"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontFamily: MONO,
      fontSize: 10,
      color: C.muted,
      opacity: 0.6
    }
  }, "Regler bewegen oder Sprechtest-Ergebnis anklicken"));
}

// ═══════════════════════════════════════
// Outro: Week slider 1→12
// ═══════════════════════════════════════
function InteractiveTransformation() {
  const [week, setWeek] = React.useState(12);
  const lerp = (a, b) => Math.round(a + (b - a) * ((week - 1) / 11));
  const lerpF = (a, b) => (a + (b - a) * ((week - 1) / 11)).toFixed(1);
  const gehtest = lerp(380, 480);
  const fitness = lerpF(4.2, 5.8);
  const dauer = lerp(15, 35);
  const wellbeing = week <= 3 ? 'Niedrig' : week <= 7 ? 'Mittel' : week <= 10 ? 'Gut' : 'Sehr gut';
  const wellColor = week <= 3 ? C.red : week <= 7 ? C.amber : C.accent;
  const pct = (week - 1) / 11;
  const imgSat = 0.5 + pct * 0.5;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560,
      width: '100%',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(EngineSlider, {
    value: week,
    onChange: setWeek,
    min: 1,
    max: 12,
    step: 1,
    color: C.accent,
    label: "Therapiewoche",
    valueLabel: `Woche ${week}`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(TiltCard, {
    accent: wellColor,
    style: {
      width: '100%',
      transition: 'border-color .4s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/hans-mueller.png",
    style: {
      width: 48,
      height: 48,
      borderRadius: 12,
      objectFit: 'cover',
      filter: `saturate(${imgSat})`,
      transition: 'filter .5s ease'
    },
    alt: "Hans"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT,
      fontSize: 16,
      fontWeight: 600,
      color: C.ink
    }
  }, "Hans M\xFCller"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 10,
      color: wellColor,
      transition: 'color .3s'
    }
  }, week <= 3 ? 'Startphase · Vorsichtig' : week <= 7 ? 'Aufbauphase · Fortschritte' : week <= 10 ? 'Stabil · Selbstständiger' : 'Ziel erreicht · Eigenständig'))), /*#__PURE__*/React.createElement(LiveIndicator, {
    label: `W${week}`,
    color: wellColor
  })), /*#__PURE__*/React.createElement(DataLine, {
    label: "Gehtest",
    value: `${gehtest} m`,
    color: pct > 0.5 ? C.accent : C.muted
  }), /*#__PURE__*/React.createElement(DataLine, {
    label: "Fitness",
    value: `${fitness} Einheiten`,
    color: pct > 0.3 ? C.brand : C.muted
  }), /*#__PURE__*/React.createElement(DataLine, {
    label: "Trainingsdauer",
    value: `${dauer} min`,
    color: pct > 0.4 ? C.accent : C.muted
  }), /*#__PURE__*/React.createElement(DataLine, {
    label: "Wohlbefinden",
    value: wellbeing,
    color: wellColor
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      height: 6,
      borderRadius: 3,
      background: `${C.line}`,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${pct * 100}%`,
      borderRadius: 3,
      background: `linear-gradient(90deg, ${C.brand}, ${C.accent})`,
      transition: 'width .4s ease'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 9,
      color: C.muted
    }
  }, "Woche 1"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 9,
      color: C.muted
    }
  }, "Woche 12")))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontFamily: MONO,
      fontSize: 10,
      color: C.muted,
      opacity: 0.6,
      marginTop: 12
    }
  }, "Woche w\xE4hlen und Hans' Fortschritt beobachten"));
}

// ═══════════════════════════════════════
// L2: Interactive confirm/adapt/pause
// ═══════════════════════════════════════
function InteractiveConfirmation() {
  const [choice, setChoice] = React.useState(null);
  const paths = {
    confirm: {
      color: C.accent,
      icon: '✓',
      title: 'Training startet',
      desc: 'Hans trainiert 25 min auf dem Ergometer. Belastungszone: leicht bis mittel. Die Engine überwacht in Echtzeit.',
      session: '25 min · Ergometer · Stufe C'
    },
    adapt: {
      color: C.amber,
      icon: '↓',
      title: 'Reduzierte Sitzung',
      desc: 'Hans fühlt sich heute nicht ganz fit. Die Engine passt an: kürzere Dauer, niedrigere Intensität. Sicherheit geht vor.',
      session: '15 min · Leichtes Gehen · Stufe C (reduziert)'
    },
    pause: {
      color: C.muted,
      icon: '⏸',
      title: 'Ruhetag eingeplant',
      desc: 'Hans pausiert heute. Die Engine verschiebt die Sitzung und passt den Wochenplan automatisch an. Kein Fortschrittsverlust.',
      session: 'Ruhetag · Nächste Sitzung: morgen'
    }
  };
  const active = choice ? paths[choice] : null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      maxWidth: 480,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(TiltCard, {
    accent: C.brand,
    style: {
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 11,
      color: C.muted,
      letterSpacing: '.12em',
      marginBottom: 16,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, "THERAPIEVORSCHLAG \xB7 SITZUNG 14", /*#__PURE__*/React.createElement(LiveTimestamp, null)), /*#__PURE__*/React.createElement(DataLine, {
    label: "Dauer",
    value: "25 min",
    color: C.accent
  }), /*#__PURE__*/React.createElement(DataLine, {
    label: "Belastungszone",
    value: "Leicht bis mittel",
    color: C.brand
  }), /*#__PURE__*/React.createElement(DataLine, {
    label: "Trainingsart",
    value: "Fahrradergometer"
  }), /*#__PURE__*/React.createElement(DataLine, {
    label: "Stufe",
    value: "C \xB7 Woche 5",
    color: C.amber
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }, [{
    key: 'confirm',
    label: '✓ Bestätigen',
    color: C.accent
  }, {
    key: 'adapt',
    label: '↓ Anpassen',
    color: C.amber
  }, {
    key: 'pause',
    label: '⏸ Pausieren',
    color: C.muted
  }].map(btn => /*#__PURE__*/React.createElement("button", {
    key: btn.key,
    onClick: () => setChoice(btn.key),
    style: {
      padding: '12px 22px',
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      fontFamily: FONT,
      fontSize: 14,
      fontWeight: 600,
      minHeight: 44,
      background: choice === btn.key ? btn.color : `${btn.color}08`,
      color: choice === btn.key ? '#fff' : btn.color,
      boxShadow: choice === btn.key ? `0 0 20px ${btn.color}30` : 'none',
      border: `1.5px solid ${choice === btn.key ? btn.color : btn.color + '25'}`,
      transition: 'all .3s ease'
    }
  }, btn.label))), active && /*#__PURE__*/React.createElement(TiltCard, {
    accent: active.color,
    style: {
      transition: 'border-color .3s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      background: `${active.color}12`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      border: `1px solid ${active.color}25`
    }
  }, active.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT,
      fontSize: 16,
      fontWeight: 600,
      color: C.ink
    }
  }, active.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 10,
      color: active.color
    }
  }, active.session))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: FONT,
      fontSize: 13.5,
      color: C.ink2,
      lineHeight: 1.6,
      margin: 0
    }
  }, active.desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontFamily: MONO,
      fontSize: 10,
      color: C.muted,
      opacity: 0.6
    }
  }, "Klicken Sie eine Option, um den Engine-Pfad zu sehen"));
}

// ═══════════════════════════════════════
// L4: Click-through weeks with regression
// ═══════════════════════════════════════
function InteractiveProgression() {
  const isSmall = useSmall();
  const [week, setWeek] = React.useState(1);
  const weekData = [{
    dur: 15,
    intensity: 'Niedrig',
    status: 'normal'
  }, {
    dur: 18,
    intensity: 'Niedrig',
    status: 'normal'
  }, {
    dur: 20,
    intensity: 'Niedrig',
    status: 'progress'
  }, {
    dur: 22,
    intensity: 'Leicht',
    status: 'progress'
  }, {
    dur: 25,
    intensity: 'Leicht',
    status: 'progress'
  }, {
    dur: 28,
    intensity: 'Mittel',
    status: 'spike'
  }, {
    dur: 18,
    intensity: 'Niedrig',
    status: 'recovery'
  }, {
    dur: 22,
    intensity: 'Leicht',
    status: 'progress'
  }];
  const d = weekData[week - 1];
  const statusLabels = {
    normal: {
      text: 'Kalibrierungsphase',
      color: C.muted
    },
    progress: {
      text: 'Progression · Dauer steigt',
      color: C.accent
    },
    spike: {
      text: '⚠ Überlastung erkannt!',
      color: C.red
    },
    recovery: {
      text: 'Automatische Erholung aktiv',
      color: C.amber
    }
  };
  const s = statusLabels[d.status];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }, weekData.map((_, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setWeek(i + 1),
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      border: 'none',
      cursor: 'pointer',
      fontFamily: MONO,
      fontSize: 13,
      fontWeight: 600,
      minWidth: 40,
      minHeight: 44,
      background: week === i + 1 ? (weekData[i].status === 'spike' ? C.red : weekData[i].status === 'recovery' ? C.amber : C.accent) + '15' : 'rgba(0,0,0,.02)',
      color: week === i + 1 ? weekData[i].status === 'spike' ? C.red : weekData[i].status === 'recovery' ? C.amber : C.accent : C.muted,
      border: `1.5px solid ${week === i + 1 ? weekData[i].status === 'spike' ? C.red : weekData[i].status === 'recovery' ? C.amber : C.accent : C.line}`,
      transition: 'all .25s ease'
    }
  }, i + 1))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: isSmall ? '1fr' : '1fr 1fr',
      gap: isSmall ? 12 : 16
    }
  }, /*#__PURE__*/React.createElement(TiltCard, {
    accent: d.status === 'spike' ? C.red : d.status === 'recovery' ? C.amber : C.accent,
    style: {
      transition: 'border-color .3s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 10,
      color: C.muted,
      letterSpacing: '.1em',
      marginBottom: 12
    }
  }, "TRAININGSDAUER \xB7 WOCHE 1\u20138"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 5,
      height: 80
    }
  }, weekData.map((w, i) => {
    const isActive = i < week;
    const isCurrent = i === week - 1;
    const barColor = w.status === 'spike' ? C.red : w.status === 'recovery' ? C.amber : C.accent;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3
      }
    }, isActive && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: MONO,
        fontSize: 8,
        color: isCurrent ? barColor : C.muted
      }
    }, w.dur, "'"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        borderRadius: 4,
        height: isActive ? w.dur * 2.5 : 4,
        background: isActive ? barColor : C.line,
        opacity: isCurrent ? 1 : isActive ? 0.5 : 0.2,
        boxShadow: isCurrent ? `0 0 12px ${barColor}30` : 'none',
        transition: 'all .4s ease'
      }
    }));
  }))), /*#__PURE__*/React.createElement(TiltCard, {
    accent: s.color,
    style: {
      transition: 'border-color .3s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 10,
      color: C.muted,
      letterSpacing: '.1em',
      marginBottom: 12
    }
  }, "WOCHE ", week, " \xB7 STATUS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(GlowDot, {
    color: s.color,
    size: 10
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT,
      fontSize: 15,
      fontWeight: 600,
      color: s.color,
      transition: 'color .3s'
    }
  }, s.text)), /*#__PURE__*/React.createElement(DataLine, {
    label: "Dauer",
    value: `${d.dur} min`,
    color: s.color
  }), /*#__PURE__*/React.createElement(DataLine, {
    label: "Intensit\xE4t",
    value: d.intensity,
    color: s.color
  }), d.status === 'spike' && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      padding: '10px 14px',
      borderRadius: 8,
      background: `${C.red}06`,
      border: `1px solid ${C.red}15`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT,
      fontSize: 12,
      color: C.red,
      lineHeight: 1.5
    }
  }, "Belastung zu hoch \u2014 Engine reduziert automatisch auf 50% und niedrigste Intensit\xE4t.")), d.status === 'recovery' && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      padding: '10px 14px',
      borderRadius: 8,
      background: `${C.amber}06`,
      border: `1px solid ${C.amber}15`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT,
      fontSize: 12,
      color: C.amber,
      lineHeight: 1.5
    }
  }, "Erholungsphase aktiv. R\xFCckkehr zum Normalprogramm nach 2 stabilen Sitzungen.")), d.status === 'progress' && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(StatusStamp, {
    status: "ok",
    label: "Sichere Steigerung"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontFamily: MONO,
      fontSize: 10,
      color: C.muted,
      opacity: 0.6
    }
  }, "Woche anklicken \u2014 beobachten Sie Progression und Sicherheitsmechanismus"));
}

// ═══════════════════════════════════════
// 7-Layer Summary Visual
// ═══════════════════════════════════════
function LayerSummary() {
  const layers = [{
    id: 'L0',
    name: 'Ersteinrichtung',
    color: C.brand,
    icon: '◉'
  }, {
    id: 'L1',
    name: 'Sicherheits-Check',
    color: C.red,
    icon: '⛨'
  }, {
    id: 'L2',
    name: 'Bestätigung',
    color: C.brand,
    icon: '◎'
  }, {
    id: 'L3',
    name: 'Belastungscheck',
    color: C.accent,
    icon: '◈'
  }, {
    id: 'L4',
    name: 'Anpassung',
    color: C.brand,
    icon: '⟳'
  }, {
    id: 'L5',
    name: 'Wohlbefinden',
    color: C.purple,
    icon: '♡'
  }, {
    id: 'L6',
    name: '5 Säulen',
    color: C.amber,
    icon: '⬡'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      flexWrap: 'wrap'
    }
  }, layers.map((l, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      padding: '14px 12px',
      borderRadius: 14,
      minWidth: 90,
      background: `${l.color}06`,
      border: `1px solid ${l.color}18`,
      transition: 'transform .3s ease, box-shadow .3s ease'
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = `0 8px 20px ${l.color}15`;
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = '';
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 10,
      fontWeight: 700,
      color: l.color
    }
  }, l.id), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20
    }
  }, l.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT,
      fontSize: 10,
      color: C.ink2,
      textAlign: 'center',
      lineHeight: 1.3
    }
  }, l.name)), i < layers.length - 1 && /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "12",
    viewBox: "0 0 16 12",
    fill: "none",
    style: {
      flexShrink: 0,
      opacity: 0.3
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 6h12M10 2l4 4-4 4",
    stroke: C.muted,
    strokeWidth: "1.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))));
}

// Export
Object.assign(window, {
  InteractiveOnboarding,
  InteractiveRedFlags,
  InteractiveDoseTracking,
  InteractiveTransformation,
  InteractiveConfirmation,
  InteractiveProgression,
  LayerSummary
});
