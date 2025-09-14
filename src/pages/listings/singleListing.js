import { isAuth } from "../../utils/isAuth.js";
import { singleListing } from "../../api/listings/singleListing.js";
import { formatDate } from "../../utils/fomatDate.js";
import { loadMultipleImgs } from "../../utils/imageLoader.js";
import { objectNormalized } from "../../utils/objectNormalized.js";
import { isActive } from "../../utils/isActiveListing.js";
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
      "flex flex-col gap-2 p-4 w-full mb-2 rounded bg-[image:var(--color-padding-color)] shadow-md";
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
    info.classList = "items-end p-4 mt-2 rounded shadow-md";
    info.innerHTML = `
     <div class="grid grid-cols-2 grid-rows-2  gap-4 w-full items-center">

        <div class="col-span-2 flex gap-4 row-start-1 border-b p-4">
          <img class="w-18 h-18 xxs:w-12 xxs:h-12 rounded-full" src="${
            listing.seller[0].avatar.url
          }" alt="${listing.seller[0].name}'s avatar" />
          <div class="flex flex-col items-start">
            <p class="text-fg font-bold">${listing.seller[0].name}</p>
            <p id="seller-email" class="text-fg xxs:text-sm">${listing.seller[0].email}</p>
          </div>
        </div>

        <div class="col-start-1 row-start-2 border-r">
          <div class="flex flex-row">
            <div class="text-fg flex items-center">
              ${isActive(listing.endsAt)}
            </div>
            <p class="rounded py-2 px-2 text-fg">${formatDate(
              listing.endsAt
            )}</p>
          </div>
          <div class="text-fg">
         #${listing.count} bid${listing.count !== 1 ? "s" : ""}
          </div>
          <p class="text-fg font-bold">Highest Bid: $${highestBid(
            listing.bids.bidder.map((bid) => bid.amount)
          )}</p>
        </div>

     
       <div class="col-start-2 row-start-2 xxs:self-start md:self-center justify-self-center w-full flex flex-col gap-3">
          ${generateButton(listing)}
          <input type="number" step="1" id="bid-input" class=" w-full border hidden border-gray-300 p-2 rounded" placeholder="Enter your bid"/>
       </div>
     </div>
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
            <img class="w-12 h-12 rounded-full" src="${bid.avatar.url}" alt="${
                bid.name
              }'s avatar" />
          <div class="flex flex-col p-2 rounded">
            <p>$${bid.amount}</p>
            <p class="text-fg font-bold">${bid.name}</p>
          </div>
        <p class="text-fg/70 text-sm ml-auto">
          ${new Date(bid.created).toLocaleString(undefined, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
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

    if (!placeBidBtn) return;

    placeBidBtn.addEventListener("click", () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to place a bid.");
        return;
      } else {
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
          alert("Please enter a valid bid amount.");
        }
      }
    });

    // Hide input when clicking outside
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
    " flex flex-col gap-4 w-auto p-4 rounded-sm md:flex-row shadow-md";
  container.appendChild(imgsContainer);

  loadMultipleImgs(media, imgsContainer);
};

const highestBid = (bids) => {
  const highest = Math.max(...bids);
  if (highest === -Infinity) return 0;
  return highest;
};

const listingAvailable = (date) => {
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
  )} py-2 px-4 w-full rounded bg-primary text-white hover:bg-primary-hover transition-colors cursor-pointer">Place a bid</button>`;
};

renderAndLoad();
isAuth();
