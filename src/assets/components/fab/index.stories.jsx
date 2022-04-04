import Fab, { Setting as _Setting, Insight as _Insight } from "./index";

export default {
    title: "Component/Action/Fab",
    component: Fab,
    argTypes: {
        click: {
            action: "clicked",
        },
    },
};

const Template = (args) => <_Setting {...args} />;

export const Setting = Template.bind({});

const Template2 = (args) => <_Insight {...args} />;

export const Insight = Template2.bind({});
