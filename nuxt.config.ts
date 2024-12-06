// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  compatibilityDate: '2024-12-05',
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  css: ['~/assets/main.css'],
  modules: [
    'nuxt-vuefire',
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    'nuxt-gtag',
    "nuxt-marquee",
    '@vueuse/nuxt'
  ],
  plugins: [{ src: '~/plugins/lottie', mode: 'client' }, { src: '~/plugins/vue-qrcode-reader.js' }],
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
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',

          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
        }
      ]
    }
  },
  // devServer: {
  //   host: '172.18.74.71', // or '0' - listens on all interfaces
  //   port: 8080, // Optional: specify a port
  // }
});