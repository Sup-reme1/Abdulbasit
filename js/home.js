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
