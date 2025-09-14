export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
    case "/index.html":
      await import("./pages/listings/allListings.js");
      break;

    case "/pages/auth/login.html":
      await import("./pages/auth/login.js");
      break;

    case "/pages/auth/register.html":
      await import("./pages/auth/register.js");
      break;

    case "/pages/listings/create-listing.html":
      await import("./pages/listings/createListing.js");
      break;

    case "/pages/listings/single-listing.html":
      await import("./pages/listings/singleListing.js");
      break;
    case "/pages/profile/profile.html":
    case "/pages/profile/":
      await import("./api/profiles/loadProfile.js");
      break;

    default:
      // await import("./notFound/404.js");
  }
}
