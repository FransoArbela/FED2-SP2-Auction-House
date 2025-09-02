
export const isActive = (endsAt) => {
  if (new Date(endsAt) > new Date()) {
    return `<i class="fa-solid fa-circle text-green-500" style="font-size: 0.5rem;"></i>`;
  } else {
    return `<i class="fa-solid fa-circle text-red-500" style="font-size: 0.5rem;"></i>`;
  }
};


