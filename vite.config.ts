import { unstable_reactRouterRSC as reactRouter } from "@react-router/dev/vite"
import rsc from "@vitejs/plugin-rsc"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import netlifyPlugin from "@netlify/vite-plugin-react-router"

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    rsc(),
    tsconfigPaths(),
    netlifyPlugin()
  ]
})
