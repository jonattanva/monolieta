import New from "./new";

export default {
    title: "Templates/Project/New",
    component: New,
    argTypes: {},
};

const Template = (args) => <New {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
