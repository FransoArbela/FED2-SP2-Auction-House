export const logout = (e) => {
const logoutBtn = document.querySelectorAll("#logoutBtn");
logoutBtn.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();

    window.location.href = "/";
  });
});
};