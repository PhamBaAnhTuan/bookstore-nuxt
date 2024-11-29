import { config } from 'dotenv';
config();

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt', // required
    'pinia-plugin-persistedstate/nuxt',
    '@element-plus/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL, // Public variable
    },
  },
})
