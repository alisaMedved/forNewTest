import React from "react";
import Select from "./select";

const props = {
  options: [
    { value: "text_1", label: "Test 1" },
    { value: "text_2", label: "Test 2" },
  ],
  value: 0,
  handleChange: () => {},
};

const setUp = (props) => render(<Select {...props} />);
const setUpWithout = () => render(<Select />);

describe("Select component", () => {
  describe("Has props", () => {
    const component = setUp(props);

    it("should render select element", () => {
      const select = component.find("select");
      // toHaveLength вот это интересный метод он показывает сколько элементов в данной разметке
      // это аналог связки length и toBe
      expect(select).toHaveLength(1);
    });

    it("should render 2 options", () => {
      const options = component.find("option");
      expect(options).toHaveLength(2);
    });
  });
  describe("has not props", () => {
    it("should render placeholder", () => {
      const component = setUpWithout();
      const placeholder = component.find(".placeholder");
      expect(placeholder).toHaveLength(1)
    });
  });

  describe("default props", () => {
    it("should use default handleChange", () => {
      const result = Select.defaultProps.handleChange();
      expect(result).toBe(undefined);
    })
  });
});
