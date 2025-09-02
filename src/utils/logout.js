export const logout = (e) => {
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();

  window.location.href = "/";
});
};