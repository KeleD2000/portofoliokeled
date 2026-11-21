"use client";
import { useEffect, useRef, useState } from "react";
import { profile, skills, projects, career } from "../data/profile";

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const COMMANDS = {
  help: () => ["Elérhető parancsok:", "  about     – ki vagyok", "  skills    – amit használok", "  projects  – weboldalak, amiket építettem", "  career    – a pályám", "  contact   – elérhetőségek", "  clear     – képernyő törlése", "Tipp: Tab = kiegészítés, ↑ = előző parancs"],
  about: () => { go("about"); return [profile.about]; },
  whoami: () => [`${profile.name}, ${profile.role}, ${profile.location}`],
  skills: () => { go("skills"); return skills.map((g) => `${g.group.padEnd(9)}${g.items.map((i) => i.name).join(", ")}`); },
  projects: () => { go("projects"); return projects.map((p) => `${p.title} – ${p.date}`); },
  career: () => { go("career"); return career.map((p) => `${p.title} (${p.date})`); },
  contact: () => { go("contact"); return [`email     ${profile.email}`, profile.github && `github    ${profile.github}`, `linkedin  ${profile.linkedin}`].filter(Boolean); },
  "sudo hire-me": () => ["[sudo] jelszó nem szükséges.", "Szerződés előkészítve. Írj: " + profile.email],
  ls: () => ["about  skills  projects  career  contact"],
};

export default function Terminal() {
  const [lines, setLines] = useState([{ t: "out", v: `Szia, ${profile.firstName} vagyok. Írd be: help` }]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState([]);
  const [idx, setIdx] = useState(-1);
  const box = useRef(null);

  useEffect(() => { box.current?.scrollTo(0, box.current.scrollHeight); }, [lines]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHist((h) => [cmd, ...h]); setIdx(-1);
    if (cmd === "clear") return setLines([]);
    const fn = COMMANDS[cmd];
    const out = fn ? fn() : [`${cmd}: ismeretlen parancs. Próbáld: help`];
    setLines((l) => [...l, { t: "in", v: cmd }, ...out.map((v) => ({ t: "out", v }))]);
  };

  const onKey = (e) => {
    if (e.key === "Enter") { run(input); setInput(""); }
    else if (e.key === "ArrowUp") { e.preventDefault(); const n = Math.min(idx + 1, hist.length - 1); if (hist[n]) { setIdx(n); setInput(hist[n]); } }
    else if (e.key === "ArrowDown") { e.preventDefault(); const n = idx - 1; setIdx(n); setInput(n >= 0 ? hist[n] : ""); }
    else if (e.key === "Tab") { e.preventDefault(); const m = input && Object.keys(COMMANDS).find((c) => c.startsWith(input.toLowerCase())); if (m) setInput(m); }
  };

  return (
      <div className="term" onClick={() => document.getElementById("term-in").focus()} role="region" aria-label="Interaktív terminál">
        <div className="term-bar"><i /><i /><i /><span>~/{profile.name.toLowerCase().replace(" ", "-")}</span></div>
        <div className="term-body" ref={box} aria-live="polite">
          {lines.map((l, i) => <div key={i} className={l.t}>{l.t === "in" ? "❯ " : ""}{l.v}</div>)}
          <label className="in"><span>❯</span>
            <input id="term-in" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey}
                   autoComplete="off" spellCheck={false} aria-label="Parancs" />
          </label>
        </div>
        <div className="chips">{["about", "skills", "projects", "contact"].map((c) => <button key={c} onClick={() => run(c)}>{c}</button>)}</div>
      </div>
  );
}