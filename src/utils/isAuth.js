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


export const isAuthBid = () => {
  const token = localStorage.getItem("token");
  const placeBidBtn = document.getElementById("place-bid-btn");

  placeBidBtn.addEventListener("click", (e) => {
    if (!token) {
      e.preventDefault();
        alert("You must be logged in to place a bid.");
    }
  });
}