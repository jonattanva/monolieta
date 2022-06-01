import Fab from "./index";
import Setting from "../resources/setting"

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
        <Setting width={24} height={24} />
    </Fab>
);

export const Primary = Template.bind({});
