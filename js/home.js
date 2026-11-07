// Renders the project grid (with filters) and experience timeline on index.html.

(function () {
  const { projects, experience } = window.PORTFOLIO;

  const grid = document.querySelector("[data-projects]");
  const filters = document.querySelector("[data-filters]");

  const render = (category) => {
    const list = category === "all" ? projects : projects.filter((p) => p.category === category);
    grid.innerHTML = list.map(projectCard).join("");
  };

  if (grid && filters) {
    const used = [...new Set(projects.map((p) => p.category))];
    filters.innerHTML =
      `<button type="button" class="filter active" data-filter="all">All (${projects.length})</button>` +
      used
        .map((c) => {
          const n = projects.filter((p) => p.category === c).length;
          return `<button type="button" class="filter" data-filter="${esc(c)}">${esc(CATEGORY_LABELS[c] || c)} (${n})</button>`;
        })
        .join("");

    filters.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      filters.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
      render(btn.dataset.filter);
    });
    render("all");
  }

  // Design work: shown only once a Google Drive folder link is set in data.js.
  const designSection = document.querySelector("[data-design]");
  const design = window.PORTFOLIO.design;
  if (designSection && design && design.driveUrl) {
    const folder = design.driveUrl.match(/\/folders\/([\w-]+)/);
    const items = (design.items || [])
      .map(
        (d) => `
        <figure>
          <a class="gallery-item" href="${esc(design.driveUrl)}" target="_blank" rel="noopener">
            <img src="${esc(d.src)}" alt="${esc(d.caption || "Design work")}" loading="lazy" />
          </a>
          ${d.caption ? `<figcaption>${esc(d.caption)}</figcaption>` : ""}
        </figure>`
      )
      .join("");
    designSection.querySelector("[data-design-body]").innerHTML = `
      ${design.description ? `<p class="subtle">${esc(design.description)}</p>` : ""}
      ${items ? `<div class="gallery top-gap">${items}</div>` : ""}
      ${
        folder && !items
          ? `<div class="drive-embed top-gap"><iframe src="https://drive.google.com/embeddedfolderview?id=${esc(folder[1])}#grid" title="Design portfolio on Google Drive" loading="lazy"></iframe></div>`
          : ""
      }
      <a class="btn primary drive-btn" href="${esc(design.driveUrl)}" target="_blank" rel="noopener">View the full design portfolio on Google Drive →</a>`;
    designSection.hidden = false;
  }

  const timeline = document.querySelector("[data-experience]");
  if (timeline) {
    timeline.innerHTML = experience
      .map(
        (x) => `
        <a class="timeline-card" href="experience.html?id=${encodeURIComponent(x.id)}">
          <div class="timeline-date">${esc(x.start)} – ${esc(x.end)} · ${esc(EXPERIENCE_LABELS[x.type] || x.type)}</div>
          <h3>${esc(x.role)}</h3>
          <p class="company">${esc(x.org)}</p>
          <p class="subtle">${esc(x.summary)}</p>
          <span class="project-link">View details →</span>
        </a>`
      )
      .join("");
  }
})();
