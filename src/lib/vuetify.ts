import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import { type ThemeDefinition } from 'vuetify'
import colors from 'vuetify/util/colors'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme: {
        colors: {
          background: colors.red.accent1,
          error: colors.red.base,
          info: colors.blue.accent4,
          warning: colors.yellow.accent3,
          success: colors.lime.accent1,
          surface: colors.grey.lighten5,
          primary: colors.grey.lighten2,
          secondary: colors.indigo.accent1,

          nav_btn_hover: colors.blue.lighten3,
          nav_btn_active: colors.blue.base,
          site_title: colors.blue.accent4,
          login_title: colors.grey.lighten5,

          profile_bc: colors.grey.lighten1,
          profile_textColor: colors.grey.lighten5,
          profile_cardsColor: colors.grey.lighten2,
        },
      },
      darkTheme: {
        colors: {
          background: colors.grey.darken4, // Mély szürke, sötét háttér
          error: colors.red.lighten1, // Enyhén világosabb piros hibaüzenethez
          info: colors.blue.lighten1, // Lágyabb kék az információkhoz
          warning: colors.yellow.darken2, // Mélyebb sárga figyelmeztetéshez
          success: colors.green.lighten2, // Lágy zöld a sikerhez
          surface: colors.grey.darken3, // Sötétebb szürke felületekhez
          primary: colors.grey.darken2, // Mélyebb kék, kiemelt szín
          secondary: colors.indigo.darken3, // Sötét indigó másodlagos színként

          nav_btn_hover: colors.blue.lighten4, // Enyhén világosabb kék hover állapothoz
          nav_btn_active: colors.blue.lighten3, // Mélyebb kék az aktív állapothoz
          site_title: colors.cyan.lighten3, // Élénkebb kékeszöld a cím kiemelésére
          login_title: colors.grey.lighten1, // Lágy szürke a login címhez

          profile_bc: colors.grey.darken2, // Sötétebb szürke háttér a profilhoz
          profile_textColor: colors.grey.lighten4, // Világos szürke szövegszín
          profile_cardsColor: colors.grey.darken3, // Sötét szürke a kártyákhoz
        },
      },
    },
  },
})

export default vuetify
