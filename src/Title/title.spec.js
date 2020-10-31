import React from "react";
import Title from "./title";

describe("component Title", () => {
  it("render component Title with props", () => {
    const component = render(<Title title="My Test title meow" />);
    expect(component).toMatchSnapshot();
  });
  it("render component Title without props", () => {
    const component = render(<Title />);
    expect(component).toMatchSnapshot();
  });
});
