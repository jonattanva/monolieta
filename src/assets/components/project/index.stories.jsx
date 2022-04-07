import Project from "./index";

export default {
    title: "Component/Navigation/Project",
    component: Project,
    argTypes: {
        click: {
            action: "clicked",
        },
    },
};

const Template = (args) => <Project {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    description: "La base de datos MNIST de dígitos escritos a mano.",
    name: "MNIST",
    owner: "Yann LeCun",
    total: 0,
    visibility: "Public",
};
