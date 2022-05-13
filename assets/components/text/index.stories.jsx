import Text from "./index";

export default {
    title: "Component/Form/Text",
    component: Text,
};

const Template = (args) => <Text {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    autofocus: false,
    placeholder: "Placeholder...",
    error: "The error message...",
};
