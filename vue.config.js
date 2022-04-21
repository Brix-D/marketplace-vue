const isDev = process.env.NODE_ENV === 'development';

console.log('--isDev', isDev);
console.log('--VUE_APP_BASE_API_URI', process.env.VUE_APP_BASE_API_URI);
module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            scss: {
                additionalData:
                    '@import "@/assets/scss/_variables.scss";' +
                    '@import "@/assets/scss/_mixins.scss";',
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
    ...(isDev && {
        devServer: {
            host: '0.0.0.0',
            port: 8080,
            proxy: {
                '/user/login': {
                    target: process.env.VUE_APP_BASE_API_URI,
                    secure: true,
                    // followRedirects: true,
                    changeOrigin: true,
                    withCredentials: true,
                    // cookieDomainRewrite: {
                    //     '*': '',
                    // },
                    // cookiePathRewrite: {
                    //     '*': '',
                    // },
                },
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        },
    }),
};
