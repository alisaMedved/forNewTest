import React from "react";
import Button from "./button";
import {shallow} from "enzyme";
import {jest} from "@jest/globals";

describe("Button tests", () => {

  it("should call function onClick", () => {
    // зацепится не за что - в компоненте кнопки нету никаких
    // значений меняющихся от вызова функции onClick
    // поэтому остается смотреть вызвалась ли она вообще
    // считать количество ее вызовов

    // mockCallback - это mock
    const mockCallback = jest.fn();
    const component = shallow(<Button onClick={mockCallback} />);
    expect(mockCallback.mock.calls.length).toEqual(0);
    component.find(".btn").simulate("click");
    // смотрим кол-во вызовов функции mockCallback
    expect(mockCallback.mock.calls.length).toEqual(1);
  });
});
