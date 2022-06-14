import Picture from "./index";

export default {
    title: "Component/Editor/Picture",
    component: Picture,
    argTypes: {
        onClick: {
            action: "clicked",
        },
    },
};

const Template = (args) => <Picture {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    alt: "photo",
    source: "https://picsum.photos/800/800",
};
