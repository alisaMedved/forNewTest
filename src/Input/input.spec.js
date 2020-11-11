import React from "react";
import Input from "./input";
import {jest} from "@jest/globals";
import {shallow} from "enzyme";


describe("Input component", () => {
  it("should render Input component", () => {
    const component = shallow(<Input />);
    expect(component).toMatchSnapshot();
  });

  describe("defaultProps", () => {
    it("should use default onChange", () => {
      const result = Input.defaultProps.onChange();
      expect(result).toBe(undefined);
    });

    it("should use default onKeyPress", () => {
      const result = Input.defaultProps.onKeyPress();
      expect(result).toBe(undefined);
    });

    it("should call function onChange", () => {
      const mockCallback = jest.fn();
      const component = shallow(<Input onChange={mockCallback} />);
      expect(mockCallback.mock.calls.length).toEqual(0);
      component.find(".input").simulate("change");
      expect(mockCallback.mock.calls.length).toEqual(1);
    });
  });
});
