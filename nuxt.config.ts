// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', 'nuxt-vuefire', '@pinia/nuxt'],
  devtools: { enabled: true },
  vuefire: {
    config: {
      apiKey: 'AIzaSyB_xo7O057IALRa_75xukOUYuJ7RAtldgo',
      authDomain: 'palworld-breeding-de4fc.firebaseapp.com',
      projectId: 'palworld-breeding-de4fc',
      storageBucket: 'palworld-breeding-de4fc.appspot.com',
      messagingSenderId: '830867244966',
      appId: '1:830867244966:web:27854c7dd4a429ba8d7167',
      // there could be other properties depending on the project
    },
  },
})
