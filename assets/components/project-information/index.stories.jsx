import Information from "./index";

export default {
    title: "Component/Project/Information",
    component: Information,
    argTypes: {
        onClick: {
            action: "clicked",
        },
    },
};

const Template = (args) => <Information {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    author: "Jonattan",
    privacy: "Public",
    project: "Monolieta",
};
