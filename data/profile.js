// ✏️ Csak ezt a fájlt kell átírnod – az egész oldal ebből épül fel.
export const profile = {
    name: "Kele Dominik",
    firstName: "Dominik",
    role: "Full-stack szoftverfejlesztő",
    location: "Budapest",
    email: "k.dominik2000@gmail.com",
    github: "https://github.com/KeleD2000",
    linkedin: "https://www.linkedin.com/in/dominikkele-6a9b82315",
    about:
        "Budapesten dolgozó full-stack szoftverfejlesztő vagyok, aki összetett digitális megoldások és komplex szoftveres projektek tervezésével és megvalósításával foglalkozik. A teljes fejlesztési folyamatban részt veszek, az ötlettől és a háttérrendszerek kialakításától kezdve egészen a felhasználói felületek megvalósításáig.\n" +
        "\n" +
        "Két évig programozást oktattam, ami megtanított arra, hogyan tegyem az összetett dolgokat is érthetővé és átláthatóvá. Ezt a szemléletet a munkám során is fontosnak tartom: olyan megoldásokat építek, amelyek nemcsak jól működnek, hanem átgondoltak, könnyen használhatók és hosszú távon is fenntarthatók.",
};

// level: 1-5 (saját becslés – írd át!), years: tapasztalat
export const skills = [
    { group: "backend", items: [
            { name: "Java", level: 5, years: 3 }, { name: "Kotlin", level: 3, years: 1 },
            { name: "Spring Boot", level: 5, years: 3 }, { name: "Spring MVC", level: 3, years: 3 },
            { name: "Hibernate", level: 3, years: 3 }, { name: "REST API", level: 5, years: 5 },
            { name: "Microservices", level: 4, years: 3 }, { name: "Camunda BPM", level: 4, years: 3 } ] },
    { group: "frontend", items: [
            { name: "Angular", level: 5, years: 5 }, { name: "HTML5", level: 5, years: 5 },
            { name: "Bootstrap", level: 5, years: 5 }, { name: "Thymeleaf", level: 3, years: 3 },
            { name: "Drupal", level: 2, years: 1 } ] },
    { group: "adatok", items: [
            { name: "Oracle Database", level: 4, years: 3 }, { name: "H2", level: 4, years: 3 },
            { name: "MinIO", level: 3, years: 3 }, { name: "Liquibase", level: 3, years: 3 } ] },
    { group: "eszközök", items: [
            { name: "Git", level: 5, years: 5 }, { name: "Maven", level: 3, years: 3 },
            { name: "OOP", level: 5, years: 5 } ] },
    { group: "oktatás", items: [
            { name: "Python", level: 3, years: 3 }, { name: "Scratch", level: 3, years: 3 } ] },
];

// Projektek – "commit" formában. A link gombként jelenik meg a kártyán.
export const projects = [
    { hash: "e1ef2026", date: "elefantoscatering.hu", title: "Exclusive Catering by Elefántos", tag: "web",
        desc: "Pécsi catering cég bemutatkozó weboldala: szolgáltatások, galéria képekkel és videókkal, valamint árajánlatkérő űrlap. Világos és sötét téma között is lehet váltani.",
        result: "Élő weboldal", stack: ["Árajánlat-űrlap", "Galéria", "Világos/sötét téma"], link: "https://elefantoscatering.hu" },
    { hash: "ad2a2026", date: "adriahaus.eu", title: "Tengerpart Ingatlan", tag: "web",
        desc: "Horvátországi ingatlanközvetítő weboldal Isztria, Zadar, Split és Dalmácia ingatlanjaival, keresőoptimalizált megjelenéssel.",
        result: "Élő weboldal", stack: ["Ingatlanközvetítés", "SEO"], link: "https://adriahaus.eu" },
];

// Pálya – "commit" formában (a hash csak dísz)
export const career = [
    { hash: "c0de2024", date: "2024 márc. – jelenleg", title: "NextVal Kft.", tag: "work",
        desc: "Szoftverfejlesztő. Java és Kotlin alapú, Spring Boot-os mikroszolgáltatásokon és webalkalmazásokon dolgozom Angular felülettel. Az adatréteget Oracle, H2 és Liquibase adja, a fájlokat MinIO tárolja, és Camunda BPM folyamatmotorral is dolgozom.",
        result: "Jelenlegi munkahely", stack: ["Java", "Kotlin", "Spring Boot", "Angular", "Oracle"] },
    { hash: "a9d12023", date: "2023 jún. – 2024 márc.", title: "Datastep Solution", tag: "work",
        desc: "Angular fejlesztőként webes felületeket építettem REST API-kra, Bootstrappel és HTML5-tel. Drupalt is használtam.",
        result: "Első fejlesztői állás", stack: ["Angular", "HTML5", "Bootstrap", "Drupal", "Git"] },
    { hash: "5ze02021", date: "2021 szept. – 2025 jan.", title: "Szegedi Tudományegyetem", tag: "edu",
        desc: "Informatikai BSc diploma (Computer Software Engineering).",
        result: "Diploma megszerezve", stack: ["Szoftverfejlesztés", "OOP"] },
    { hash: "109c2021", date: "2021 jún. – 2023 jún.", title: "Logiscool", tag: "teach",
        desc: "Programozás-oktató: fiatalokat tanítottam programozni.",
        result: "2 év oktatói tapasztalat", stack: ["Python", "Scratch"] },
];

// Referenciák – egyelőre üres, a szekció így nem jelenik meg.
// Ha kapsz ajánlást, add hozzá: { author: "Név", role: "Beosztás, cég", text: "Szöveg" }
export const reviews = [];