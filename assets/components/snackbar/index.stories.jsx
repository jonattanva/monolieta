import Snackbar from "./index";

const styles = {
    transform: "scale(1)",
    height: "100vh",
};

export default {
    title: "Component/Form/Snackbar",
    component: Snackbar,
    argTypes: {
        delay: { control: "number" },
    },
    decorators: [(fn) => <div style={styles}>{fn()}</div>],
};

const Template = (args) => <Snackbar {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    message: "This is a primary snackbar",
};
