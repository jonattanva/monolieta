module.exports = {
    core: {
        builder: "webpack5",
    },
    stories: [
        "../../src/assets/templates/**/*.stories.mdx",
        "../../src/assets/components/**/*.stories.mdx",
        "../../src/assets/templates/**/*.stories.@(js|jsx|ts|tsx)",
        "../../src/assets/components/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
    framework: "@storybook/react",
};
