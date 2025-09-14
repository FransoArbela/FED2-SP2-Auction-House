export const profileDetails = (profileData) => {
  return {
    name: profileData.data.name,
    email: profileData.data.email,
    bio: profileData.data?.bio,
    avatar: {
      url: profileData.data?.avatar?.url,
      alt: profileData.data?.avatar?.alt,
    },
    banner: {
      url: profileData.data?.banner?.url,
      alt: profileData.data?.banner?.alt,
    },
    credit: profileData.data?.credits,
    count: {
      listings: profileData.data?._count.listings,
      wins: profileData.data?._count.wins,
    },
    listings: profileData.data.listings.map((listing) => ({
      id: listing.id,
      title: listing.title,
      description: listing.description,
      media: listing.media,
      created: listing.created,
      endsAt: listing.endsAt,
    })),
  };
};
