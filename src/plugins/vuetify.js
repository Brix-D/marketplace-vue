import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import ru from 'vuetify/lib/locale/ru';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { ru },
        current: 'ru',
    },
    theme: {
        dark: false,
        themes: {
            dark: {
                primary: colors.indigo.lighten5,
                accent: colors.deepPurple.lighten1,
                secondary: colors.grey.lighten3,
                secondaryLight: colors.grey.lighten3,
                info: colors.blue.lighten1,
                warning: colors.amber.base,
                error: colors.deepOrange.accent4,
                success: colors.green.base,
                backgroundSecondary: colors.grey.darken4,
                background: colors.grey.darken3,
                white: colors.shades.white,
            },
            light: {
                primary: colors.grey.darken4,
                accent: colors.deepPurple.lighten1,
                secondary: colors.grey.darken2,
                secondaryLight: colors.grey.lighten3,
                info: colors.blue.darken2,
                warning: colors.amber.base,
                error: colors.deepOrange.accent4,
                success: colors.green.base,
                backgroundSecondary: colors.indigo.lighten5,
                background: colors.grey.lighten4,
                white: colors.shades.white,
            },
        },
        options: {
            customProperties: true,
        },
        icons: {
            iconfont: 'mdi',
        },
    },
});
