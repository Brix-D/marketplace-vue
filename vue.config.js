module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            scss: {
                additionalData: '@import "@/assets/scss/_variables.scss";',
            },
        },
    },
    publicPath: 'sites/servey/modules/custom/marketplace/marketplace-app/',
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
