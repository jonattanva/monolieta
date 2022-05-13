module.exports = {
    core: {
        builder: "webpack5",
    },
    stories: [
        "../../assets/components/**/*.stories.@(js|jsx|ts|tsx)",
        "../../assets/components/**/*.stories.mdx",
        "../../assets/templates/**/*.stories.@(js|jsx|ts|tsx)",
        "../../assets/templates/**/*.stories.mdx",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
    framework: "@storybook/react",
};
