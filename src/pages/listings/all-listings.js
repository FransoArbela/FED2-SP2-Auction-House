import { allListings } from "../../api/listings/all-listings";

const state = {
  limit: 40,
  page: 1,
  tag: "",
  active: null,
  seller: true,
  bids: false,
  sort: "created",
  sortOrder: "desc",
  search: "",
};

const loadAndRender = async () => {
  const data = await allListings(state);
  displayListings(data);
};

const displayListings = async (listingData) => {
  const listings = listingData.data.map((item) => ({
    id: item.id,
    count: {
      bids: item._count.bids,
    },
    description: item.description,
    title: item.title,
    tags: item.tags?.map((tag) => tag) || [],
    media: [
      {
        url: item.media?.[0]?.url,
        alt: item.media?.[0]?.alt,
      },
    ],

    created: item.created,
    endsAt: item.endsAt,
    updated: item.updated,
    seller: {
      name: item.seller.name,
      email: item.seller.email,
      avatar: {
        url: item.seller.avatar?.url,
        alt: item.seller.avatar?.alt,
      },
    },
  }));

  const listingContent = document.getElementById("listing-content");
  listingContent.innerHTML = "";
  listings.forEach((listing) => {
    const listingElement = document.createElement("div");
    listingElement.dataset.id = listing.id;
    listingElement.classList.add(
      "listing",
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

    ${loadImg(listing.media[0].url, listing.media[0].alt)}

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
    <h3 class="text-base font-semibold  line-clamp-1">${listing.title}</h3>
    <p class="mt-1 text-sm  line-clamp-2">
      ${listing.description}
    </p>
    <p class="text-sm text-gray-400">@${listing.seller.name}</p>
  </div>

  <!-- Tags -->
  <div class=" flex align-center justify-start">
    <div class="flex items-center gap-1">
      <label>Tags:</label>
      <div class=" flex align-center gap-1">
        ${listing.tags
          .map(
            (tag) =>
              `<span class="px-1 py-0.5 rounded bg-slate-700 text-slate-200 text-xs">${tag}</span>`
          )
          .join("")}</div>
      </div>
  </div>
</div>

  <!-- Button -->
  <div class="flex flex-col justify-center">
    <button class="w-fit text-primary hover:text-primary-hover font-medium py-2 cursor-pointer">
      More Details
    </button>
  </div>
     `;
    listingContent.appendChild(listingElement);
  });
};

const loadImg = (src, alt) => {
  if (!src || src.length === 0) {
    return `
      <img 
        class="inset-0 h-full w-full object-cover object-center rounded-t" 
        src="/placeholder-img.png" 
        alt="image-placeholder" 
      />
    `;
  }

  return `
    <img 
      class="inset-0 h-full w-full object-cover object-center rounded-t" 
      src="${encodeURI(src)}" 
      alt="${alt || "listing image"}"
      onerror="this.onerror=null;this.src='/placeholder-img.png';"
    />
  `;
};

const isActive = (endsAt) => {
  if (new Date(endsAt) > new Date()) {
    return `<i class="fa-solid fa-circle text-green-500" style="font-size: 0.5rem;"></i>`;
  } else {
    return `<i class="fa-solid fa-circle text-red-500" style="font-size: 0.5rem;"></i>`;
  }
};

const setupToggle = () => {
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

const formatDate = (dateString) => {
  const now = new Date();
  const end = new Date(dateString);
  const diffMs = end - now;

  if (diffMs <= 0) {
    return "Ended";
  }

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);

  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""}`;
  } else {
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""}`;
  }
};

loadAndRender();
