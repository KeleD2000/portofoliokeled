import Terminal from "../components/Terminal";
import ContactForm from "../components/ContactForm";
import { Reveal, Scramble, Photo, Ambient } from "../components/Fx";
import { profile, skills, projects, career, reviews } from "../data/profile";

function Log({ items }) {
    return (
        <Reveal as="ol" kind="draw" className="log">
            {items.map((p, i) => (
                <li key={p.hash} style={{ "--i": i }}>
                    <code className="hash">{p.hash}</code>
                    <div className="card">
                        <div className="meta"><span className={`tag ${p.tag}`}>{p.tag}</span><span>{p.date}</span></div>
                        <h3>{p.title}</h3>
                        <p>{p.desc}</p>
                        <p className="result">{p.result}</p>
                        <div className="stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
                        {p.link && <a className="plink" href={p.link} target="_blank" rel="noopener noreferrer">Oldal megnyitása</a>}
                    </div>
                </li>
            ))}
        </Reveal>
    );
}

const names = skills.flatMap((g) => g.items.map((i) => i.name));

export default function Home() {
    return (
        <main>
            <Ambient />
            <header className="hero">
                <div className="intro">
                    <h1><Scramble text={profile.name} /></h1>
                    <p className="role">{profile.role}</p>
                    <p className="lead">Kattints a terminálra, és kérdezz rá bármire. Ha nem szeretsz gépelni, a gombok is működnek.</p>
                </div>
                <Terminal />
            </header>

            <div className="marquee" aria-hidden>
                <div>{[...names, ...names, ...names, ...names].map((n, i) => <span key={i}>{n}</span>)}</div>
            </div>

            <Reveal as="section" id="about" className="about-grid">
                <div><h2>Rólam</h2><p className="about">{profile.about}</p></div>
                <Photo name={profile.name} />
            </Reveal>

            <section id="skills">
                <h2>Skillek</h2>
                <pre className="pkg">{'{\n  "dependencies": {'}</pre>
                {skills.map((g) => (
                    <Reveal className="group" key={g.group}>
                        <h3>{g.group}</h3>
                        <div className="deps">
                            {g.items.map((s, i) => (
                                <div className="dep" key={s.name} tabIndex={0} style={{ "--i": i }}>
                                    <b>{s.name}</b>
                                    <span className="meter" aria-label={`${s.level}/5`}>{[1, 2, 3, 4, 5].map((n) => <i key={n} style={{ "--n": n }} className={n <= s.level ? "on" : ""} />)}</span>
                                    <small>{s.years} év</small>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                ))}
                <pre className="pkg">{"  }\n}"}</pre>
            </section>

            <section id="projects">
                <h2>Projektek</h2>
                <Log items={projects} />
            </section>

            <section id="career">
                <h2>Pályám</h2>
                <Log items={career} />
            </section>

            {reviews.length > 0 && (
                <section id="reviews">
                    <h2>Referenciák</h2>
                    {reviews.map((r, i) => (
                        <Reveal as="article" kind="left" className="review" key={r.author} style={{ transitionDelay: `${i * 120}ms` }}>
                            <div className="rv-head"><b>{r.author}</b> <span>{r.role}</span><em>✔ Approved</em></div>
                            <p>{r.text}</p>
                        </Reveal>
                    ))}
                </section>
            )}

            <Reveal as="section" id="contact" className="contact">
                <div className="contact-info">
                    <h2>Dolgozzunk együtt</h2>
                    <p className="about">Új projektet, csapatot vagy érdekes problémát keresek. Írj pár sort, és egy munkanapon belül válaszolok.</p>
                    <p className="links"><a href={`mailto:${profile.email}`}>{profile.email}</a>{profile.github && <a href={profile.github}>GitHub</a>}<a href={profile.linkedin}>LinkedIn</a></p>
                </div>
                <ContactForm />
            </Reveal>
        </main>
    );
}