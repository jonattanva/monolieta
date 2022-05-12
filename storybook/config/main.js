module.exports = {
    core: {
        builder: "webpack5",
    },
    stories: [
        "../../assets/components/**/*.stories.mdx",
        "../../assets/components/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
    framework: "@storybook/react",
};
