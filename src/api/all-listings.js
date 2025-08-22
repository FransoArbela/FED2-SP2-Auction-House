const getAllListings = async () => {
  try {
    const response = await fetch('/api/listings');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
};

export default getAllListings;
