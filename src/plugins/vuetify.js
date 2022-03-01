import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import pt from 'vuetify/lib/locale/pt'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        red: '#E10600',
        darkerGray: '#242433',
        lightenGray: '#454551',
        white: '#fff',
      },
      dark: {
        red: '#E10600',
        darkerGray: '#242433',
        lightenGray: '#454551',
        white: '#fff',
      }
    },
  },
  lang: {
    locales: { pt },
    current: 'pt'
  }
});
