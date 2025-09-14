import { profileDetails } from "../../utils/objectNormalizedProfile.js";
import { editProfile } from "./editProfile.js";
import { isActive } from "../../utils/isActiveListing.js";
import { newListing } from "../listings/createListing.js";
import { getBiddedListings } from "../../api/profiles/getBiddedListings.js";
import { getWinListings } from "../../api/profiles/getWinListings.js";
import { edit } from "../listings/editListing.js";
import { listingCardNav } from "../../utils/cardNavigation.js";

export const renderProfile = (profileData) => {
  const user = profileDetails(profileData);

  const profileContainer = document.getElementById("profile-container");
  profileContainer.classList.add(
    "shadow-md",
    "mx-auto",
    "p-6",
    "rounded-lg",
    "w-full",
    "backdrop-blur-[100px]",
    "bg-[image:var(--color-padding-color)/10]",
    "mb-10"
  );
  profileContainer.innerHTML = `

      <div class="flex flex-col relative items-center mb-6 space-y-4 ">
        <button id="edit-profile-btn" class="absolute right-4 top-4 cursor-pointer text-white bg-gray-300/50 hover:bg-white/80 hover:text-gray-500 px-2 py-1 rounded z-20">Edit</button>
          <img src="${user.banner.url}" alt="${user.banner.alt}" class="w-full max-h-96 object-cover rounded-lg brightness-75" />
          <img src="${user.avatar.url}" alt="${user.avatar.alt}" class="w-34 h-34 rounded-full absolute -bottom-5 border-4 border-white" />
        </div>

        <div class="text-center mt-10 mb-6 space-y-2">
         <h1 class="font-semibold text-2xl">${user.name}</h1>
         <p class="text-fg">${user.email}</p>
         <p class="text-fg">${user.bio}</p>
        </div>

        <div class="flex flex-row gap-2 justify-center text-center">
          <p class="text-fg">Balance: ${user.credit}</p>
          <p class="text-fg">Listings: ${user.count.listings}</p>
          <p class="text-fg">Wins: ${user.count.wins}</p>
        </div>
    `;

  editProfile(user.avatar, user.banner, user.bio);

  const renderListings = async () => {
    const listingsContainer = document.createElement("div");
    listingsContainer.classList.add(
      "listings-container",
      "border-t-2",
      "pt-4",
      "mt-8"
    );
    listingsContainer.innerHTML = `
          <div class="flex flex-row justify-between mb-2 mt-2 items-center">
          <h2 class="text-2xl font-semibold mb-2">Your Listings (${user.count.listings})</h2>
          <button id="create-listing-btn" class="bg-primary text-white px-4 py-2 xxs:text-sm xxs:px-1 cursor-pointer rounded hover:bg-primary-hover">Create New Listing</button>
          </div>

          <div id="listings-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          `;

    const listings = user.listings;
    if (listings.length === 0) {
      const noListingsMessage = document.createElement("p");
      noListingsMessage.classList.add(
        "text-fg",
        "text-center",
        "col-span-full"
      );
      noListingsMessage.textContent = "No listings available.";
      listingsContainer.appendChild(noListingsMessage);
    }
    listings.forEach((listing) => {
      const listingCard = document.createElement("div");
      listingCard.setAttribute("data-listing-card", "");
      listingCard.classList.add(
        "bg-[image:var(--color-padding-color)]",
        "rounded",
        "shadow-md",
        "overflow-hidden",
        "hover:shadow-lg",
        "transition-shadow",
        "duration-300",
        "p-4",
        "cursor-pointer",
        "hover:bg-[image:var(--color-card-hover)]",
        "relative"
      );
      listingCard.id = `${listing.id}`;
      listingCard.innerHTML = `
        <div class="block h-full w-full">
          <img src="${
            listing.media[0]?.url || "../../../public/placeholder-img.png"
          }" alt="${
        listing.media[0]?.alt || "Listing Image"
      }" class="w-full h-48 object-cover rounded mb-4" />
          <button id="edit-listing-btn" class="absolute right-6 top-6 cursor-pointer text-white bg-gray-300/50 hover:bg-white/80 hover:text-gray-500 w-fit h-fit px-2 py-1 rounded z-20">Edit</button>
          <h3 class="font-semibold items-center text-xl mb-2">${
            listing.title
          }</h3>
          <p class="text-fg/80 mb-2">${listing.description}</p>
          <div class="flex flex-row items-center gap-1">
        <p class="text-fg/80 text-sm items-center font-semibold">Created: ${new Date(
          listing.created
        ).toLocaleDateString()}</p>
        ${isActive(listing.endsAt)}
          </div>
        </div>
      `;

      const editButton = listingCard.querySelector("#edit-listing-btn");
      editButton.addEventListener("click", (e) => {
        e.stopPropagation();
        edit(listing, listingCard.id);
      });

      const listingGrid = listingsContainer.querySelector("#listings-grid");
      listingGrid.appendChild(listingCard);
    });

    profileContainer.appendChild(listingsContainer);

    const involvedListings = async () => {
      const myBiddedListings = await getBiddedListings();
      const involvedContainer = document.createElement("div");

      involvedContainer.classList.add(
        "involved-container",
        "border-t-2",
        "pt-4",
        "mt-8"
      );
      involvedContainer.innerHTML = `
            <h2 class="text-2xl font-semibold mb-4 mt-6">Listings You're Involved In (${myBiddedListings.length})</h2>
            <div id="involved-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            `;

      if (myBiddedListings.length === 0) {
        const noInvolvedMessage = document.createElement("p");
        noInvolvedMessage.classList.add(
          "text-fg",
          "text-center",
          "col-span-full"
        );
        noInvolvedMessage.textContent = "No listings available.";
        involvedContainer.appendChild(noInvolvedMessage);
      } else {
        myBiddedListings.forEach((listing) => {
          const listingCard = document.createElement("div");
          listingCard.setAttribute("data-listing-card", "");
          listingCard.id = `${listing.listing.id}`;
          listingCard.classList.add(
            "bg-[image:var(--color-padding-color)]",
            "rounded",
            "shadow-md",
            "overflow-hidden",
            "hover:shadow-lg",
            "transition-shadow",
            "duration-300",
            "p-4",
            "cursor-pointer",
            "hover:bg-[image:var(--color-card-hover)]"
          );
          listingCard.innerHTML = `
                <div><img src="${
                  listing.listing.media[0]?.url ||
                  "../../../public/placeholder-img.png"
                }" alt="${
            listing.listing.media[0]?.alt || "Listing Image"
          }" class="w-full h-48 object-cover rounded mb-4" />
        <h3 class="font-semibold items-center text-xl  mb-2">${
          listing.listing.title
        }</h3>

        <p class="text-fg/80 mb-2">${listing.listing.description}</p>

        <div class="flex flex-row items-center gap-1">
        <p class="text-fg/80 text-sm items-center font-semibold">Created: ${new Date(
          listing.listing.created
        ).toLocaleDateString()}</p>
          ${isActive(listing.listing.endsAt)}</div>
              </div>`;

          const involvedGrid =
            involvedContainer.querySelector("#involved-grid");
          involvedGrid.appendChild(listingCard);
        });
      }
      profileContainer.appendChild(involvedContainer);
    };

    const renderWinListings = async () => {
      const myWinListings = await getWinListings();
      const winContainer = document.createElement("div");

      winContainer.classList.add("win-container", "border-t-2", "pt-4", "mt-8");
      winContainer.innerHTML = `
            <h2 class="text-2xl font-semibold mb-4 mt-6">Your Won Listings (${myWinListings.length})</h2>
            <div id="win-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            `;

      if (myWinListings.length === 0) {
        const noWinMessage = document.createElement("p");
        noWinMessage.classList.add("text-fg", "text-center", "col-span-full");
        noWinMessage.textContent = "No winning listings available.";
        winContainer.appendChild(noWinMessage);
      } else {
        myWinListings.forEach((listing) => {
          const listingCard = document.createElement("div");
          listingCard.setAttribute("data-listing-card", "");
          listingCard.id = `${listing.id}`;
          listingCard.classList.add(
            "bg-[image:var(--color-padding-color)]",
            "rounded",
            "shadow-md",
            "overflow-hidden",
            "hover:shadow-lg",
            "transition-shadow",
            "duration-300",
            "p-4",
            "cursor-pointer",
            "hover:bg-[image:var(--color-card-hover)]"
          );
          listingCard.innerHTML = `
              <div><img src="${
                listing.media[0]?.url || "../../../public/placeholder-img.png"
              }" alt="${
            listing.media[0]?.alt || "Listing Image"
          }" class="w-full h-48 object-cover rounded mb-4" />
        <h3 class="font-semibold items-center text-xl  mb-2">${
          listing.title
        }</h3>

        <p class="text-fg/80 mb-2">${listing.description}</p>

        <div class="flex flex-row items-center gap-1">
        <p class="text-fg/80 text-sm items-center font-semibold">Created: ${new Date(
          listing.created
        ).toLocaleDateString()}</p>
          ${isActive(listing.endsAt)}</div>
              </div>`;

          const winGrid = winContainer.querySelector("#win-grid");
          winGrid.appendChild(listingCard);
        });
      }
      profileContainer.appendChild(winContainer);
    };

    await newListing();
    await involvedListings();
    await renderWinListings();
    listingCardNav();
  };

  renderListings();
};
