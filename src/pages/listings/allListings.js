import { allListings } from "../../api/listings/allListings";
import { formatDate } from "../../utils/fomatDate";
import { state } from "../../utils/listingState";
import { loadSingleImg } from "../../utils/imageLoader";
import { objectNormalized } from "../../utils/objectNormalized";
import { isActive } from "../../utils/isActiveListing";

export const loadAndRender = async () => {
  const data = await allListings(state);
  displayListings(data);
};

const displayListings = async (listingData) => {
  const listings = objectNormalized(listingData.data, true);

  const listingContent = document.getElementById("listing-content");
  listingContent.innerHTML = "";
  listings.forEach((listing) => {
    const listingElement = document.createElement("div");
    listingElement.id = "listing";
    listingElement.dataset.id = listing.id;
    listingElement.classList.add(
      "w-full",
      "p-2",
      "flex",
      "flex-col",
      "justify-between",
      "rounded",
      "shadow-md",
      "cursor-pointer",
      "hover:shadow-lg",
      "hover:bg-card-hover",
      "transition-all",
      "duration-300",
      "ease-in-out",
      "transform",
      "hover:-translate-y-1"
    );
    listingElement.innerHTML = `

<div>
    <!-- Media -->
  <div class="relative w-full aspect-[16/9] overflow-hidden">

    ${loadSingleImg(listing.media[0].url, listing.media[0].alt)}

    <!-- Bid/time overlay -->
    <div class="absolute inset-x-0 bottom-0 flex items-center justify-between p-2">
      <div class="flex items-center align-center bg-black/70 rounded px-2 py-0.5 gap-1">
        <span class="flex justify-center">${isActive(listing.endsAt)}</span>
        <span class="text-sm/5"><i class="fa-solid fa-clock" style="color: #6b7280;"></i></span>
        <span class="text-sm/5 text-white">${formatDate(listing.endsAt)}</span>
        <span class="mb-1 text-muted">|</span>
        <span class="text-muted">Bid</span>
        <span class="text-sm/5 text-white">${listing.count.bids}</span>
      </div>
    </div>
  </div>

  <!-- Info -->
  <div class="py-2">
    <div class="flex justify-between items-center mb-1">
      <h3 class="text-base font-semibold  line-clamp-1">${listing.title}</h3>
      <p class="text-sm text-gray-400">${new Date(
        listing.created
      ).toLocaleDateString("de-DE")}</p>
    </div>
    <p class="mt-1 text-sm  line-clamp-2">
      ${listing.description}
    </p>
    <p class="text-sm text-gray-400">@${listing.seller.name}</p>
  </div>

  <!-- Tags -->
  <div class=" flex align-center justify-start mb-4">
    <div class="flex items-center gap-1">
      <label>Tags:</label>
      <div class=" flex align-center gap-1 flex-wrap">
        ${listing.tags
          .map(
            (tag) =>
              `<span class="px-1 py-0.5 rounded bg-slate-700 text-slate-200 text-xs">${tag}</span>`
          )
          .join("")}</div>
      </div>
  </div>
</div>
     `;
    listingContent.appendChild(listingElement);
  });
};

const setupSearchForm = () => {
  document
    .querySelector("form[name='search-form']")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const value = e.target.search.value;
      const url = new URL(window.location);
      url.searchParams.set("search", value);
      window.history.pushState({}, "", url);
      state.search = value;
      await loadAndRender();
    });
};
setupSearchForm();

const setupSortSelect = () => {
  document
    .querySelector("#sort-select")
    .addEventListener("change", async (e) => {
      const selectedOption = e.target.selectedOptions[0];
      state.sort = selectedOption.value;
      state.sortOrder = selectedOption.dataset.order;
      await loadAndRender();
    });
};
setupSortSelect();

const forwardCard = () => {
  const cards = document.querySelectorAll("#listing-content");
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const closestCard = e.target.closest("#listing");
      if (closestCard) {
        window.location.href = `/pages/listings/single-listing.html?id=${closestCard.dataset.id}`;
      }
    });
  });
};

export const setupToggle = () => {
  const toggle = document.getElementById("toggle");
  const circle = toggle.querySelector("div");

  toggle.addEventListener("click", async () => {
    const isActive = toggle.dataset.active === "true";

    if (isActive) {
      toggle.classList.remove("bg-green-500");
      toggle.classList.add("bg-gray-300");
      circle.classList.remove("translate-x-6");
      toggle.dataset.active = null;
    } else {
      toggle.classList.add("bg-green-500");
      toggle.classList.remove("bg-gray-300");
      circle.classList.add("translate-x-6");
      toggle.dataset.active = "true";
    }

    state.active = state.active ? null : true;
    await loadAndRender();
  });
};

setupToggle();
forwardCard();
loadAndRender();
