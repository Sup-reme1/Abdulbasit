// Renders a single project or experience from the ?id= query parameter.
// project.html?id=<project id>   experience.html?id=<experience id>

(function () {
  const page = document.body.dataset.page; // "project" | "experience"
  const id = new URLSearchParams(location.search).get("id");
  const mount = document.querySelector("[data-detail]");
  const { projects, experience } = window.PORTFOLIO;

  const list = page === "project" ? projects : experience;
  const index = list.findIndex((item) => item.id === id);
  const item = list[index];

  const paragraphs = (value) =>
    (Array.isArray(value) ? value : [value]).map((t) => `<p>${esc(t)}</p>`).join("");

  const bullets = (items) => `<ul class="detail-list">${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;

  const section = (heading, body, id) =>
    body ? `<section class="detail-section"${id ? ` id="${id}"` : ""}><h2>${heading}</h2>${body}</section>` : "";

  const has = (v) => (Array.isArray(v) ? v.length > 0 : Boolean(v));

  if (!item) {
    document.title = "Not found · Ajibowu Abdulbasit";
    mount.innerHTML = `
      <div class="container detail-empty">
        <h1>Not found</h1>
        <p class="lead">No ${page} matches “${esc(id || "")}”.</p>
        <a class="btn primary" href="index.html#${page === "project" ? "projects" : "experience"}">See all ${page === "project" ? "projects" : "experience"}</a>
      </div>`;
    return;
  }

  const prev = list[(index - 1 + list.length) % list.length];
  const next = list[(index + 1) % list.length];
  const label = (x) => x.title || x.role;
  const pager = `
    <nav class="pager" aria-label="More ${page === "project" ? "projects" : "experience"}">
      <a href="${page}.html?id=${encodeURIComponent(prev.id)}"><span>← Previous</span>${esc(label(prev))}</a>
      <a href="${page}.html?id=${encodeURIComponent(next.id)}" class="next"><span>Next →</span>${esc(label(next))}</a>
    </nav>`;

  if (page === "project") {
    const p = item;
    document.title = `${p.title} · Ajibowu Abdulbasit`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", p.summary || p.subtitle || "");

    const highlights = has(p.highlights)
      ? `<div class="stat-row">${p.highlights
          .map((h) => `<div class="stat"><span class="stat-value">${esc(h.value)}</span><span class="stat-label">${esc(h.label)}</span></div>`)
          .join("")}</div>`
      : "";

    const approach = has(p.approach)
      ? `<div class="approach-grid">${p.approach
          .map((a) => `<article class="approach-card"><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></article>`)
          .join("")}</div>`
      : "";

    const code = p.code
      ? `<figure class="code-block"><pre><code>${esc(p.code.content)}</code></pre>${
          p.code.caption ? `<figcaption>${esc(p.code.caption)}</figcaption>` : ""
        }</figure>`
      : "";

    let gallery = "";
    if (has(p.gallery)) {
      const groups = [...new Set(p.gallery.map((g) => g.group || "Gallery"))];
      gallery = groups
        .map((g) => {
          const imgs = p.gallery.filter((x) => (x.group || "Gallery") === g);
          return `
            ${groups.length > 1 ? `<h3 class="gallery-heading">${esc(g)}</h3>` : ""}
            <div class="gallery">${imgs
              .map(
                (x) => `
                <figure>
                  <button type="button" class="gallery-item" data-full="${esc(x.src)}" data-caption="${esc(x.caption || "")}">
                    <img src="${esc(x.src)}" alt="${esc(x.caption || p.title)}" loading="lazy" />
                  </button>
                  ${x.caption ? `<figcaption>${esc(x.caption)}</figcaption>` : ""}
                </figure>`
              )
              .join("")}</div>`;
        })
        .join("");
    }

    const docs = [...(p.documents || []), ...(p.links || [])];
    const docLinks = has(docs)
      ? `<div class="doc-links">${docs
          .map((d) => `<a class="doc-link" href="${esc(d.href)}" target="_blank" rel="noopener">${esc(d.label)}</a>`)
          .join("")}</div>`
      : "";

    const meta = [
      p.role && ["Role", p.role],
      p.year && ["Year", p.year],
      p.category && ["Type", CATEGORY_LABELS[p.category] || p.category],
    ].filter(Boolean);

    mount.innerHTML = `
      <header class="detail-hero">
        <div class="container">
          <a class="back-link" href="index.html#projects">← All projects</a>
          <span class="eyebrow">${esc(CATEGORY_LABELS[p.category] || "")} project</span>
          <h1>${esc(p.title)}</h1>
          ${p.subtitle ? `<p class="lead">${esc(p.subtitle)}</p>` : ""}
          <dl class="detail-meta">${meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
          ${has(p.tags) ? `<ul class="chip-list">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
          ${docLinks}
        </div>
      </header>
      ${p.cover ? `<div class="container"><img class="detail-cover" src="${esc(p.cover.src)}" alt="${esc(p.cover.alt || p.title)}" /></div>` : ""}
      <div class="container detail-body">
        ${highlights}
        ${p.context ? `<p class="context-note">${esc(p.context)}</p>` : ""}
        ${section("Overview", p.summary && paragraphs(p.summary))}
        ${section("The problem", has(p.problem) && paragraphs(p.problem))}
        ${section("Objectives", has(p.objectives) && bullets(p.objectives))}
        ${section("Approach", approach)}
        ${section("Code", code)}
        ${section("Results", has(p.results) && bullets(p.results))}
        ${section("Challenges", has(p.challenges) && bullets(p.challenges))}
        ${section("What I learned", has(p.learnings) && bullets(p.learnings))}
        ${section("Future work &amp; research directions", has(p.futureWork) && bullets(p.futureWork))}
        ${section("Gallery", gallery, "gallery")}
        ${section("Documentation", docLinks)}
        ${section("Skills demonstrated", has(p.skills) && `<ul class="chip-list">${p.skills.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`)}
        ${pager}
      </div>
      <div class="lightbox" hidden>
        <button type="button" class="lightbox-close" aria-label="Close image">×</button>
        <img alt="" />
        <p class="lightbox-caption"></p>
      </div>`;

    const lightbox = mount.querySelector(".lightbox");
    const lbImg = lightbox.querySelector("img");
    const lbCap = lightbox.querySelector(".lightbox-caption");
    const close = () => (lightbox.hidden = true);
    mount.addEventListener("click", (e) => {
      const btn = e.target.closest(".gallery-item");
      if (btn) {
        lbImg.src = btn.dataset.full;
        lbImg.alt = btn.dataset.caption;
        lbCap.textContent = btn.dataset.caption;
        lightbox.hidden = false;
        lightbox.querySelector(".lightbox-close").focus();
      } else if (e.target === lightbox || e.target.classList.contains("lightbox-close")) {
        close();
      }
    });
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());
    return;
  }

  // Experience page
  const x = item;
  document.title = `${x.role} · ${x.org} · Ajibowu Abdulbasit`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", `${x.role} at ${x.org}. ${x.summary || ""}`);

  const related = (x.relatedProjects || []).map((pid) => projects.find((p) => p.id === pid)).filter(Boolean);

  mount.innerHTML = `
    <header class="detail-hero">
      <div class="container">
        <a class="back-link" href="index.html#experience">← All experience</a>
        <span class="eyebrow">${esc(EXPERIENCE_LABELS[x.type] || x.type)} experience</span>
        <h1>${esc(x.role)}</h1>
        <p class="lead">${esc(x.org)}</p>
        <dl class="detail-meta"><div><dt>Period</dt><dd>${esc(x.start)} – ${esc(x.end)}</dd></div></dl>
      </div>
    </header>
    <div class="container detail-body">
      ${section("Overview", x.summary && paragraphs(x.summary))}
      ${section("Context", has(x.context) && paragraphs(x.context))}
      ${section("Responsibilities", has(x.responsibilities) && bullets(x.responsibilities))}
      ${section("Key contributions &amp; achievements", has(x.achievements) && bullets(x.achievements))}
      ${section("Skills applied", has(x.skills) && `<ul class="chip-list">${x.skills.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`)}
      ${section("Related projects", has(related) && `<div class="projects-grid">${related.map(projectCard).join("")}</div>`)}
      ${pager}
    </div>`;
})();
