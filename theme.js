(() => {
  const STORAGE_KEY = "project_site_theme";
  const THEMES = ["dark", "light"];

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && THEMES.includes(saved)) return saved;
    const prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    const btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;

    const nextTheme = theme === "dark" ? "light" : "dark";
    btn.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  function setTheme(theme) {
    if (!THEMES.includes(theme)) return;
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  }

  function init() {
    const theme = getPreferredTheme();
    applyTheme(theme);

    const btn = document.querySelector("[data-theme-toggle]");
    if (btn) {
      btn.addEventListener("click", () => {
        const current = document.documentElement.dataset.theme || "dark";
        const next = current === "dark" ? "light" : "dark";
        setTheme(next);
      });
    }

    if (window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: light)");
      mq.addEventListener?.("change", () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && THEMES.includes(saved)) return;
        applyTheme(getPreferredTheme());
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
