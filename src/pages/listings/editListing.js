import { deleteListing } from "../../api/listings/deleteListing.js";
import { editListing } from "../../api/listings/editListing.js";

export const edit = (listing, listingId) => {
  if (!listing) return;

  document.body.classList.add("no-scroll");

  const editContainer = document.createElement("div");
  editContainer.id = "edit-listing-container";
  editContainer.classList.add(
    "fixed",
    "inset-0",
    "bg-black/60",
    "bg-opacity-50",
    "flex",
    "items-center",
    "justify-center",
    "z-30",
  );
  editContainer.innerHTML = `
          <div id="edit-listing-form" class="bg-[image:var(--color-padding-color)] backdrop-blur-[100px] max-h-[80vh] custom-scroll overflow-y-auto inset-0 opacity-90 flex flex-col p-6 rounded-lg shadow-md max-w-screen-lg w-full text-white items-center  relative">
            <button id="close-edit-btn" type="button" class="self-end absolute cursor-pointer mb-4 text-fg hover:text-primary-hover w-fit h-fit px-4 py-2 rounded z-20">Close</button>
            <form class=" max-w-[25rem] justify-center flex flex-col h-full">
                <h2 class="text-2xl font-semibold text-fg mb-4">Edit Listing</h2>
                <label for="title" class="block text-fg mb-2">Title:</label>
                <input type="text" id="title" value="${
                  listing.title
                }" class="border text-fg border-fg p-2 rounded mb-4" />
                <label for="description" class="block text-fg mb-2">Description:</label>
                <textarea id="description" class="border text-fg min-h-[5rem] border-fg p-2 rounded mb-4">${
                  listing.description
                }</textarea>

                 <div id="saved-images-container" class="mb-4 flex flex-wrap gap-2 custom-scroll border border-fg p-2 overflow-y-auto min-h-40">
                 </div>
                
                <label for="image" class="block text-fg mb-2">Image URL:</label>
                <input type="url" id="image" value="${
                  listing.media[0]?.url || ""
                }" class="border text-fg border-fg p-2 rounded mb-4" />
                <label for="bannerAlt" class="block text-fg mb-2">Image Alt Text:</label>
                <input type="text" id="bannerAlt" value="${
                  listing.media[0]?.alt || ""
                }" class="border text-fg border-fg p-2 rounded mb-4" />

                <button type="submit" id="save-changes-btn" class="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded cursor-pointer mt-4">Save Changes</button>
                <button type="button" id="delete-btn" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer mt-4">Delete</button>
                </form>
          </div>
        `;

  const savedImagesContainer = editContainer.querySelector(
    "#saved-images-container"
  );
  savedImagesContainer.innerHTML = "";
  if (listing.media && listing.media.length > 0) {
    listing.media.forEach((image) => {
      const images = `
      <div id="${
        listing.id
      }" data-listing-el class="border border-fg flex flex-wrap p-2 rounded mb-2">
         <input data-image-url class="max-w-xs border p-2 border-fg text-fg text-sm truncate" value="${
           image.url
         }"/>
         <input data-image-alt class="border border-fg p-2 text-fg text-sm" value="${
           image.alt || ""
         }"/>
         <button type="button" data-remove-btn class=" text-red-500 hover:text-red-700 py-1 rounded cursor-pointer mt-2">Remove</button>
      </div>
      `;
      const removeButtons =
        savedImagesContainer.querySelectorAll("[data-remove-btn]");
      removeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const listingElement = e.target.closest("[data-listing-el]");
          if (listingElement) {
            listingElement.remove();
          }
        });
      });

      const imgElement = document.createElement("div");
      imgElement.insertAdjacentHTML("beforeend", images);
      savedImagesContainer.appendChild(imgElement);
    });
  }

  const saveChangesBtn = editContainer.querySelector("#save-changes-btn");
  saveChangesBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const savedImages = editContainer.querySelectorAll("[data-listing-el]");

    const title = editContainer.querySelector("#title").value;
    const description = editContainer.querySelector("#description").value;
    const listingData = {
      title,
      description,
      media: [...savedImages].map((img) => ({
        url: img.querySelector("[data-image-url]").value,
        alt: img.querySelector("[data-image-alt]").value,
      })),
    };

    editListing(listingData, listingId);
  });

  const closeButton = editContainer.querySelector("#close-edit-btn");
  closeButton.addEventListener("click", () => {
    document.body.removeChild(editContainer);
    document.body.classList.remove("no-scroll");
  });

  const deleteButton = editContainer.querySelector("#delete-btn");
  deleteButton.addEventListener("click", () => {
    deleteListing(listingId);
    document.body.removeChild(editContainer);
    document.body.classList.remove("no-scroll");
  });

  document.body.appendChild(editContainer);
};
