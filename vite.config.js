import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //server: { port: 5175 },
  /*server: {
    host: "172.17.240.1",
  },*/
});