export const objectNormalized = (data, isMulti = null) => {
  if (!isMulti) {
    return {
      id: data.id,
      bids: {
        bidder: data.bids.map((bid) => ({
          amount: bid.amount,
          created: bid.created,
          avatar: {
            url: bid.bidder.avatar?.url,
            alt: bid.bidder.avatar?.alt,
          },
          name: bid.bidder.name,
          email: bid.bidder.email,
        })),
      },
      created: data.created,
      description: data.description,
      endsAt: data.endsAt,
      title: data.title,
      updated: data.updated,
      count: data._count?.bids || 0,
      seller: [
        {
          avatar: {
            url: data.seller?.avatar?.url,
            alt: data.seller?.avatar?.alt,
          },
          name: data.seller?.name,
          email: data.seller?.email,
        },
      ],
      tags: data.tags?.map((tag) => tag) || [],
      media:
        data.media?.map((item) => ({
          url: item.url,
          alt: item.alt,
        })) || [],
    };
  }

  return data.map((item) => ({
    id: item.id,
    count: {
      bids: item._count.bids,
    },
    description: item.description,
    title: item.title,
    tags: item.tags?.map((tag) => tag) || [],
    media: [
      {
        url: item.media?.[0]?.url,
        alt: item.media?.[0]?.alt,
      },
    ],
    created: item.created,
    endsAt: item.endsAt,
    updated: item.updated,
    seller: {
      name: item.seller.name,
      email: item.seller.email,
      avatar: {
        url: item.seller.avatar?.url,
        alt: item.seller.avatar?.alt,
      },
    },
  }));
};
