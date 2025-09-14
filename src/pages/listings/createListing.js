import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { createListing } from "../../api/listings/createListing.js";

export const newListing = () => {
  const createListingBtn = document.querySelector("#create-listing-btn");
  createListingBtn.addEventListener("click", () => {
    document.body.classList.add("no-scroll");
    const newListingContainer = document.createElement("div");
    newListingContainer.id = "new-listing-container";
    newListingContainer.classList.add(
      "fixed",
      "inset-0",
      "bg-black/60",
      "bg-opacity-50",
      "flex",
      "items-center",
      "justify-center",
      "z-30"
    );

    const newListingForm = document.createElement("div");
    newListingForm.id = "new-listing-form";
    newListingForm.classList.add(
      "bg-[image:var(--color-padding-color)]",
      "backdrop-blur-[100px]",
      "inset-0",
      "opacity-90",
      "flex",
      "flex-col",
      "p-6",
      "rounded-lg",
      "h-[80vh]",
      "shadow-md",
      "max-w-screen-lg",
      "w-full",
      "text-white",
      "items-center",
      "relative"
    );
    newListingForm.innerHTML = `
            <button id="close-edit-btn" type="button" class="self-end absolute cursor-pointer mb-4 text-fg hover:text-primary-hover w-fit h-fit px-4 py-2 rounded z-20">Close</button>
            <form class=" w-[25rem] justify-center flex flex-col h-full">
                <h2 class="text-2xl font-semibold text-fg mb-4">Create New Listing</h2>

                <label for="title" class="block text-fg mb-2">Title:</label>
                <input type="text" id="title" placeholder="Enter title" class="border text-fg border-fg p-2 rounded mb-4" />

                <label for="description" class="block text-fg mb-2">Description:</label>
                <textarea id="description" placeholder="Enter description" class="border text-fg min-h-[5rem] border-fg p-2 rounded mb-4"></textarea>

                <div id="saved-images-container" class="mb-4 flex flex-wrap gap-2 overflow-y-auto max-h-40"></div>
                <div class="flex flex-row items-center gap-2">
                 <div>
                   <label for="image" class="block text-fg mb-2">Image:</label>
                   <input type="url" id="image" placeholder="Enter image URL" class="border text-fg border-fg p-2 rounded mb-4" />
                 </div>

                 <div>
                  <label for="bannerAlt" class="block text-fg mb-2">Image Alt Text:</label>
                  <input type="text" id="bannerAlt" placeholder="Enter banner alt text" class="border text-fg border-fg p-2 rounded mb-4" />
                 </div>
              </div>

              <button id="add-image-btn" class="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded cursor-pointer mt-4">Add image</button>
 

              <label for="endDate" class="block text-fg mb-2">End Date:</label>
              <input id="endDate" type="text" required step="60" class="input border text-fg border-fg p-2 rounded mb-4" placeholder="Select date" />
              <button id="save-changes-btn" class="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded cursor-pointer mt-4">Save Changes</button>
            </form>
                `;

    const addImageBtn = newListingForm.querySelector("#add-image-btn");
    addImageBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const imageUrl = newListingForm.querySelector("#image").value;
      const imageAlt =
        newListingForm.querySelector("#bannerAlt").value || "Listing image";

      const savedImagesContainer = newListingForm.querySelector(
        "#saved-images-container"
      );

      const imageContainer = document.createElement("div");
      imageContainer.setAttribute("data-images", "images");
      imageContainer.classList.add(
        "flex",
        "items-center",
        "gap-2",
        "flex-col",
        "items-start"
      );

      const title = document.createElement("p");
      title.classList.add("text-sm", "text-fg", "max-w-xs", "truncate");
      title.id = "image-url";
      title.innerText = imageUrl;

      const altText = document.createElement("p");
      altText.classList.add("text-xs", "text-fg", "italic");
      altText.id = "alt-text";
      altText.innerText = imageAlt;

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.classList.add(
        "text-red-500",
        "hover:text-red-700",
        "cursor-pointer"
      );
      removeBtn.innerText = "Remove";
      removeBtn.addEventListener("click", () => {
        savedImagesContainer.removeChild(imageContainer);
      });

      imageContainer.appendChild(title);
      imageContainer.appendChild(altText);
      imageContainer.appendChild(removeBtn);
      savedImagesContainer.appendChild(imageContainer);
    });
    const saveButton = newListingForm.querySelector("#save-changes-btn");
    const dateInput = newListingForm.querySelector("#endDate");

    flatpickr(dateInput, {
      enableTime: true,
      dateFormat: "Y-m-d H:i",
      minDate: "today",
      time_24hr: true,
      minuteIncrement: 1,
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.input.value === "") {
          const now = new Date();
          instance.set("minTime", `${now.getHours()}:${now.getMinutes()}`);
        }
      },
      onChange: function (selectedDates, dateStr, instance) {
        const today = new Date();
        const isoString = selectedDates[0].toISOString();
        if (isoString === today.toISOString()) {
          instance.set("minTime", `${today.getHours()}:${today.getMinutes()}`);
        } else {
          instance.set("minTime", "00:00");
        }
      },
    });

    saveButton.addEventListener("click", (e) => {
      e.preventDefault();
      const savedImages = newListingForm.querySelectorAll("[data-images]");

      const title = newListingForm.querySelector("#title").value;
      const description = newListingForm.querySelector("#description").value;
      const endsAt = newListingForm.querySelector("#endDate").value;

      createListing({
        title,
        description,
        endsAt,
        media: [...savedImages].map((img) => ({
          url: img.querySelector("#image-url").innerText,
          alt: img.querySelector("#alt-text").innerText,
        })),
      });
    });

    const closeButton = newListingForm.querySelector("#close-edit-btn");
    closeButton.addEventListener("click", () => {
      document.body.removeChild(newListingContainer);
      document.body.classList.remove("no-scroll");
    });
    newListingContainer.appendChild(newListingForm);
    document.body.appendChild(newListingContainer);
  });
};
