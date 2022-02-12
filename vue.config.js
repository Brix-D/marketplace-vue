module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            scss: {
                additionalData: '@import "@/assets/scss/_variables.scss";',
            },
        },
    },
    transpileDependencies: ['vuetify'],
};
