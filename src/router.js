export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case '/':
    case '/index.html':
      await import('./pages/home.js');
      break;

    case '/pages/auth/login.html':
      await import('./pages/login.js');
      break;

    case '/pages/auth/register.html':
      await import('./pages/register.js');
      break;

    case '/pages/listings/create-listing.html':
      await import('./pages/create-listing.js');
      break;

    case '/pages/listings/listings.html':
      await import('./pages/listing.js');
      break;
    case '/pages/profile/profile.html':
    case '/pages/profile/':
      await import('./pages/profile.js');
      break;

    default:
      await import('./notFound/404.js');
  }

  console.log('Router initialized with path:', pathname);
}

export function navigate(path) {
  history.pushState({}, '', path);
  router(path);
}

export function setActiveLink(path) {
  document.querySelectorAll('a[data-link]').forEach(a => {
    const isActive = a.getAttribute('href') === path;
    a.classList.toggle('bg-slate-800', isActive);
  });
}

window.addEventListener('popstate', () => router());
