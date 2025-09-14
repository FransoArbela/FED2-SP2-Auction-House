export const listingCardNav = () => {
  const listingCard = document.querySelectorAll("[data-listing-card]");
  listingCard.forEach((card) => {
    card.addEventListener("click", (e) => {
      window.location.href = `/pages/listings/single-listing.html?id=${card.id}`;
    });
  });
};
