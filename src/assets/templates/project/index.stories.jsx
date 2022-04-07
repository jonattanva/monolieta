import Home from "./index";

export default {
    title: "Template/Project/Home",
    component: Home,
};

const Template = (args) => <Home {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    selected: 0,
};
