module.exports = {
    lintOnSave: false,
    css: {
        extract: false,
    },
    configureWebpack: {
        externals: process.env.NODE_ENV === 'production' ? {
            axios: {
                commonjs: 'axios',
                commonjs2: 'axios',
                root: 'axios'
            },
        } : {}
    },
    publicPath: ''
};