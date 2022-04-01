import Search from "./index";

export default {
    title: "Component/Form/Search",
    component: Search,
};

const Template = (args) => <Search {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    autofocus: false,
    placeholder: "Search",
};
