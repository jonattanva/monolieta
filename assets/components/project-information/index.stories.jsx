import Information from "./index";

export default {
    title: "Component/Project/Information",
    component: Information,
};

const Template = (args) => <Information {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    author: "Jonattan",
    privacy: "Public",
    project: "Monolieta",
};
