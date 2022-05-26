module.exports = {
    core: {
        builder: "webpack5",
    },
    stories: [
        "../../assets/components/**/*.stories.@(js|jsx|ts|tsx)",
        "../../assets/components/**/*.stories.mdx",
    ],
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-links",
    ],
    framework: "@storybook/react",
};
