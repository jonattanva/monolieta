import Card from "./index";

export default {
    title: "Component/Project/Card",
    component: Card,
    argTypes: {
        click: {
            action: "clicked",
        },
    },
};

const Template = (args) => <Card {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    description: "La base de datos MNIST de dígitos escritos a mano.",
    name: "MNIST",
    owner: "Yann LeCun",
    total: 0,
    privacy: "Public",
};
