"use client";
import { useEffect, useRef, useState } from "react";

/* Görgetésre megjelenő elem. kind: up | left | pop */
export function Reveal({ as: T = "div", kind = "up", className = "", children, ...rest }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <T ref={ref} className={`rv ${kind} ${on ? "shown" : ""} ${className}`} {...rest}>{children}</T>;
}

/* Betűk "megfejtése" betöltéskor és egérrel föléhúzva */
const CH = "abcdefghijklmnopqrstuvwxyz{}<>/=;_0123456789";
export function Scramble({ text }) {
  const [out, setOut] = useState(text);
  const timer = useRef(null);
  const play = () => {
    clearInterval(timer.current);
    let f = 0;
    timer.current = setInterval(() => {
      f++;
      setOut(text.split("").map((c, i) => (c === " " || i < f / 2 ? c : CH[Math.floor(Math.random() * CH.length)])).join(""));
      if (f / 2 >= text.length) { clearInterval(timer.current); setOut(text); }
    }, 35);
  };
  useEffect(() => { play(); return () => clearInterval(timer.current); }, []);
  return <span onMouseEnter={play} aria-label={text}>{out}</span>;
}

/* Fotó: 3D döntés az egér után, forgó gyűrű, lüktető forma.
   Tedd a képed ide: public/me.jpg */
export function Photo({ name, src = "/me.jpg" }) {
  const [ok, setOk] = useState(true);
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(600px) rotateY(${x * 22}deg) rotateX(${-y * 22}deg) scale(1.04)`;
  };
  const reset = () => (ref.current.style.transform = "");
  const initials = name.split(" ").map((w) => w[0]).join("");
  return (
      <div className="photo" onMouseMove={move} onMouseLeave={reset}>
        <div className="photo-tilt" ref={ref}>
          <div className="photo-frame">
            {ok ? <img src={src} alt={name} onError={() => setOk(false)} /> : <span className="initials">{initials}</span>}
          </div>
        </div>
      </div>
  );
}

/* Görgetési csík + egér után mozgó fényfolt */
export function Ambient() {
  const bar = useRef(null);
  useEffect(() => {
    const m = (e) => { document.documentElement.style.setProperty("--mx", e.clientX + "px"); document.documentElement.style.setProperty("--my", e.clientY + "px"); };
    const s = () => { const h = document.documentElement; bar.current.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`; };
    window.addEventListener("mousemove", m); window.addEventListener("scroll", s, { passive: true });
    return () => { window.removeEventListener("mousemove", m); window.removeEventListener("scroll", s); };
  }, []);
  return (<><div className="spot" aria-hidden /><div className="progress" ref={bar} aria-hidden /></>);
}