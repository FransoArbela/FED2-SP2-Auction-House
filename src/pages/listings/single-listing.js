import { singleListing } from "../../api/listings/single-listing";
import { formatDate } from "../../utils/fomatDate";
import { loadMultipleImgs } from "../../utils/imageLoader";
import { objectNormalized } from "../../utils/objectNormalized";
import { isActive } from "../../utils/isActiveListing";
import { isAuth } from "../../utils/isAuth.js";


const listingId = new URLSearchParams(window.location.search).get("id");
const rawData = await singleListing(listingId);
const data = rawData.data;

const renderListingContent = () => {
  const urlID = new URLSearchParams(window.location.search).get("id");
  if (!urlID) {
    alert("Listing ID not found");
    return window.history.back();
  }

  const listing = objectNormalized(data, false);

  console.log("Listing data:", listing);

  const listingContent = document.querySelector("#listing-content");
  listingContent.classList = "w-full max-w-4xl";

  // liating header
  const renderListingHeader = (listing, listingContent) => {
    const listingHeader = document.createElement("div");
    listingHeader.id = "listing-header";
    listingHeader.classList = "flex flex-col gap-2 p-4 w-full bg-padding-color mb-2 rounded bg-[image:var(--color-padding-color)] shadow-md";
    listingHeader.innerHTML = `
      <h1 class="text-2xl font-bold">${listing.title}</h1>
      <p>${listing.description}</p>
    `;
    listingContent.appendChild(listingHeader);
  };

  renderListingHeader(listing, listingContent);

  // images container
  renderImages(listing.media, listingContent);

  // info container
  const renderInfo = (listing, listingContent) => {
    const info = document.createElement("div");
    info.id = "info-container";
    info.classList =
      "flex flex-col gap-4 p-4 bg-padding-color flex items-center justify-between flex-row mt-2 rounded bg-[image:var(--color-padding-color)] shadow-md";
    info.innerHTML = `
      <img class="w-18 h-18 rounded-full" src="${listing.seller[0].avatar.url}" alt="${listing.seller[0].name}'s avatar" />
      <div class="flex flex-col items-start">
        <p class="text-fg font-bold">${listing.seller[0].name}</p>
        <p class="text-fg">${listing.seller[0].email}</p>
      </div>
      <div class="flex flex-row">
          <div class="text-fg flex items-center">
            ${isActive(listing.endsAt)}
          </div>
          <p class="rounded py-2 px-2 text-fg">${formatDate(listing.endsAt)}</p>
      </div>
      <div class="text-fg">
     #${listing.count} bid${listing.count !== 1 ? "s" : ""}
      </div>
      <p class="text-fg font-bold">Highest Bid: $${highestBid(listing.bids.bidder.map(bid => bid.amount))}</p>
    ${listingAvailable(listing.endsAt)}
    `;
    listingContent.appendChild(info);
  };

  renderInfo(listing, listingContent);

  // bidders list
  const biddersList = (listing, listingContent) => {
    const extendedInfo = document.createElement("div");
    extendedInfo.id = "extended-info";
    extendedInfo.classList =
      "flex flex-col gap-4 p-4 w-full bg-padding-color mt-4 rounded bg-[image:var(--color-padding-color)] shadow-md";
    extendedInfo.innerHTML = `
      <div>
        <h3 class="text-xl font-bold mb-6">Bidders</h3>
          ${listing.bids.bidder
              .map(
                (bid) => `
        <div class="flex items-center gap-2 border-b border-fuchsia-100">
            <img class="w-12 h-12 rounded-full" src="${bid.avatar.url}" alt="${bid.name}'s avatar" />
          <div class="flex flex-col p-2 rounded">
            <p>$${bid.amount}</p>
            <p class="text-fg font-bold">${bid.name}</p>
          </div>
        </div>`).join("")}
      </div>
    `;
    if (listing.bids.bidder.length === 0) {
      const noBidders = document.createElement("p");
      noBidders.classList = "text-fg";
      noBidders.innerText = "No bidders yet";
      extendedInfo.appendChild(noBidders);
    }
    listingContent.appendChild(extendedInfo);
  };

  biddersList(listing, listingContent);
};


// Images container
const renderImages = (media, container) => {
  const imgsContainer = document.createElement("div");
  imgsContainer.id = "imgs-container";
  imgsContainer.classList =
    "flex gap-4 w-full bg-padding-color p-4 rounded-sm bg-[image:var(--color-padding-color)] shadow-md";
  container.appendChild(imgsContainer);

  loadMultipleImgs(media, imgsContainer);
};


const highestBid = (bids) => {
  const highest = Math.max(...bids);
  if (highest === -Infinity) return 0;
  return highest;
};

const listingAvailable = (date) => {
  const ended = new Date(date)
  if (ended < Date.now()) {
    return `
    <button id="place-bid-btn" class="py-2 px-4 rounded bg-primary text-white hover:bg-primary-hover transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled>
      Place a bid
    </button>`
  } else {
        console.log("Listing has ended");
    return `
    <button id="place-bid-btn" class="py-2 px-4 rounded bg-primary text-white hover:bg-primary-hover transition-colors cursor-pointer">
      Place a bid
    </button>
    `
  }
  
}

renderListingContent();
isAuth();




