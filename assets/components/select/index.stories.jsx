import Select from "./index";

export default {
    title: "Component/Form/Select",
    component: Select,
};

const Template = (args) => <Select {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    multiple: true,
    options: [
        { value: "1", label: "Red" },
        { value: "2", label: "Yellow"},
        { value: "3", label: "Blue"},
        { value: "4", label: "Pink"}
    ],
};
