const presets = [
    ['@babel/preset-react', { runtime: 'automatic' }],
    ['@babel/preset-env', { debug: false }],
    ['@babel/preset-flow']
]

const plugins = [
    ['@babel/transform-runtime', { corejs: 3 }],
    [
        'babel-plugin-styled-components',
        {
            ssr: false,
            namespace: 'monolieta',
            displayName: false
        }
    ]
]

module.exports = function (api) {
    api.cache(true)
    return {
        presets,
        plugins
    }
}
