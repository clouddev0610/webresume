import React, { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Link2, Radio, CircleDot, Server, ShieldCheck, Cloud, Cpu, ChevronDown, FolderGit2, GraduationCap, Activity } from "lucide-react";
import { fetchResume } from "./api";

const ICONS = { Server, ShieldCheck, Cloud, Cpu };

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

.rz {
  --bg: #0a0f1a;
  --surface: #111a2b;
  --surface-2: #16213a;
  --line: #223052;
  --line-soft: #1a2440;
  --text: #e9eef7;
  --text-muted: #8fa1bd;
  --text-dim: #5c6d8a;
  --cyan: #4fd6c4;
  --cyan-dim: #2c6b64;
  --amber: #f3b551;
  --amber-dim: #8a672f;

  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
  min-height: 100vh;
  position: relative;
  line-height: 1.55;
}

.rz * { box-sizing: border-box; }

.rz .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
.rz .display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }

.rz .bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--line-soft) 1px, transparent 1px),
    linear-gradient(90deg, var(--line-soft) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 90%);
  opacity: 0.5;
  pointer-events: none;
}

.rz-status-screen {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  flex-direction: column; gap: 14px; text-align: center; padding: 24px;
}
.rz-status-screen .mono { font-size: 13px; color: var(--text-muted); }
.rz-status-screen .err { color: var(--amber); max-width: 460px; }
/* ---- hero ---- */
.rz-shell { max-width: 1040px; margin: 0 auto; padding: 0 24px; position: relative; }
.rz-hero { padding: 56px 0 64px; }

.rz-term {
  border: 1px solid var(--line);
  background: var(--surface);
  border-radius: 10px;
  padding: 16px 18px;
  max-width: 560px;
  margin-bottom: 34px;
}
.rz-term-bar { display: flex; align-items: center; gap: 6px; margin-bottom: 12px; opacity: 0.5; }
.rz-term-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--line); }
.rz-term-body { font-size: 12.5px; color: var(--cyan); min-height: 60px; white-space: pre-wrap; }
.rz-term-body .dim { color: var(--text-dim); }
.rz-cursor { display: inline-block; width: 7px; height: 14px; background: var(--cyan); margin-left: 2px; vertical-align: -2px; animation: blink 1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }

.rz-name { font-size: clamp(34px, 5.4vw, 54px); font-weight: 700; letter-spacing: -0.02em; margin: 0; line-height: 1.05; }
.rz-role { font-size: 18px; color: var(--cyan); margin: 10px 0 18px; font-weight: 500; }
.rz-tagline { color: var(--text-muted); max-width: 620px; font-size: 15px; margin-bottom: 26px; }

.rz-status {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--cyan); border: 1px solid var(--cyan-dim); background: rgba(79,214,196,0.06);
  padding: 6px 12px; border-radius: 999px; margin-bottom: 30px;
}
.rz-pulse { width: 7px; height: 7px; border-radius: 50%; background: var(--cyan); box-shadow: 0 0 0 0 rgba(79,214,196,0.6); animation: pulse 2s infinite; }
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(79,214,196,0.55); }
  70% { box-shadow: 0 0 0 8px rgba(79,214,196,0); }
  100% { box-shadow: 0 0 0 0 rgba(79,214,196,0); }
}

.rz-chips { display: flex; flex-wrap: wrap; gap: 10px; }
.rz-chip {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 12.5px; padding: 8px 12px; border-radius: 8px;
  border: 1px solid var(--line); background: var(--surface); color: var(--text-muted);
  text-decoration: none;
}
.rz-chip:hover { border-color: var(--cyan-dim); color: var(--text); }
.rz-chip svg { color: var(--cyan); flex-shrink: 0; }
.rz-chip .ph { color: var(--amber); border-bottom: 1px dashed var(--amber-dim); }
/* ---- nav ---- */
.rz-nav {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(10, 15, 26, 0.86);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}
.rz-nav-inner {
  max-width: 1040px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.rz-nav-brand { display: flex; align-items: center; gap: 8px; font-size: 13px; letter-spacing: 0.02em; color: var(--text-muted); }
.rz-nav-links { display: flex; gap: 4px; overflow-x: auto; }
.rz-nav-link {
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 7px 12px;
  border-radius: 6px;
  color: var(--text-dim);
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}
.rz-nav-link:hover { color: var(--text); }
.rz-nav-link.active { color: var(--cyan); border-color: var(--cyan-dim); background: rgba(79,214,196,0.08); }
.rz-nav-link .hop { font-family: 'JetBrains Mono', monospace; opacity: 0.6; font-size: 10px; }
/* ---- sections (shared) ---- */
.rz-section { padding: 72px 0; border-bottom: 1px solid var(--line-soft); scroll-margin-top: 64px; }
.rz-section:last-of-type { border-bottom: none; }

.rz-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--cyan);
  margin-bottom: 14px;
}
.rz-eyebrow::before { content: ''; width: 16px; height: 1px; background: var(--cyan-dim); display: inline-block; }

.rz-h2 { font-size: 28px; font-weight: 600; margin: 0 0 20px; letter-spacing: -0.01em; }

/* ---- summary ---- */
.rz-summary-card { border: 1px solid var(--line); background: var(--surface); border-radius: 12px; padding: 26px 28px; font-size: 15.5px; color: var(--text-muted); }
/* ---- expertise ---- */
.rz-expertise-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
@media (max-width: 700px) { .rz-expertise-grid { grid-template-columns: 1fr; } }
.rz-expertise-card { border: 1px solid var(--line); background: var(--surface); border-radius: 12px; padding: 20px 22px; }
.rz-expertise-head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.rz-expertise-head svg { color: var(--cyan); }
.rz-expertise-head h3 { font-size: 14px; margin: 0; letter-spacing: 0.01em; font-weight: 600; }
.rz-tag-list { display: flex; flex-wrap: wrap; gap: 7px; }
.rz-tag {
  font-size: 11.5px; font-family: 'JetBrains Mono', monospace;
  padding: 5px 9px; border-radius: 6px; border: 1px solid var(--line);
  color: var(--text-muted); background: var(--surface-2);
  transition: border-color 0.15s ease, color 0.15s ease;
}
.rz-tag:hover { border-color: var(--cyan-dim); color: var(--cyan); }
/* ---- experience ---- */
.rz-exp-list { display: flex; flex-direction: column; gap: 14px; }
.rz-exp-card { border: 1px solid var(--line); background: var(--surface); border-radius: 12px; overflow: hidden; border-left: 2px solid var(--line); }
.rz-exp-card.current { border-left-color: var(--cyan); }
.rz-exp-btn { width: 100%; background: transparent; border: none; cursor: pointer; color: inherit; text-align: left; padding: 20px 22px; display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
.rz-exp-role { font-size: 16px; font-weight: 600; margin: 0 0 4px; }
.rz-exp-meta { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; font-size: 12.5px; color: var(--text-dim); }
.rz-exp-date { font-family: 'JetBrains Mono', monospace; color: var(--cyan); }
.rz-exp-date.ph { color: var(--amber); border-bottom: 1px dashed var(--amber-dim); }
.rz-current-pill { font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--cyan); border: 1px solid var(--cyan-dim); padding: 2px 8px; border-radius: 999px; }
.rz-chev { color: var(--text-dim); flex-shrink: 0; transition: transform 0.2s ease; margin-top: 3px; }
.rz-chev.open { transform: rotate(180deg); color: var(--cyan); }
.rz-exp-body { overflow: hidden; transition: max-height 0.28s ease; }
.rz-exp-bullets { list-style: none; margin: 0; padding: 0 22px 22px; display: flex; flex-direction: column; gap: 10px; }
.rz-exp-bullets li { position: relative; padding-left: 18px; font-size: 14px; color: var(--text-muted); }
.rz-exp-bullets li::before { content: ''; position: absolute; left: 0; top: 8px; width: 6px; height: 1px; background: var(--cyan-dim); }
/* ---- projects ---- */
.rz-proj-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 700px) { .rz-proj-grid { grid-template-columns: 1fr; } }
.rz-proj-card { border: 1px solid var(--line); background: var(--surface); border-radius: 12px; padding: 22px; }
.rz-proj-head { display: flex; align-items: center; gap: 9px; margin-bottom: 4px; }
.rz-proj-head svg { color: var(--cyan); }
.rz-proj-title { font-size: 15.5px; font-weight: 600; margin: 0; }
.rz-proj-date { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--text-dim); margin: 4px 0 14px; }
.rz-proj-date.ph { color: var(--amber); }
.rz-proj-card ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.rz-proj-card li { position: relative; padding-left: 16px; font-size: 13.5px; color: var(--text-muted); }
.rz-proj-card li::before { content: ''; position: absolute; left: 0; top: 7px; width: 5px; height: 1px; background: var(--cyan-dim); }
/* ---- education ---- */
.rz-edu-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
@media (max-width: 700px) { .rz-edu-grid { grid-template-columns: 1fr; } }
.rz-edu-card { border: 1px solid var(--line); background: var(--surface); border-radius: 10px; padding: 16px 18px; display: flex; gap: 12px; align-items: flex-start; }
.rz-edu-card svg { color: var(--cyan); flex-shrink: 0; margin-top: 2px; }
.rz-edu-name { font-size: 13.5px; font-weight: 600; margin: 0 0 3px; }
.rz-edu-issuer { font-size: 12.5px; color: var(--text-muted); margin: 0 0 6px; }
.rz-edu-year { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--amber); border-bottom: 1px dashed var(--amber-dim); display: inline-block; }
/* ---- contact / footer ---- */
.rz-contact-card {
  border: 1px solid var(--line); background: linear-gradient(180deg, var(--surface), var(--surface-2));
  border-radius: 14px; padding: 36px; text-align: center;
}
.rz-contact-card h2 { font-size: 24px; margin: 0 0 10px; }
.rz-contact-card p { color: var(--text-muted); margin: 0 0 24px; font-size: 14.5px; }
.rz-contact-chips { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }

.rz-footer { padding: 26px 0 48px; text-align: center; font-size: 12px; color: var(--text-dim); font-family: 'JetBrains Mono', monospace; }
.rz-note {
  max-width: 1040px; margin: 0 auto 0; padding: 12px 24px;
  font-size: 12px; color: var(--amber); text-align: center;
  border-bottom: 1px solid var(--line-soft);
}
.rz-note span { border-bottom: 1px dashed var(--amber-dim); }
`;

function ContactChip({ icon: Icon, value, placeholder, href }) {
  return (
    <a className="rz-chip" href={href || undefined}>
      <Icon size={14} />
      <span className={placeholder ? "ph" : ""}>{value}</span>
    </a>
  );
}

function TypedTerminal({ name }) {
  const lines = [
    { pre: "> ", text: `establishing_session --user="${name}"`, cls: "" },
    { pre: "> ", text: "role: Systems Engineer", cls: "dim" },
    { pre: "> ", text: "status: ONLINE", cls: "" },
  ];
  const [shown, setShown] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (shown >= lines.length) return;
    const full = lines[shown].pre + lines[shown].text;
    if (charIdx < full.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 16);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setShown((s) => s + 1);
        setCharIdx(0);
      }, 220);
      return () => clearTimeout(t);
    }
  }, [charIdx, shown]);

  return (
    <div className="rz-term mono">
      <div className="rz-term-bar">
        <span className="rz-term-dot" />
        <span className="rz-term-dot" />
        <span className="rz-term-dot" />
      </div>
      <div className="rz-term-body">
        {lines.slice(0, shown).map((l, i) => (
          <div key={i} className={l.cls}>{l.pre}{l.text}</div>
        ))}
        {shown < lines.length && (
          <div className={lines[shown].cls}>
            {(lines[shown].pre + lines[shown].text).slice(0, charIdx)}
            <span className="rz-cursor" />
          </div>
        )}
      </div>
    </div>
  );
}

function ExperienceCard({ item, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const bodyRef = useRef(null);

  return (
    <div className={`rz-exp-card${item.current ? " current" : ""}`}>
      <button className="rz-exp-btn" onClick={() => setOpen((o) => !o)}>
        <div>
          <p className="rz-exp-role display">{item.role}</p>
          <div className="rz-exp-meta">
            <span>{item.company}</span>
            <span className={`mono rz-exp-date${item.datePlaceholder ? " ph" : ""}`}>{item.date}</span>
            {item.current && <span className="rz-current-pill">Current</span>}
          </div>
        </div>
        <ChevronDown size={18} className={`rz-chev${open ? " open" : ""}`} />
      </button>
      <div
        className="rz-exp-body"
        style={{ maxHeight: open ? (bodyRef.current?.scrollHeight || 1000) + "px" : "0px" }}
      >
        <ul className="rz-exp-bullets" ref={bodyRef}>
          {item.bullets.map((b) => <li key={b.id}>{b.text}</li>)}
        </ul>
      </div>
    </div>
  );
}

const SECTIONS = [
  { id: "summary", label: "Summary", hop: "01" },
  { id: "expertise", label: "Expertise", hop: "02" },
  { id: "experience", label: "Experience", hop: "03" },
  { id: "projects", label: "Projects", hop: "04" },
  { id: "education", label: "Education", hop: "05" },
  { id: "contact", label: "Contact", hop: "06" },
];

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("summary");

  useEffect(() => {
    let cancelled = false;
    fetchResume()
      .then((json) => { if (!cancelled) setData(json); })
      .catch((err) => { if (!cancelled) setError(err.message); });
    return () => { cancelled = true; };
  }, []);
  useEffect(() => {
    if (!data) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [data]);

  if (error) {
    return (
      <div className="rz">
        <style>{CSS}</style>
        <div className="bg-grid" />
        <div className="rz-status-screen">
          <p className="mono err">
            Couldn't reach the resume API: {error}
            <br />
            Make sure Django is running on port 8000.
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rz">
        <style>{CSS}</style>
        <div className="bg-grid" />
        <div className="rz-status-screen">
          <p className="mono">connecting to resume API&hellip;</p>
        </div>
      </div>
    );
  }

  

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="rz">
      <style>{CSS}</style>
      <div className="bg-grid" />
      <nav className="rz-nav">
        <div className="rz-nav-inner">
          <div className="rz-nav-brand mono">
            <Radio size={14} color="var(--cyan)" />
            {data.name.toUpperCase().replace(/\u2019/g, "")} // RESUME
          </div>
          <div className="rz-nav-links">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`rz-nav-link${active === s.id ? " active" : ""}`}
                onClick={() => scrollTo(s.id)}
              >
                <span className="hop mono">{s.hop}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
      <div className="rz-note mono">
        Test Note: update fields with info but maybe corky message here
      </div>

      <div className="rz-shell">
        <section className="rz-hero">
          <TypedTerminal name={data.name} />
          <h1 className="rz-name display">{data.name}</h1>
          <p className="rz-role mono">{data.title}</p>
          <p className="rz-tagline">{data.tagline}</p>
          <div className="rz-status mono"><span className="rz-pulse" />Systems Online</div>
          <div className="rz-chips">
            <ContactChip icon={Phone} value={data.contact.phone.value} placeholder={data.contact.phone.isPlaceholder} />
            <ContactChip icon={Mail} value={data.contact.email.value} placeholder={data.contact.email.isPlaceholder} />
            <ContactChip icon={MapPin} value={data.contact.location.value} placeholder={data.contact.location.isPlaceholder} />
            <ContactChip icon={Link2} value={data.contact.linkedin.value} placeholder={data.contact.linkedin.isPlaceholder} />
          </div>
        </section>
        <section id="summary" className="rz-section">
          <div className="rz-eyebrow mono">Hop 01 &middot; Career Summary</div>
          <h2 className="rz-h2 display">Career Summary</h2>
          <div className="rz-summary-card">{data.summary}</div>
        </section>
        <section id="expertise" className="rz-section">
          <div className="rz-eyebrow mono">Hop 02 &middot; Expertise</div>
          <h2 className="rz-h2 display">Expertise</h2>
          <div className="rz-expertise-grid">
            {data.expertise.map((g) => {
              const Icon = ICONS[g.icon] || Server;
              return (
                <div className="rz-expertise-card" key={g.id}>
                  <div className="rz-expertise-head">
                    <Icon size={17} />
                    <h3 className="mono">{g.title}</h3>
                  </div>
                  <div className="rz-tag-list">
                    {g.items.map((it) => <span className="rz-tag" key={it.id}>{it.text}</span>)}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section id="experience" className="rz-section">
          <div className="rz-eyebrow mono">Hop 03 &middot; Professional Experience</div>
          <h2 className="rz-h2 display">Professional Experience</h2>
          <div className="rz-exp-list">
            {data.experience.map((e, i) => (
              <ExperienceCard item={e} key={e.id} defaultOpen={i === 0} />
            ))}
          </div>
        </section>
        <section id="projects" className="rz-section">
          <div className="rz-eyebrow mono">Hop 04 &middot; Technical Projects</div>
          <h2 className="rz-h2 display">Technical Projects</h2>
          <div className="rz-proj-grid">
            {data.projects.map((p) => (
              <div className="rz-proj-card" key={p.id}>
                <div className="rz-proj-head">
                  <FolderGit2 size={16} />
                  <p className="rz-proj-title display">{p.title}</p>
                </div>
                <p className={`rz-proj-date mono${p.dateNote ? " ph" : ""}`}>{p.date}</p>
                <ul>{p.bullets.map((b) => <li key={b.id}>{b.text}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>
        <section id="education" className="rz-section">
          <div className="rz-eyebrow mono">Hop 05 &middot; Education &amp; Certifications</div>
          <h2 className="rz-h2 display">Education &amp; Certifications</h2>
          <div className="rz-edu-grid">
            {data.education.map((ed) => (
              <div className="rz-edu-card" key={ed.id}>
                <GraduationCap size={18} />
                <div>
                  <p className="rz-edu-name">{ed.name}</p>
                  <p className="rz-edu-issuer">{ed.issuer}</p>
                  <span className="rz-edu-year">{ed.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="contact" className="rz-section" style={{ borderBottom: "none" }}>
          <div className="rz-eyebrow mono">Hop 06 &middot; Contact</div>
          <div className="rz-contact-card">
            <Activity size={22} color="var(--cyan)" style={{ marginBottom: 14 }} />
            <h2 className="display">Let&rsquo;s connect the route.</h2>
            <p>Open to systems, infrastructure, and network engineering opportunities.</p>
            <div className="rz-contact-chips">
              <ContactChip icon={Mail} value={data.contact.email.value} placeholder={data.contact.email.isPlaceholder} href={`mailto:${data.contact.email.value}`} />
              <ContactChip icon={Phone} value={data.contact.phone.value} placeholder={data.contact.phone.isPlaceholder} />
              <ContactChip icon={Link2} value={data.contact.linkedin.value} placeholder={data.contact.linkedin.isPlaceholder} />
              <ContactChip icon={MapPin} value={data.contact.location.value} placeholder={data.contact.location.isPlaceholder} />
            </div>
          </div>
        </section>
      </div>
      <div className="rz-footer">
        <CircleDot size={10} style={{ verticalAlign: -1, marginRight: 6 }} color="var(--cyan)" />
        route complete &mdash; end of resume &mdash; &copy; {data.name}
      </div>
    </div>
  );
}