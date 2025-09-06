const renderProfile = (profileData) => {
    const profileDetails = {
        name: profileData.data.name,
        email: profileData.data.email,
        bio: profileData.data?.bio,
        avatar: {
            url: profileData.data?.avatar?.url,
            alt: profileData.data?.avatar?.alt
        },
        banner: {
            url: profileData.data?.banner?.url,
            alt: profileData.data?.banner?.alt
        },
        credit: profileData.data?.credits,
        count: {
            listings: profileData.data?._count.listings,
            wins: profileData.data?._count.wins
        },
    };

    const profileContainer = document.getElementById("profile-container");
    console.log(profileDetails);
    profileContainer.innerHTML = `
        <h1>${profileDetails.name}</h1>
        <p>Email: ${profileDetails.email}</p>
        <p>Bio: ${profileDetails.bio}</p>
        <p>Credit: ${profileDetails.credit}</p>
        <p>Listings: ${profileDetails.count.listings}</p>
        <p>Wins: ${profileDetails.count.wins}</p>
        <img src="${profileDetails.avatar.url}" alt="${profileDetails.avatar.alt}" width="100" />
        <img src="${profileDetails.banner.url}" alt="${profileDetails.banner.alt}" width="100" />
    `;
};

export { renderProfile };