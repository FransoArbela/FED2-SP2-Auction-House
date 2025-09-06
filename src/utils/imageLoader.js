export const loadSingleImg = (src, alt) => {
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

//==============================================================
export const loadMultipleImgs = (images = [], container) => {
  if (!container) return;

  container.innerHTML = "";

  // Layout
  const heroContainer = document.createElement("div");
  heroContainer.id = "hero-img-container";
  heroContainer.classList = "w-full h-[600px] flex justify-center";

  const heroImg = document.createElement("img");
  heroImg.classList = "hero-img  w-auto h-full";
  heroContainer.appendChild(heroImg);

  const thumbsContainer = document.createElement("div");
  thumbsContainer.id = "thumbnail-img-container";
  thumbsContainer.classList = "flex flex-col gap-2 overflow-y-auto max-h-[36rem]";

  container.append(heroContainer, thumbsContainer);

  // helper
  const setSrc = (el, url, alt = "listing image") => {
    el.src = encodeURI(url || "");
    el.alt = alt;
    el.onerror = () => { el.onerror = null; el.src = "/placeholder-img.png"; };
  };

  // nothing to show
  if (!images || images.length === 0) {
    setSrc(heroImg, "/placeholder-img.png", "image-placeholder");
    return;
  }

  // render hero + thumbs
  images.forEach(({ url, alt }, i) => {
    const thumb = document.createElement("img");
    thumb.classList =
      "thumbnail w-24 h-24 object-cover rounded cursor-pointer transition ";
    thumb.tabIndex = 0; 
    setSrc(thumb, url, alt);

    if (i === 0) {
      setSrc(heroImg, url, alt);
      thumb.classList.add("filter-[brightness(0.5)]");
      thumb.setAttribute("aria-current", "true");
    }

    thumbsContainer.appendChild(thumb);
  });

  // click/keyboard: update hero + highlight, keep order
  const activate = (thumb) => {
    if (!thumb) return;
    setSrc(heroImg, thumb.src, thumb.alt);

    // update highlight
    thumbsContainer.querySelectorAll(".thumbnail").forEach(t => {
      t.classList.remove("filter-[brightness(0.5)]", "ring-emerald-500");
      t.removeAttribute("aria-current");
    });
    thumb.classList.add("filter-[brightness(0.5)]", "ring-emerald-500");
    thumb.setAttribute("aria-current", "true");
  };

  thumbsContainer.addEventListener("click", (e) => {
    const t = e.target.closest(".thumbnail");
    if (t) activate(t);
  });

};