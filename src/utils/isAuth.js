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

export function isAuthBid() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("#place-bid-btn");
    if (!btn) return; // not the bid button

    const token = localStorage.getItem("token");
    if (!token) {
      e.preventDefault();
      e.stopPropagation();
      alert("You must be logged in to place a bid.");
    }
    
  });


}
