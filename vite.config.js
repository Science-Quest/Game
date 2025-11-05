import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],

  server: {
    // Bind to all interfaces (IPv4 + IPv6) so localhost, 127.0.0.1, and custom hostname work
    host: true,

    allowedHosts: ['games.sciencequest.local'], // <-- allow your subdomain

    // Port for Vite dev server
    port: 5173,

    // Enable strict port so it fails if 5173 is in use
    strictPort: true,

    historyApiFallback: true,

    hmr: { host: 'games.sciencequest.local' }, // ensures HMR works through Apache
  }
});
