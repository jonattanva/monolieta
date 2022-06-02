import Author from "./index";

export default {
    title: "Component/Project/Author",
    component: Author,
};

const Template = (args) => <Author {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    name: "Jonattan",
    privacy: "Public",
    project: "Monolieta",
};
