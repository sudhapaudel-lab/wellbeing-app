import { useState, useRef } from "react";
import {
  ArrowRight, ArrowLeft, Info, ShieldCheck,
  AlertTriangle, CheckCircle, Heart,
} from "lucide-react";

// ─────────────────────────────────────────────
// 1. DESIGN TOKENS
// ─────────────────────────────────────────────
export const T = {
  lav:        "#9B87C4",
  lavLight:   "#F2EEF9",
  lavBorder:  "#D4C8F0",
  purple:     "#9B7BC8",
  sage:       "#7BA688",
  sageLight:  "#EEF5F0",
  sageBorder: "#C0D8C8",
  teal:       "#5A9E9A",
  tealLight:  "#EAF4F4",
  tealBorder: "#B0D8D6",
  amber:      "#C4A44A",
  amberLight: "#FBF6E8",
  amberBorder:"#E0D098",
  rose:       "#C4748A",
  roseLight:  "#FCEEF1",
  roseBorder: "#EFCDD6",
  roseDeep:   "#B85C6E",
  ink:        "#2C2825",
  inkSoft:    "#4A4642",
  inkLighter: "#6E6A66",
  muted:      "#9A9490",
  mutedLight: "#B0AAA4",
  white:      "#FFFFFF",
};

// ─────────────────────────────────────────────
// 2. QUESTION DATA
// ─────────────────────────────────────────────
export const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or feeling like a failure",
  "Trouble concentrating on things, such as reading or watching TV",
  "Moving or speaking so slowly others could notice, or being fidgety or restless",
  "Thoughts that you would be better off dead, or thoughts of hurting yourself",
];

export const GAD7_QUESTIONS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen",
];

export const ANSWER_OPTIONS = [
  { label: "Not at all",              value: 0 },
  { label: "Several days",            value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day",        value: 3 },
];

export const ALL_QUESTIONS = [
  ...PHQ9_QUESTIONS.map((text, idx) => ({ text, section: "PHQ-9", idx })),
  ...GAD7_QUESTIONS.map((text, idx) => ({ text, section: "GAD-7", idx })),
];

export const TOTAL_QUESTIONS = ALL_QUESTIONS.length; // 16

// ─────────────────────────────────────────────
// 3. SCORING HELPERS
// ─────────────────────────────────────────────
export function phqSeverity(score) {
  if (score <= 4)  return { label: "Minimal",           color: T.sage,    bg: T.sageLight,  border: T.sageBorder };
  if (score <= 9)  return { label: "Mild",              color: T.teal,    bg: T.tealLight,  border: T.tealBorder };
  if (score <= 14) return { label: "Moderate",          color: T.amber,   bg: T.amberLight, border: T.amberBorder };
  if (score <= 19) return { label: "Moderately severe", color: T.rose,    bg: T.roseLight,  border: T.roseBorder };
  return                   { label: "Severe",            color: T.roseDeep,bg: T.roseLight,  border: T.roseBorder };
}

export function gadSeverity(score) {
  if (score <= 4)  return { label: "Minimal",  color: T.sage,    bg: T.sageLight,  border: T.sageBorder };
  if (score <= 9)  return { label: "Mild",     color: T.teal,    bg: T.tealLight,  border: T.tealBorder };
  if (score <= 14) return { label: "Moderate", color: T.amber,   bg: T.amberLight, border: T.amberBorder };
  return                   { label: "Severe",   color: T.roseDeep,bg: T.roseLight,  border: T.roseBorder };
}

export function overallLevel(phqLabel, gadLabel) {
  const phqScale = ["Minimal","Mild","Moderate","Moderately severe","Severe"];
  const gadScale = ["Minimal","Mild","Moderate","Severe"];
  return Math.max(phqScale.indexOf(phqLabel), gadScale.indexOf(gadLabel));
}

// ─────────────────────────────────────────────
// 4. SHARED UI PRIMITIVES
// ─────────────────────────────────────────────
export const GradientBg = ({ children, style }) => (
  <div style={{
    minHeight: "100vh", width: "100%",
    background: `linear-gradient(145deg, ${T.lavLight} 0%, #EDE8F6 40%, #F5EFF8 70%, ${T.roseLight} 100%)`,
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", padding: "24px 16px",
    fontFamily: "'Inter', 'Segoe UI', sans-serif", boxSizing: "border-box",
    ...style,
  }}>{children}</div>
);

export const Card = ({ children, style }) => (
  <div style={{
    background: T.white, borderRadius: 20, padding: "36px 32px",
    border: `1px solid ${T.lavBorder}`,
    boxShadow: "0 4px 32px rgba(155,135,196,0.10)",
    width: "100%", maxWidth: 520, boxSizing: "border-box",
    ...style,
  }}>{children}</div>
);

export const Pill = ({ children, color, bg, border }) => (
  <span style={{
    display: "inline-block", padding: "3px 12px", borderRadius: 99,
    fontSize: 12, fontWeight: 600, letterSpacing: "0.03em",
    background: bg, color, border: `1px solid ${border || color + "44"}`,
  }}>{children}</span>
);

export const PrimaryBtn = ({ children, onClick, disabled, style }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      background: disabled
        ? T.mutedLight
        : `linear-gradient(135deg, ${T.lav}, ${T.purple})`,
      color: T.white, border: "none", borderRadius: 12,
      padding: "13px 28px", fontSize: 15, fontWeight: 600,
      cursor: disabled ? "not-allowed" : "pointer",
      display: "flex", alignItems: "center", gap: 8,
      width: "100%", justifyContent: "center",
      transition: "opacity 0.15s",
      ...style,
    }}
  >{children}</button>
);

export const GhostBtn = ({ children, onClick, style }) => (
  <button
    onClick={onClick}
    style={{
      background: "transparent", color: T.inkSoft,
      border: `1px solid ${T.lavBorder}`, borderRadius: 12,
      padding: "13px 28px", fontSize: 15, fontWeight: 500,
      cursor: "pointer", display: "flex", alignItems: "center",
      gap: 8, justifyContent: "center", width: "100%",
      ...style,
    }}
  >{children}</button>
);

export const BackLink = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: "none", border: "none", cursor: "pointer",
      color: T.muted, display: "flex", alignItems: "center",
      gap: 4, fontSize: 13, marginBottom: 24, padding: 0,
    }}
  >
    <ArrowLeft size={14} /> Back
  </button>
);

// Fixed bottom progress bar
export const BottomProgressBar = ({ current, total }) => {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      height: 5, background: T.lavBorder, zIndex: 100,
    }}>
      <div style={{
        height: "100%", width: `${pct}%`,
        background: `linear-gradient(90deg, ${T.lav}, ${T.purple})`,
        transition: "width 0.4s ease",
        borderRadius: "0 3px 3px 0",
      }} />
    </div>
  );
};

// Section badge — switches color per section
export const SectionBadge = ({ section }) => {
  const isGAD = section === "GAD-7";
  return (
    <span style={{
      display: "inline-block", padding: "4px 14px", borderRadius: 99,
      fontSize: 12, fontWeight: 700, letterSpacing: "0.04em",
      background: isGAD ? T.tealLight : T.roseLight,
      color:      isGAD ? T.teal      : T.rose,
      border:     `1px solid ${isGAD ? T.tealBorder : T.roseBorder}`,
    }}>
      {section} {isGAD ? "Anxiety" : "Mood"}
    </span>
  );
};

// ─────────────────────────────────────────────
// 5. SCREEN COMPONENTS
// ─────────────────────────────────────────────

// --- 5a. Landing ---
export function LandingScreen({ onNext }) {
  return (
    <GradientBg>
      <div style={{ width: "100%", maxWidth: 520, textAlign: "center" }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16, margin: "0 auto 16px",
          background: `linear-gradient(135deg, ${T.lav}, ${T.rose})`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Heart size={26} color={T.white} />
        </div>

        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", color: T.lav, textTransform: "uppercase", margin: "0 0 10px" }}>
          Mental wellness
        </p>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: T.ink, margin: "0 0 14px", lineHeight: 1.25 }}>
          How are you<br />feeling right now?
        </h1>
        <p style={{ fontSize: 15, color: T.inkSoft, lineHeight: 1.7, margin: "0 0 20px" }}>
          A quick check-in using two validated tools, PHQ-9 and GAD-7, to give you a snapshot of your mood and anxiety levels.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
          <Pill color={T.lav}  bg={T.lavLight}  border={T.lavBorder}>16 questions</Pill>
          <Pill color={T.teal} bg={T.tealLight} border={T.tealBorder}>About 5 minutes</Pill>
        </div>

        <PrimaryBtn onClick={onNext}>
          Get started <ArrowRight size={17} />
        </PrimaryBtn>
      </div>
    </GradientBg>
  );
}

// --- 5b. Disclaimer ---
export function DisclaimerScreen({ onNext, onBack }) {
  const items = [
    "Results are saved to your account for personal tracking only.",
    "If you are experiencing a mental health crisis, please contact a professional immediately.",
    "This tool should not replace consultation with a licensed healthcare provider.",
  ];
  return (
    <GradientBg>
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
            background: T.amberLight, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Info size={20} color={T.amber} />
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", color: T.amber, textTransform: "uppercase", margin: 0 }}>Important notice</p>
            <h2 style={{ fontSize: 19, fontWeight: 700, color: T.ink, margin: 0 }}>Before you begin</h2>
          </div>
        </div>

        <div style={{ background: T.amberLight, border: `1px solid ${T.amberBorder}`, borderRadius: 12, padding: "16px 18px", marginBottom: 20 }}>
          <p style={{ fontSize: 14, color: T.inkSoft, lineHeight: 1.75, margin: 0 }}>
            This screening is <strong style={{ color: T.ink }}>not a clinical tool</strong> and does not constitute a medical diagnosis or professional advice. It is intended purely for <strong style={{ color: T.ink }}>personal self-awareness</strong>.
          </p>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: T.inkSoft, lineHeight: 1.6 }}>
              <CheckCircle size={16} color={T.sage} style={{ flexShrink: 0, marginTop: 2 }} />
              {item}
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <PrimaryBtn onClick={onNext}>Got it, continue <ArrowRight size={16} /></PrimaryBtn>
          <GhostBtn onClick={onBack}><ArrowLeft size={16} /> Back to home</GhostBtn>
        </div>
      </Card>
    </GradientBg>
  );
}

// --- 5c. Age Gate ---
export function AgeGateScreen({ onPass, onFail, onBack }) {
  const [selected, setSelected] = useState(null);
  const opts = ["Yes, I am 18 or older", "No, I am under 18"];
  return (
    <GradientBg>
      <Card>
        <BackLink onClick={onBack} />
        <h2 style={{ fontSize: 22, fontWeight: 700, color: T.ink, margin: "0 0 8px" }}>
          Are you 18 years or older?
        </h2>
        <p style={{ fontSize: 14, color: T.inkLighter, margin: "0 0 24px", lineHeight: 1.6 }}>
          This screening is designed for adults 18 and above.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {opts.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                background: selected === i ? T.lavLight : T.white,
                border: `1.5px solid ${selected === i ? T.lav : T.lavBorder}`,
                borderRadius: 12, padding: "14px 18px", textAlign: "left",
                fontSize: 15, color: selected === i ? T.purple : T.inkSoft,
                fontWeight: selected === i ? 600 : 400, cursor: "pointer",
                transition: "all 0.15s",
              }}
            >{opt}</button>
          ))}
        </div>

        <PrimaryBtn disabled={selected === null} onClick={() => selected === 0 ? onPass() : onFail()}>
          Continue <ArrowRight size={16} />
        </PrimaryBtn>
      </Card>
    </GradientBg>
  );
}

// --- 5d. Age Denied ---
export function AgeDeniedScreen({ onBack }) {
  return (
    <GradientBg>
      <Card style={{ textAlign: "center" }}>
        <div style={{
          width: 52, height: 52, borderRadius: 50,
          background: T.roseLight, display: "flex",
          alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
        }}>
          <AlertTriangle size={24} color={T.rose} />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: T.ink, margin: "0 0 10px" }}>Screening unavailable</h2>
        <p style={{ fontSize: 14, color: T.inkSoft, lineHeight: 1.7, margin: "0 0 24px" }}>
          This mental wellness screening is currently available only for users aged 18 and older. If you are concerned about your mental health, please speak with a trusted adult or school counsellor.
        </p>
        <GhostBtn onClick={onBack}><ArrowLeft size={16} /> Back to home</GhostBtn>
      </Card>
    </GradientBg>
  );
}

// --- 5e. Consent ---
export function ConsentScreen({ onConsent, onCancel }) {
  const [agreed, setAgreed] = useState(false);
  return (
    <GradientBg style={{ justifyContent: "flex-start", paddingTop: 40 }}>
      <Card style={{ maxWidth: 560 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: T.lavLight, display: "flex",
            alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <ShieldCheck size={20} color={T.lav} />
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", color: T.lav, textTransform: "uppercase", margin: 0 }}>Privacy</p>
            <h2 style={{ fontSize: 19, fontWeight: 700, color: T.ink, margin: 0 }}>Consent to collect health data</h2>
          </div>
        </div>

        <div style={{ fontSize: 14, color: T.inkSoft, lineHeight: 1.8, marginBottom: 20 }}>
          <p style={{ margin: "0 0 12px" }}>
            In order to provide our services to you, we may collect certain personal health information, including health conditions you share and the wellness content you choose to engage with.
          </p>
          <p style={{ margin: "0 0 12px" }}>
            Our data practices are described in our{" "}
            <a href="#" style={{ color: T.lav, fontWeight: 600, textDecoration: "none" }}>Privacy Policy</a>{" "}
            and{" "}
            <a href="#" style={{ color: T.lav, fontWeight: 600, textDecoration: "none" }}>Consumer Health Data Policy</a>.
            By clicking <strong style={{ color: T.ink }}>'I Consent'</strong>, you agree to our collection and processing of your personal health information to provide you with our services and for related business purposes.
          </p>
          <p style={{ margin: 0, fontSize: 13, color: T.muted }}>
            You may revoke this consent at any time by emailing{" "}
            <a href="mailto:melo@gmail.com" style={{ color: T.lav }}>melo@gmail.com</a>.
            If you do not consent, we may not be able to provide services to you.
          </p>
        </div>

        <label style={{
          display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer",
          marginBottom: 24, padding: "14px 16px",
          border: `1px solid ${agreed ? T.lavBorder : "#E8E2F0"}`,
          borderRadius: 12, background: agreed ? T.lavLight : T.white,
          transition: "all 0.15s",
        }}>
          <input
            type="checkbox" checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            style={{ width: 18, height: 18, accentColor: T.lav, marginTop: 1, flexShrink: 0 }}
          />
          <span style={{ fontSize: 14, color: T.inkSoft, lineHeight: 1.6 }}>
            I have read and understand the above, and I consent to the collection and use of my health data as described.
          </span>
        </label>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <PrimaryBtn disabled={!agreed} onClick={onConsent}>I Consent</PrimaryBtn>
          <GhostBtn onClick={onCancel}>Cancel</GhostBtn>
        </div>
      </Card>
    </GradientBg>
  );
}

// --- 5f. Single question card ---
function AnswerOption({ label, value, selected, sectionColor, sectionLight, onClick }) {
  const isSel = selected === value;
  return (
    <button
      onClick={() => onClick(value)}
      style={{
        background: isSel ? sectionLight : T.white,
        border: `1.5px solid ${isSel ? sectionColor : T.lavBorder}`,
        borderRadius: 14, padding: "14px 18px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontSize: 15, color: isSel ? sectionColor : T.inkSoft,
        fontWeight: isSel ? 600 : 400, cursor: "pointer",
        transition: "all 0.15s",
        boxShadow: isSel ? `0 0 0 3px ${sectionColor}22` : "none",
        width: "100%",
      }}
    >
      <span>{label}</span>
      <span style={{
        width: 20, height: 20, borderRadius: 50, flexShrink: 0,
        border: `2px solid ${isSel ? sectionColor : T.lavBorder}`,
        background: isSel ? sectionColor : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.15s",
      }}>
        {isSel && <div style={{ width: 8, height: 8, borderRadius: 50, background: T.white }} />}
      </span>
    </button>
  );
}

// --- 5g. Question screen ---
export function QuestionScreen({ onComplete }) {
  const [current, setCurrent]   = useState(0);
  const [answers, setAnswers]   = useState([]);
  const [selected, setSelected] = useState(null);
  const [leaving, setLeaving]   = useState(false);
  const timerRef                = useRef(null);

  const q      = ALL_QUESTIONS[current];
  const isGAD  = q.section === "GAD-7";
  const scColor = isGAD ? T.teal : T.rose;
  const scLight = isGAD ? T.tealLight : T.roseLight;

  const handleSelect = (val) => {
    if (leaving) return;
    setSelected(val);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const updated = [...answers];
      updated[current] = val;
      setLeaving(true);
      setTimeout(() => {
        if (current === TOTAL_QUESTIONS - 1) {
          onComplete(updated);
        } else {
          setAnswers(updated);
          setCurrent(c => c + 1);
          setSelected(null);
          setLeaving(false);
        }
      }, 280);
    }, 360);
  };

  return (
    <GradientBg style={{ justifyContent: "flex-start", paddingTop: 32, paddingBottom: 48 }}>
      <div style={{ width: "100%", maxWidth: 520 }}>
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <SectionBadge section={q.section} />
          <span style={{ fontSize: 13, color: T.muted, fontWeight: 500 }}>
            {current + 1} / {TOTAL_QUESTIONS}
          </span>
        </div>

        {/* Animated question block */}
        <div style={{
          opacity: leaving ? 0 : 1,
          transform: leaving ? "translateY(-10px)" : "translateY(0)",
          transition: "opacity 0.25s, transform 0.25s",
        }}>
          <p style={{ fontSize: 13, color: T.muted, margin: "0 0 6px", fontStyle: "italic" }}>
            Over the last 2 weeks, how often have you been bothered by:
          </p>
          <p style={{ fontSize: 19, fontWeight: 700, color: T.ink, margin: "0 0 24px", lineHeight: 1.4 }}>
            {q.text}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ANSWER_OPTIONS.map(opt => (
              <AnswerOption
                key={opt.value}
                label={opt.label}
                value={opt.value}
                selected={selected}
                sectionColor={scColor}
                sectionLight={scLight}
                onClick={handleSelect}
              />
            ))}
          </div>

          {current === 8 && (
            <div style={{ marginTop: 18, padding: "12px 16px", background: T.tealLight, border: `1px solid ${T.tealBorder}`, borderRadius: 12 }}>
              <p style={{ fontSize: 13, color: T.inkLighter, margin: 0 }}>
                <strong style={{ color: T.teal }}>Almost there</strong> — the next section covers anxiety symptoms.
              </p>
            </div>
          )}
        </div>
      </div>

      <BottomProgressBar current={current + 1} total={TOTAL_QUESTIONS} />
    </GradientBg>
  );
}

// --- 5h. Score card ---
function ScoreCard({ label, sub, score, max, sev }) {
  return (
    <div style={{ background: T.white, border: `1px solid ${T.lavBorder}`, borderRadius: 16, padding: "18px 16px" }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", color: T.muted, textTransform: "uppercase", margin: "0 0 4px" }}>{label}</p>
      <p style={{ fontSize: 13, color: T.inkLighter, margin: "0 0 10px" }}>{sub}</p>
      <p style={{ fontSize: 28, fontWeight: 800, color: sev.color, margin: "0 0 8px", lineHeight: 1 }}>
        {score}<span style={{ fontSize: 14, fontWeight: 500, color: T.muted }}> / {max}</span>
      </p>
      <Pill color={sev.color} bg={sev.bg} border={sev.border}>{sev.label}</Pill>
    </div>
  );
}

// --- 5i. Crisis box ---
function CrisisBox() {
  return (
    <div style={{ background: T.roseLight, border: `1.5px solid ${T.roseBorder}`, borderRadius: 14, padding: "16px 18px", marginBottom: 16 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
        <AlertTriangle size={16} color={T.roseDeep} />
        <p style={{ fontSize: 13, fontWeight: 700, color: T.roseDeep, margin: 0 }}>Please reach out for support</p>
      </div>
      <p style={{ fontSize: 13, color: T.inkSoft, lineHeight: 1.7, margin: "0 0 8px" }}>
        Your responses suggest you may be going through significant distress. You are not alone.
      </p>
      <p style={{ fontSize: 13, color: T.inkSoft, lineHeight: 1.8, margin: 0 }}>
        <strong>Nepal:</strong> TPO Nepal — 01-4460054<br />
        <strong>Vandrevala Foundation:</strong> 1860-2662-345<br />
        <strong>Global:</strong>{" "}
        <a href="https://www.iasp.info/resources/Crisis_Centres/" style={{ color: T.lav }}>
          Find a local crisis centre
        </a>
      </p>
    </div>
  );
}

// --- 5j. Results screen ---
export function ResultsScreen({ answers, onRestart }) {
  const phqScore = answers.slice(0, 9).reduce((sum, v) => sum + v, 0);
  const gadScore = answers.slice(9, 16).reduce((sum, v) => sum + v, 0);
  const phqSev   = phqSeverity(phqScore);
  const gadSev   = gadSeverity(gadScore);
  const level    = overallLevel(phqSev.label, gadSev.label);
  const showCrisis = level >= 2 || answers[8] >= 1;

  const interpretations = [
    "Your responses suggest minimal symptoms of both depression and anxiety. This is a great sign. Keep up the habits that support your well-being.",
    "Your responses suggest mild symptoms. These are manageable, and targeted self-care can help a great deal. Consider monitoring your mood regularly.",
    "Your responses suggest moderate symptoms. It is worth speaking with a counsellor or your GP about how you have been feeling lately.",
    "Your responses suggest significant symptoms. Please consider reaching out to a mental health professional soon. You deserve the right support.",
  ];

  const recs = [
    level === 0 && "Your scores suggest minimal symptoms. Keep nurturing your wellness with regular rest and movement.",
    level === 1 && "Mild symptoms are common. Self-care, journaling, and talking to a trusted person can make a real difference.",
    level >= 2  && "Consider speaking with a counsellor or GP. Your results suggest it would be helpful to get professional support.",
    "Aim for 7 to 9 hours of sleep nightly. Both mood and anxiety are closely tied to rest.",
    "Even a 20-minute daily walk has strong evidence for improving mental well-being.",
    level >= 1  && "Limit caffeine after midday, and try a short breathing or grounding exercise when stressed.",
  ].filter(Boolean);

  return (
    <GradientBg style={{ justifyContent: "flex-start", paddingTop: 36, paddingBottom: 48 }}>
      <div style={{ width: "100%", maxWidth: 520 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 52, height: 52, borderRadius: 50, background: T.lavLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <CheckCircle size={26} color={T.lav} />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: T.ink, margin: "0 0 6px" }}>Your results</h1>
          <p style={{ fontSize: 14, color: T.muted, margin: 0 }}>Based on your responses from the past 2 weeks</p>
        </div>

        {/* Score cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <ScoreCard label="PHQ-9" sub="Depression" score={phqScore} max={27} sev={phqSev} />
          <ScoreCard label="GAD-7" sub="Anxiety"    score={gadScore} max={21} sev={gadSev} />
        </div>

        {/* Interpretation */}
        <div style={{
          background: level >= 2 ? T.roseLight : T.sageLight,
          border: `1px solid ${level >= 2 ? T.roseBorder : T.sageBorder}`,
          borderRadius: 14, padding: "16px 18px", marginBottom: 16,
        }}>
          <p style={{ fontSize: 14, color: T.inkSoft, lineHeight: 1.75, margin: 0 }}>
            {interpretations[Math.min(level, 3)]}
          </p>
        </div>

        {showCrisis && <CrisisBox />}

        {/* Recommendations */}
        <div style={{ background: T.white, border: `1px solid ${T.lavBorder}`, borderRadius: 14, padding: "18px", marginBottom: 16 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: T.ink, margin: "0 0 14px" }}>Recommendations</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recs.map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: T.inkSoft, lineHeight: 1.6 }}>
                <CheckCircle size={15} color={T.sage} style={{ flexShrink: 0, marginTop: 3 }} />
                {r}
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.7, marginBottom: 20, padding: "12px 16px", background: T.amberLight, border: `1px solid ${T.amberBorder}`, borderRadius: 12 }}>
          This tool is for self-awareness only and does not constitute a clinical diagnosis. Please consult a licensed mental health professional for a proper evaluation.
        </div>

        <GhostBtn onClick={onRestart}><ArrowLeft size={15} /> Take screening again</GhostBtn>
      </div>

      <BottomProgressBar current={TOTAL_QUESTIONS} total={TOTAL_QUESTIONS} />
    </GradientBg>
  );
}

// ─────────────────────────────────────────────
// 6. APP ORCHESTRATOR
// ─────────────────────────────────────────────
export default function ScreeningFlow() {
  const [step, setStep]       = useState("landing");
  const [answers, setAnswers] = useState([]);

  const go = (s) => setStep(s);

  if (step === "landing")    return <LandingScreen    onNext={() => go("disclaimer")} />;
  if (step === "disclaimer") return <DisclaimerScreen  onNext={() => go("agegate")}   onBack={() => go("landing")} />;
  if (step === "agegate")    return <AgeGateScreen     onPass={() => go("consent")}   onFail={() => go("denied")} onBack={() => go("disclaimer")} />;
  if (step === "denied")     return <AgeDeniedScreen   onBack={() => go("landing")} />;
  if (step === "consent")    return <ConsentScreen     onConsent={() => go("questions")} onCancel={() => go("landing")} />;
  if (step === "questions")  return <QuestionScreen    onComplete={(ans) => { setAnswers(ans); go("results"); }} />;
  if (step === "results")    return <ResultsScreen     answers={answers} onRestart={() => { setAnswers([]); go("landing"); }} />;
  return null;
}
