(() => {
  const pref = localStorage.getItem("theme"); // "dark" | "light" | null
  const system = matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", pref ? pref === "dark" : system);

  const btn = document.querySelectorAll("[data-theme-toggle]");
  const setIcon = () => btn.forEach(b => b.textContent = document.documentElement.classList.contains("dark") ? "🌞" : "🌙");
  btn.forEach(b => b.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setIcon();
  }));
  setIcon();
})();

