import Tab from "./index";

export default {
    title: "Component/Navigation/Tab",
    component: Tab,
    argTypes: {
        click: {
            action: "clicked",
        },
    },
};

const Template = (args) => <Tab {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    options: ["Tab one", "Tab two", "Tab three"],
    selected: 1,
};
