// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  routeRules: {
    '/api/v1/**': {
        proxy: { to: "https://www.instagram.com/api/v1/**", },
    }
  },
  css: ['~/assets/main.css'],
  modules: [
    'nuxt-vuefire',
    '@nuxt/scripts',
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    'nuxt-gtag',
    "nuxt-marquee"
],
  vuefire: {
    config: {
      apiKey: 'AIzaSyBUeJeTLIACj6WP8XAfkYkBbVJqQReO0SY',
      authDomain: 'devfest-2024-64eb1.firebaseapp.com',
      projectId: 'devfest-2024-64eb1',
      appId: '1:940154441436:web:f23cf742f2c14fcc132e19',
  messagingSenderId: "940154441436",
  measurementId: "G-GMNG13FRZ8",
  storageBucket: "gs://devfest-2024-64eb1.appspot.com",
      // there could be other properties depending on the project
    },
    auth: {
      enabled: true
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  gtag: {
    id: "G-NLQ83656QY",
  },
});
