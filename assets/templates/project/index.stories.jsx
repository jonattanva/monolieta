import Index from "./index";

export default {
    title: "Templates/Project/Home",
    component: Index,
    argTypes: {},
};

const Template = (args) => <Index {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
