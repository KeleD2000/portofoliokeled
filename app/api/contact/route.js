import { NextResponse } from "next/server";

const hits = new Map(); // egyszerű IP-alapú korlát: 3 üzenet / 10 perc
const esc = (s) => String(s).slice(0, 5000);

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "local";
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < 600000);
    if (recent.length >= 3) return NextResponse.json({ error: "Túl sok próbálkozás, kérlek várj pár percet." }, { status: 429 });

    const { name, email, message, website } = await req.json();
    if (website) return NextResponse.json({ ok: true }); // honeypot: botok kitöltik
    if (!name?.trim() || !/^\S+@\S+\.\S+$/.test(email || "") || (message || "").trim().length < 10)
      return NextResponse.json({ error: "Kérlek töltsd ki helyesen az összes mezőt." }, { status: 400 });

    const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO;
    if (!key || !to) return NextResponse.json({ error: "A szerver email-beállítása hiányos." }, { status: 500 });

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "Portfólió <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Új üzenet a portfóliódról: ${esc(name).slice(0, 80)}`,
        text: `Név: ${esc(name)}\nEmail: ${esc(email)}\n\n${esc(message)}`,
      }),
    });
    if (!r.ok) return NextResponse.json({ error: "Az üzenetet nem sikerült elküldeni. Próbáld újra később." }, { status: 502 });

    hits.set(ip, [...recent, now]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Váratlan hiba történt." }, { status: 500 });
  }
}
