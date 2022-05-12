import Fab from "./index";
import Icon from "../icon";
import setting from "../../images/setting.svg";

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
        <Icon source={setting} hash="setting" />
    </Fab>
);

export const Primary = Template.bind({});
