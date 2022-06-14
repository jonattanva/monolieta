import Select from "./index";

export default {
    title: "Component/Form/Select",
    component: Select,
};

const Template = (args) => <Select {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
