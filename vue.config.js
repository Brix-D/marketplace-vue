const isDev = process.env.NODE_ENV === 'development';

console.log('--isDev', isDev);
module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            scss: {
                additionalData: '@import "@/assets/scss/_variables.scss";',
            },
        },
    },
    ...(!isDev && { publicPath: 'sites/servey/modules/custom/marketplace/marketplace-app/' }),
    configureWebpack: {
        // externals: {
        //     axios: 'axios',
        //     'vue-router': 'VueRouter',
        //     vuex: 'vuex',
        //     vuetify: 'vuetify',
        // },
    },
    transpileDependencies: ['vuetify'],
};
