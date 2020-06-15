import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { CURRENT_USER_QUERY } from "../components/User";
import { MockedProvider } from "react-apollo/test-utils";
import Nav from "../components/Nav";
import { fakeUser, fakeCartItem } from "../lib/testUtils";

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } },
  },
];

const signedInMocksWithCartItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: fakeUser(),
        cart: [fakeCartItem(), fakeCartItem(), fakeCartItem()],
      },
    },
  },
];

describe("<Nav />", () => {
  it("renders a minimal nav when signed out", async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <Nav />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    // console.log(wrapper.debug());
    const nav = wrapper.find('[data-test="nav"]');
    // console.log(nav.debug());
    expect(toJSON(nav)).toMatchSnapshot();

    // expect(wrapper.text()).toContain("Please sign in before continuing");
    // const signIn = wrapper.find("Signin");
    // expect(signIn.exists()).toBe(true);
    // console.log('signIn: ', signIn);

    // expect(wrapper.find('SignIn')).toContain('Please sign in before continuing')

    // console.log(wrapper.debug());
  });
  it("renders full nav when signed in", async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <Nav />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    // console.log(wrapper.debug());
    const nav = wrapper.find('ul[data-test="nav"]');
    expect(nav.children().length).toBe(6);
    expect(nav.text()).toContain("Sign out");

    // expect(toJSON(nav)).toMatchSnapshot();
  });

  it("renders the amout of items in the cart", async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocksWithCartItems}>
        <Nav />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    // console.log(wrapper.debug());
    const nav = wrapper.find('[data-test="nav"]');
    const count = nav.find("div.count");
    // console.log(count.debug());
    expect(toJSON(count)).toMatchSnapshot();
  });
});
