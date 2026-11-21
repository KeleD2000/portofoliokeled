"use client";
import { useState } from "react";

export default function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", message: "", website: "" });
  const [state, setState] = useState("idle"); // idle | sending | sent | error
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setState("sending"); setErr("");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setState("sent"); setF({ name: "", email: "", message: "", website: "" });
    } catch (x) { setErr(x.message || "Hiba történt."); setState("error"); }
  };

  if (state === "sent")
    return (
      <div className="sent" role="status">
        <svg viewBox="0 0 52 52" width="64" height="64"><circle cx="26" cy="26" r="24" /><path d="M14 27l8 8 16-17" /></svg>
        <p>Elküldve! Hamarosan válaszolok.</p>
        <button type="button" onClick={() => setState("idle")}>Új üzenet írása</button>
      </div>
    );

  return (
    <form className="cform" onSubmit={submit} noValidate>
      <label className="fld"><input value={f.name} onChange={set("name")} placeholder=" " required autoComplete="name" /><span>Neved</span></label>
      <label className="fld"><input type="email" value={f.email} onChange={set("email")} placeholder=" " required autoComplete="email" /><span>Email-címed</span></label>
      <label className="fld wide"><textarea rows={5} value={f.message} onChange={set("message")} placeholder=" " required minLength={10} /><span>Üzeneted</span></label>
      <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden value={f.website} onChange={set("website")} name="website" />
      <button className="send" disabled={state === "sending"}>{state === "sending" ? "Küldés…" : "Üzenet küldése"}</button>
      {state === "error" && <p className="ferr" role="alert">{err}</p>}
    </form>
  );
}
