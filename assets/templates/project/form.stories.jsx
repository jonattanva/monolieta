import Form from "./form";

export default {
    title: "Templates/Project/Form",
    component: Form,
    argTypes: {},
};

const Template = (args) => <Form {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
