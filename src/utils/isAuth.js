export const isAuth = () => {
  const token = localStorage.getItem("token");

  const authElements = document.querySelectorAll("[data-auth]");
  authElements.forEach((el) => {
    if (token) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  });

  const unAuthElements = document.querySelectorAll("[data-unauth]");
  unAuthElements.forEach((el) => {
    if (token) {
      el.classList.add("hidden");
    } else {
      el.classList.remove("hidden");
    }
  });
};
