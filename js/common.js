// Shared helpers used by every page: theme toggle, mobile menu, escaping.

(function () {
  const root = document.body;
  let saved = null;
  try {
    saved = localStorage.getItem("theme");
  } catch (e) {}
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.classList.remove("theme-light", "theme-dark");
  root.classList.add(saved || (prefersDark ? "theme-dark" : "theme-light"));

  const toggle = document.querySelector(".theme-toggle");
  const updateLabel = () => {
    if (!toggle) return;
    const isLight = root.classList.contains("theme-light");
    toggle.textContent = isLight ? "Dark mode" : "Light mode";
    toggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  };
  updateLabel();

  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = root.classList.contains("theme-light") ? "theme-dark" : "theme-light";
      root.classList.remove("theme-light", "theme-dark");
      root.classList.add(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      updateLabel();
    });
  }

  const menuBtn = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (menuBtn && links) {
    menuBtn.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();

window.esc = function (value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};

window.CATEGORY_LABELS = {
  academic: "Academic",
  professional: "Professional",
  award: "Award-winning",
  personal: "Personal",
};

window.EXPERIENCE_LABELS = {
  work: "Work",
  volunteer: "Volunteer",
  lab: "Laboratory",
};

// Card used on the homepage and in "related projects" lists.
window.projectCard = function (p) {
  const cover = p.cover
    ? `<img src="${esc(p.cover.src)}" alt="${esc(p.cover.alt || p.title)}" loading="lazy" />`
    : `<span class="placeholder-cover" aria-hidden="true">${esc(p.title.split(" ").slice(0, 2).map((w) => w[0]).join(""))}</span>`;
  const tags = (p.tags || []).slice(0, 4).map((t) => `<li>${esc(t)}</li>`).join("");
  return `
    <a class="project-card${p.featured ? " featured" : ""}" href="project.html?id=${encodeURIComponent(p.id)}">
      <div class="project-cover">${cover}</div>
      <div class="project-body">
        <div class="project-tag">${esc(CATEGORY_LABELS[p.category] || p.category)}${p.year ? " · " + esc(p.year) : ""}</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        <ul class="chip-list">${tags}</ul>
        <span class="project-link">Read case study →</span>
      </div>
    </a>`;
};
