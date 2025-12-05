/* script.js
   Interactive behaviors:
   - populate dynamic data
   - smooth scroll
   - reveal on scroll
   - nav active state
   - modal for projects
   - theme toggle with localStorage
   - contact form handler (mailto)
*/

(() => {
  // ---- Data (populated from your CV) ----
  const DATA = {
    name: "Dimas Fakhri Bahtiar Rifai",
    role: "Digital Content Writer & Copywriter",
    contact: {
      email: "dimasfakhrioke@gmail.com",
      phone: "+62895429299919",
      linkedin: "https://www.linkedin.com/in/dimas-fakhri-bahtiar-rifai-4a58b8212/",
      portfolio: "https://rawdeedigital.com/"
    },
    experience: [
      {
        role: "Copywriter & Social Media Specialist (Contract)",
        org: "Rawdee Digital Agency",
        location: "Bintaro, Indonesia",
        period: "April 2025 - Present",
        bullets: [
          "Produce ad copy, captions, and video scripts matching brand tone of voice.",
          "Design social calendars and run routine posting & engagement.",
          "Monitor content performance and translate insights into strategy."
        ]
      },
      {
        role: "Copywriter (Intern) ",
        org: "Remotivi",
        location: "Jakarta",
        period: "Oct 2024 - Feb 2025",
        bullets: [
          "Ideated and wrote campaign copy for NGO SAFEnet on digital issues.",
          "Produced captions and campaign pillars for digital advocacy."
        ]
      },
      {
        role: "Book Copy Editor (Intern to Freelancer)",
        org: "Penerbit Buku Kompas",
        location: "Jakarta",
        period: "May 2023 - Dec 2023",
        bullets: [
          "Proofread and edited manuscripts for grammar, punctuation, and consistency.",
          "Collaborated with authors and designers for final quality control."
        ]
      },
      {
        role: "Content Writer / Copywriter (Intern to Freelancer) ",
        org: "Penerbit Mizan",
        location: "Bandung",
        period: "Feb 2022 - Feb 2023",
        bullets: [
          "Wrote book reviews, campaign copy, sales letters, and social media copy.",
          "Wrote articles, ads copy, and video script for assisting digital campaign."
        ]
      }
    ],
    skills: [
      { name: "Content Writing", level: "Expert" },
      { name: "Copywriting", level: "Expert" },
      { name: "SEO & Ahrefs/Semrush", level: "Advanced" },
      { name: "Editing & Proofreading", level: "Advanced" },
      { name: "Social Media Strategy", level: "Advanced" },
      { name: "WordPress / CMS", level: "Intermediate" },
      { name: "Canva & Visuals", level: "Intermediate" }
    ],
    projects: [
      {
        id: "proj-safenet",
        title: "Amnesty UIN Jakarta: HROP Project",
        desc: "Led book theme planning, edited contributor drafts per PUEBI, and guided manuscript development through collaborative discussions.",
        meta: "Editorial Planning, Manuscript Editing, Collaborative Development, Content Structuring",
        links: [
          { label: "Campaign Doc", url: "https://www.instagram.com/p/ChRli5ILlma/" }
        ]
      },
      {
        id: "proj-mizan",
        title: "Bubs Design Marketing Campaign",
        desc: "Supported campaign planning and execution for Bub’s Design while learning SEO, copywriting, and brand strategy.",
        meta: "Digital Marketing, Content Creation, Social Media Management, and Visual Design.",
        links: [
          { label: "Campaign Doc", url: "https://docs.google.com/presentation/d/1FshQqHujZnTMD3JA-A511-i6PQ7r2r36btbS9F6raUI/edit?usp=sharing" }
        ]
      },
      {
        id: "proj-kompas",
        title: "Book Editing — Kompas Publishing",
        desc: "Proofreading and editorial corrections for book titles to ensure publication-quality output.",
        meta: "Freelance (Sep 2023 - Dec 2023).",
        links: [
          { label: "Campaign Doc (example)", url: "https://example.com" }
        ]
      }
    ]
  };

  // ---- Basic utilities & element refs ----
  const qs = (s, el=document) => el.querySelector(s);
  const qsa = (s, el=document) => Array.from(el.querySelectorAll(s));
  const container = (sel) => qs(sel);

  // fill experience
  const experienceList = qs("#experience-list");
  DATA.experience.forEach(item => {
    const div = document.createElement("article");
    div.className = "timeline-item";
    div.innerHTML = `
      <div class="timeline-date">${escapeHtml(item.period)}</div>
      <div class="timeline-body">
        <h4>${escapeHtml(item.role)}</h4>
        <div class="muted">${escapeHtml(item.org)} • ${escapeHtml(item.location)}</div>
        <p style="margin-top:10px">${item.bullets.map(b => escapeHtml(b)).join("<br>")}</p>
      </div>
    `;
    experienceList.appendChild(div);
  });

  // fill skills
  const skillsGrid = qs("#skills-grid");
  DATA.skills.forEach(s => {
    const el = document.createElement("div");
    el.className = "skill";
    el.innerHTML = `<div class="skill-name">${escapeHtml(s.name)}</div><div class="level muted">${escapeHtml(s.level)}</div>`;
    skillsGrid.appendChild(el);
  });

  // fill projects
  const projectsGrid = qs("#projects-grid");
  DATA.projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.tabIndex = 0;
    card.setAttribute("data-id", p.id);
    card.innerHTML = `<h4>${escapeHtml(p.title)}</h4><p class="muted">${escapeHtml(p.meta)}</p>`;
    card.addEventListener("click", () => openProjectModal(p));
    card.addEventListener("keypress", (e) => { if (e.key === "Enter") openProjectModal(p); });
    projectsGrid.appendChild(card);
  });

  // year
  qs("#year").textContent = new Date().getFullYear();

  // ---- Modal handling ----
  const modal = qs("#project-modal");
  const modalTitle = qs("#modal-title");
  const modalDesc = qs("#modal-desc");
  const modalMeta = qs("#modal-meta");
  const modalLinks = qs("#modal-links");
  const modalClose = qs("#modal-close");

  function openProjectModal(p) {
    modal.setAttribute("aria-hidden","false");
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.desc;
    modalMeta.textContent = p.meta || "";
    modalLinks.innerHTML = "";
    if (p.links && p.links.length) {
      p.links.forEach(l=>{
        const a = document.createElement("a");
        a.href = l.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = l.label;
        a.className = "btn small";
        a.style.marginRight = "8px";
        modalLinks.appendChild(a);
      });
    }
    document.body.style.overflow = "hidden";
  }
  function closeProjectModal() {
    modal.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
  }
  modalClose.addEventListener("click", closeProjectModal);
  modal.addEventListener("click", (e)=>{ if(e.target === modal) closeProjectModal(); });
  document.addEventListener("keydown", (e)=>{ if (e.key === "Escape") closeProjectModal(); });

  // ---- Nav interactions & smooth scroll ----
  const navLinks = qsa(".nav-list a");
  navLinks.forEach(a=>{
    a.addEventListener("click", (ev)=>{
      ev.preventDefault();
      const target = document.getElementById(a.getAttribute("href").slice(1));
      if (target) {
        target.scrollIntoView({behavior:"smooth", block:"start"});
        closeMobileNav();
      }
    });
  });

  // scrollspy - set active nav link
  const sections = qsa("main section[id]");
  function onScrollSpy(){
    const y = window.scrollY + 120;
    let currentId = sections[0].id;
    for (const s of sections){
      if (s.offsetTop <= y) currentId = s.id;
    }
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`));
  }
  window.addEventListener("scroll", throttle(onScrollSpy, 150));
  onScrollSpy();

  // reveal on scroll with IntersectionObserver
  const reveals = qsa(".reveal");
  const io = new IntersectionObserver((entries)=>{
    for (const e of entries){
      if (e.isIntersecting) e.target.classList.add("visible");
    }
  }, {threshold:0.12});
  reveals.forEach(r => io.observe(r));

  // nav toggle for mobile
  const navToggle = qs("#nav-toggle");
  const navList = qs("#nav-list");
  navToggle?.addEventListener("click", ()=>{
    const open = navList.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  function closeMobileNav(){ if (navList.classList.contains("open")) { navList.classList.remove("open"); navToggle.setAttribute("aria-expanded","false"); } }

  // resume download: file path is resume.pdf (replace with your file)
  // theme toggle
  const themeBtn = qs("#theme-toggle");
  const htmlEl = document.documentElement;
  const savedTheme = localStorage.getItem("portfolio_theme") || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");
  setTheme(savedTheme);
  themeBtn.addEventListener("click", () => {
    const next = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next);
  });
  function setTheme(t){
    if(t === "dark") htmlEl.setAttribute("data-theme","dark"); else htmlEl.setAttribute("data-theme","light");
    localStorage.setItem("portfolio_theme", t);
    themeBtn.setAttribute("aria-pressed", t === "dark");
  }

  // contact form handler (uses mailto as default)
  window.handleContactSubmit = function(e){
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const from = form.email.value.trim();
    const message = form.message.value.trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${from}\n\n${message}`);
    const mailto = `mailto:${DATA.contact.email}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    return false;
  }

  // tiny typed intro (non-blocking)
  const nameSpan = qs(".name");
  if (nameSpan) {
    const full = DATA.name;
    nameSpan.textContent = "";
    let i = 0;
    const timer = setInterval(()=>{ nameSpan.textContent += full[i++] || ""; if(i>full.length) clearInterval(timer); }, 24);
  }

  // helper: throttle
  function throttle(fn, wait){
    let time = Date.now();
    return function(...args){
      if ((time + wait - Date.now()) < 0){
        fn.apply(this, args);
        time = Date.now();
      }
    };
  }

  // simple HTML escape
  function escapeHtml(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

})();
