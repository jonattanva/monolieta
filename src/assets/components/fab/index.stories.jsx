import Fab from "./index";
import Setting from "../icon/setting";

export default {
    title: "Component/Action/Fab",
    component: Fab,
    argTypes: {
        click: {
            action: "clicked",
        },
    },
};

const Template = (args) => (
    <Fab {...args}>
        <Setting />
    </Fab>
);

export const Primary = Template.bind({});
