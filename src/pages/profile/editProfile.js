import { updateProfile } from "../../api/profiles/updateProfile.js";

export const editProfile = (avatar, banner, bio) => {
  const editButton = document.getElementById("edit-profile-btn");
  if (!editButton) return;

  editButton.addEventListener("click", () => {
    const editContainer = document.createElement("div");
    editContainer.id = "edit-profile-container";
    editContainer.classList.add(
      "fixed",
      "inset-0",
      "bg-black/60",
      "bg-opacity-50",
      "flex",
      "items-center",
      "justify-center",
      "z-30"
    );

    const editForm = document.createElement("div");
    editForm.id = "edit-profile-form";
    editForm.classList.add(
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
    editForm.innerHTML = `
        <button id="close-edit-btn" type="button" class="self-end absolute cursor-pointer mb-4 text-fg hover:text-primary-hover w-fit h-fit px-4 py-2 rounded z-20">Close</button>
        <form class=" w-[25rem] justify-center flex flex-col h-full">
            <h2 class="text-2xl font-semibold text-fg mb-4">Edit Profile</h2>

            <label for="avatar" class="block text-fg mb-2">Avatar:</label>
            <input type="url" id="avatar" value="${avatar.url}" placeholder="Enter avatar URL" class="border text-fg border-fg p-2 rounded mb-4" />
            <input type="text" id="avatarAlt" value="${avatar.alt}" placeholder="Enter avatar alt text" class="border text-fg border-fg p-2 rounded mb-4" />

            <label for="banner" class="block text-fg mb-2">Banner:</label>
            <input type="url" id="banner" value="${banner.url}" placeholder="Enter banner URL" class="border text-fg border-fg p-2 rounded mb-4" />
            <input type="text" id="bannerAlt" value="${banner.alt}" placeholder="Enter banner alt text" class="border text-fg border-fg p-2 rounded mb-4" />

            <label for="bio" class="block text-fg mb-2">Bio:</label>
            <textarea id="bio" class="border p-2 text-fg placeholder="Enter bio" border-fg p-2 rounded mb-4">${bio}</textarea>
            <p id="error-message" class="text-red-500 hidden p-2"></p>
            <button type="submit" class="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded cursor-pointer mt-4">Save Changes</button>
        </form>
            `;

    const closeButton = editForm.querySelector("#close-edit-btn");
    closeButton.addEventListener("click", () => {
      document.body.removeChild(editContainer);
    });
    editContainer.appendChild(editForm);
    document.body.appendChild(editContainer);

    const profile = JSON.parse(localStorage.getItem("profile"));
    const userName = profile.name;
    const editProfileForm = editForm.querySelector("form");
    editProfileForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!editProfileForm.avatar.value && !editProfileForm.banner.value) {
        const errorMsg = editForm.querySelector("p");
        errorMsg.classList.remove("hidden");
        errorMsg.innerText = "Avatar and Banner URLs are required.";
        return;
      }

      const profileData = {
        avatarUrl: editProfileForm.avatar.value,
        avatarAlt: editProfileForm.avatarAlt.value,
        bannerUrl: editProfileForm.banner.value,
        bannerAlt: editProfileForm.bannerAlt.value,
        bio: editProfileForm.bio.value,
      };

      const updatedProfile = await updateProfile(profileData, userName);
      if (updatedProfile) return;
      document.body.removeChild(editContainer);
    });
  });
};
