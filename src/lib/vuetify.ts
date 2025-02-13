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
          background: colors.grey.lighten3,
          error: colors.red.base,
          info: colors.blue.accent4,
          warning: colors.yellow.accent3,
          success: colors.green.accent3,
          surface: colors.grey.lighten5,
          primary: colors.grey.lighten2,
          secondary: colors.indigo.accent1,
          cards_text_color: colors.grey.lighten5,
          text_color: colors.grey.darken4,
          default_btn_bc: colors.grey.darken4,

          nav_btn_hover: colors.blue.lighten3,
          nav_btn_active: colors.blue.base,
          site_title: colors.blue.accent4,
          login_title: colors.grey.lighten5,
          home_rightdrawer_card: colors.grey.lighten2,
          home_task_card_hover: colors.grey.lighten2,
          custom_drawer_btn: colors.grey.darken1,
          custom_drawer_icon: colors.grey.darken4,

          profile_bc: colors.grey.lighten1,
          profile_textColor: colors.grey.lighten5,
          profile_cardsColor: colors.grey.lighten2,

          about_bc: colors.grey.lighten2,
          about_main_text_color: colors.grey.lighten5,
          about_text_color: colors.grey.darken4,

          community_posts_bc: colors.grey.lighten4,
          community_primary_color: colors.grey.darken4,
          community_comment_bc: colors.grey.lighten3,
          community_createpost_btn: colors.grey.darken4,
          community_createpost_btn_active: colors.blue.lighten2,
          community_createpost_btn_hover: colors.blue.base,
          community_createpost_editor_area_border: colors.grey.darken4,
          community_filter_bc: colors.grey.lighten3,

          contest_cards_background: colors.grey.lighten2,
        },
      },
      darkTheme: {
        colors: {
          background: colors.grey.darken4,
          error: colors.red.lighten1,
          info: colors.blue.lighten1,
          warning: colors.yellow.darken2,
          success: colors.green.lighten2,
          surface: colors.grey.darken3,
          primary: colors.grey.darken3,
          secondary: colors.indigo.darken3,
          text_color: colors.grey.lighten5,
          default_btn_bc: colors.grey.lighten5,

          nav_btn_hover: colors.blue.lighten4,
          nav_btn_active: colors.blue.lighten3,
          site_title: colors.cyan.lighten3,
          login_title: colors.grey.lighten1,
          home_rightdrawer_card: colors.grey.darken3,
          home_task_card_hover: colors.grey.darken3,
          custom_drawer_btn: colors.grey.lighten2,
          custom_drawer_icon: colors.grey.lighten5,

          profile_bc: colors.grey.darken2,
          profile_textColor: colors.grey.lighten4,
          profile_cardsColor: colors.grey.darken3,

          about_bc: colors.grey.darken3,
          about_main_text_color: colors.grey.lighten5,
          about_text_color: colors.grey.lighten5,

          community_posts_bc: colors.grey.darken3,
          community_primary_color: colors.grey.lighten4,
          community_comment_bc: colors.grey.darken2,
          community_createpost_btn: colors.grey.lighten5,
          community_createpost_btn_active: colors.blue.lighten2,
          community_createpost_btn_hover: colors.blue.base,
          community_createpost_editor_area_border: colors.grey.lighten5,
          community_filter_bc: colors.grey.darken2,

          contest_cards_background: colors.grey.darken2,
        },
      },
    },
  },
})

export default vuetify
