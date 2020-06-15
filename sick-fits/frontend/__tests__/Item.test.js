import ItemComponent from "../components/Item";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";

const fakeItem = {
  id: "ABC123",
  title: "A Cool Item",
  price: 4000,
  description: "This item is really cool!",
  image: "dog.jpg",
  largeImage: "largedog.jpg",
};

describe("<Item/>", () => {
  it("render and displays properly", () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const priceTag = wrapper.find("PriceTag");
    expect(priceTag.children().text()).toBe("$40");

    expect(wrapper.find("Title a").text()).toBe(fakeItem.title);

    const img = wrapper.find("img");
    console.log(img.props());
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);

    // console.log(priceTag.dive().text());

    // console.log(wrapper.debug());
    // expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
