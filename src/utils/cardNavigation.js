  export const listingCardNav = () => {
    const listingCard = document.querySelectorAll("[data-listing-card]");
    console.log("Listing cards:", listingCard);
    listingCard.forEach((card) => {
      card.addEventListener("click", (e) => {
        window.location.href = `/pages/listings/single-listing.html?id=${card.id}`;
      });
    });
  };
