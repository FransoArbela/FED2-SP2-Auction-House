export const allListings = async ({
  limit = 40,
  page = 1,
  tag = "",
  active = null,         
  seller = false,        
  bids = false,         
  sort,                  
  sortOrder,            
  search,                
} = {}) => {
  // pick endpoint
  const url = new URL(
    search
      ? 'https://v2.api.noroff.dev/auction/listings/search'
      : 'https://v2.api.noroff.dev/auction/listings'
  );
  const query = url.searchParams;

  // common params
  query.set('limit', String(limit));
  query.set('page', String(page));

  // search
  if (search && search.trim().length) query.set('q', search.trim());

  // filters (supported on listings; often work with search too)
  if (tag) query.set('_tag', tag);
  if (typeof active === 'boolean') query.set('_active', String(active));

  // include extra data only when true (API defaults to false)
  if (seller) query.set('_seller', 'true');
  if (bids) query.set('_bids', 'true');

  // sorting (only add when present)
  if (sort) {
    query.set('sort', sort);
    if (sortOrder) query.set('sortOrder', sortOrder);
  }

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: { accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  return res.json();
};
