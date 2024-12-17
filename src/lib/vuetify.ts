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
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: false,
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

          profile_bc: colors.grey.lighten3,
        },
      },
    },
  },
})

export default vuetify
