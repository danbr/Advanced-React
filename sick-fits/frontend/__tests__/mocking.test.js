function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFavFoods = function () {
  return new Promise((resolve, reject) => {
    //simulate an API
    setTimeout(() => resolve(this.foods), 2000);
  });
};

describe("mocking learning", () => {
  it("mocks a reg func", () => {
    const fetchDogs = jest.fn();
    fetchDogs("snickers");
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith("snickers");
  });

  it("can create a person", () => {
    const me = new Person("wes", ["pizza", "pasta"]);
    expect(me.name).toBe("wes");
  });

  it("can fetch foods", async () => {
    const me = new Person("wes", ["pizza", "pasta"]);
    //mock the favFoods func
    me.fetchFavFoods = jest.fn().mockReturnValue(["sushi"]);
    const favFoods = await me.fetchFavFoods();
    expect(favFoods).toContain("sushi");
  });
});
