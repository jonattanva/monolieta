import Canvas from "./index";

export default {
    title: "Component/Editor/Canvas",
    component: Canvas
};

const Template = (args) => <Canvas {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    alt: "photo",
    source: "https://picsum.photos/400/400",
    scale: 1,
};
