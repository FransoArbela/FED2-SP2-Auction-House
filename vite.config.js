import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  resolve: { alias: { "@": resolve(__dirname, "src") } },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "pages/auth/login.html"),
        register: resolve(__dirname, "pages/auth/register.html"),
        profile: resolve(__dirname, "pages/profile/profile.html"),
        singleListing: resolve(__dirname, "pages/listings/single-listing.html"),
      },
    },
  },
});
