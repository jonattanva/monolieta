import Textarea from "./index";

export default {
    title: "Component/Form/Textarea",
    component: Text,
};

const Template = (args) => <Textarea {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    autofocus: false,
    placeholder: "Placeholder...",
};
