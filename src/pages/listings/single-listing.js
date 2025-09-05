import { isAuth } from "../../utils/isAuth.js";
import { singleListing } from "../../api/listings/single-listing";
import { formatDate } from "../../utils/fomatDate";
import { loadMultipleImgs } from "../../utils/imageLoader";
import { objectNormalized } from "../../utils/objectNormalized";
import { isActive } from "../../utils/isActiveListing";
import { placeBid } from "../../api/listings/placeBid.js";

const renderAndLoad = async () => {
  const listingId = new URLSearchParams(window.location.search).get("id");
  const rawData = await singleListing(listingId);
  const data = rawData.data;
  const listingContent = document.querySelector("#listing-content");
  listingContent.classList = "w-full max-w-4xl relative";
  const listing = objectNormalized(data);
  renderListingContent(listing, listingContent);
};

export const renderListingContent = async (listing, listingContent) => {
  const urlID = new URLSearchParams(window.location.search).get("id");
  if (!urlID) {
    alert("Listing ID not found");
    return window.history.back();
  }

  // listing header
  const renderListingHeader = async (listing, listingContent) => {
    const listingHeader = document.createElement("div");
    listingHeader.id = "listing-header";
    listingHeader.classList =
      "flex flex-col gap-2 p-4 w-full bg-padding-color mb-2 rounded bg-[image:var(--color-padding-color)] shadow-md";
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
      "flex flex-col items-end p-4 bg-padding-color mt-2 rounded bg-[image:var(--color-padding-color)] shadow-md";
    info.innerHTML = `
     <div class="flex gap-4 justify-between flex-row w-full items-center">
      <img class="w-18 h-18 rounded-full" src="${
        listing.seller[0].avatar.url
      }" alt="${listing.seller[0].name}'s avatar" />
      <div class="flex flex-col items-start">
        <p class="text-fg font-bold">${listing.seller[0].name}</p>
        <p id="seller-email" class="text-fg">${listing.seller[0].email}</p>
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
      <p class="text-fg font-bold">Highest Bid: $${highestBid(
        listing.bids.bidder.map((bid) => bid.amount)
      )}</p>
    ${generateButton(listing)}
     </div>
     <div class="flex gap-4 justify-end mt-4 w-full">
     </div>
     <input type="number" step="1" id="bid-input" class="w-35 border hidden border-gray-300 p-2 rounded" placeholder="Enter your bid"/>
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
        </div>`
            )
            .join("")}
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

  const handlePlaceBid = () => {
    const placeBidBtn = document.getElementById("place-bid-btn");
    const bidInput = document.getElementById("bid-input");

    if (!placeBidBtn || !bidInput) return;

    placeBidBtn.addEventListener("click", async () => {
      if (bidInput.classList.contains("hidden")) {
        bidInput.classList.remove("hidden");
        bidInput.focus();
        return;
      }

      const value = bidInput.value.trim();
      if (value > 0) {
        const urlParams = new URLSearchParams(window.location.search);
        const listingId = urlParams.get("id");
        placeBid(value, listingId);
      }
      if (!value || value <= 0) {
        console.error("Invalid bid value");
      }
    });
    document.addEventListener("click", (e) => {
      const clickedOutside =
        !bidInput.contains(e.target) && !placeBidBtn.contains(e.target);
      if (clickedOutside && !bidInput.value.trim()) {
        bidInput.classList.add("hidden");
      }
    });
  };
  handlePlaceBid();
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
  console.log(date);
  const ended = new Date(date);
  if (ended < Date.now()) {
    return `disabled:opacity-50 disabled:cursor-not-allowed" disabled`;
  } else {
    return "";
  }
};

const generateButton = (listing) => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  const sellerEmail = listing.seller[0].email;

  if (profile && profile.email === sellerEmail) {
    return ``;
  }

  return `<button id="place-bid-btn" class="${listingAvailable(
    listing.endsAt
  )} py-2 px-4 rounded bg-primary text-white hover:bg-primary-hover transition-colors cursor-pointer">Place a bid</button>`;
};

renderAndLoad();
isAuth();
