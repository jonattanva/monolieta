import Stats from "./index";

export default {
    title: "Component/Project/Stats",
    component: Stats,
};

const Template = (args) => <Stats {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    files: 30,
    storage: 1023,
};
