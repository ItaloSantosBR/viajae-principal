// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@nuxtjs/google-fonts'
  ],
  
  css: ['~/assets/css/main.css'],
  
  app: {
    head: {
      title: 'Viajae - Marketplace de Excursões com Hospedagem',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Viajae é um marketplace de excursões com hospedagem, onde empresas de turismo podem cadastrar viagens de vários dias, e usuários podem reservar suas vagas com facilidade.' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  
  googleFonts: {
    families: {
      Lato: [100, 300, 400, 700, 900]
    },
    display: 'swap'
  },
  
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: '#01DB87',
              50: '#E6FFF5',
              100: '#CCFFEB',
              200: '#99FFD6',
              300: '#66FFC2',
              400: '#33FFAD',
              500: '#01DB87',
              600: '#00B26F',
              700: '#008A56',
              800: '#00613D',
              900: '#003924'
            }
          },
          fontFamily: {
            sans: ['Lato', 'sans-serif']
          }
        }
      }
    }
  }
})
