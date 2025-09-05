import { API_ACTION_LISTINGS } from "../constants";

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
    search ? `${API_ACTION_LISTINGS}/search` : API_ACTION_LISTINGS
  );
  const query = url.searchParams;

  query.set("limit", String(limit));
  query.set("page", String(page));

  // search
  if (search && search.trim().length) query.set("q", search.trim());

  // filters
  if (tag) query.set("_tag", tag);
  if (typeof active === "boolean") query.set("_active", String(active));

  // include extra data
  if (seller) query.set("_seller", "true");
  if (bids) query.set("_bids", "true");

  // sorting
  if (sort) {
    query.set("sort", sort);
    if (sortOrder) query.set("sortOrder", sortOrder);
  }

  console.log("Fetching listings with URL:", url.toString());

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: { accept: "application/json" },
    cache: "no-store",
  });

  const data = await res.json();
  console.log(data);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  return data;
};
