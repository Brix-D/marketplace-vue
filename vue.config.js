module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            scss: {
                additionalData: '@import "@/assets/scss/_variables.scss";',
            },
        },
    },
    configureWebpack: {
        externals: {
            axios: 'axios',
            'vue-router': 'VueRouter',
            vuex: 'vuex',
            vuetify: 'vuetify',
        },
    },
    transpileDependencies: ['vuetify'],
};
