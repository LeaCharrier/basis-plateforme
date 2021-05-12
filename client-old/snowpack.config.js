/** @type {import('snowpack').SnowpackUserConfig } */
module.exports = {
    mount: {
        public: '/',
        src: '/dist'
    },
    plugins: [
        '@snowpack/plugin-svelte',
        '@snowpack/plugin-sass'
    ],
    alias: {
        '@components': './src/templates/components',
        '@data': './src/data',
        '@games': './src/templates/pages/games',
        '@layout': './src/templates/layout',
        '@modules': './src/modules',
        '@pages': './src/templates/pages',
        '@store': './src/data/store.js',
        '@styles': './src/styles'
    },
    routes: [
        /* Enable an SPA Fallback in development: */
        // {'match': 'routes', 'src': '.*', 'dest': '/index.html'},
    ],
    optimize: {
        /* Example: Bundle your final build: */
        // 'bundle': true,
    },
    packageOptions: {
        /* ... */
    },
    devOptions: {
        /* ... */
    },
    buildOptions: {
        /* ... */
    },
};