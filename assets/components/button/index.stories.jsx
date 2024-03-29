import Button from "./index";

export default {
    title: "Component/Action/Button",
    component: Button,
    argTypes: {
        onClick: {
            action: "clicked"
        }
    },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    text: "Primary"
};
