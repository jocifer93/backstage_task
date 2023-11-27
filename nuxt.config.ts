// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@vueuse/nuxt",
    "@nuxt/content",
    // '@nuxthq/ui'
    "@nuxtjs/tailwindcss",
  ],
  css: ["~/css/reset.scss", "~/css/global.scss"],
  components: {
    dirs: [{ path: "./components", pathPrefix: false }],
  },
  devtools: { enabled: true },
});
