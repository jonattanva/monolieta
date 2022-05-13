import Radio from "./index";

export default {
    title: "Component/Form/Radio",
    component: Radio,
    argTypes: {
        click: {
            action: "clicked",
        },
    },
};

const Template = (args) => <Radio {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    children: "Public",
};
