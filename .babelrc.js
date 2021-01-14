const presets = [
    ["@babel/preset-flow", {
        "all": true
    }],
    ["@babel/preset-env", {
        debug: false,
        targets: {
            node: "current"
        }
    }],
    ["@babel/preset-react", {
        runtime: "automatic"
    }]
]

const plugins = [
    ['babel-plugin-styled-components', {
        ssr: false, displayName: false, namespace: 'eva'
    }]
]

module.exports = {
    presets,
    plugins
}
