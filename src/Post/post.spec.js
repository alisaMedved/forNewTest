import React from "react";
import Post from "./post";

// при такой форме записи возможно прокидывание пропсов в компонент
const setUp = (props) => shallow(<Post {...props} />)

describe("should render Post component", () => {
let component;
// beforeEach - перед каждым тестом выполнить
  beforeEach(() => {
    component = setUp();
  });

  it("should contain .post wrapper", () => {
    const wrapper = component.find(".post");
    // console.log(component.debug());
    expect(wrapper.length).toBe(1);
  });

  it("should contain link", () => {
    const wrapper = component.find("a");
    expect(wrapper.length).toBe(1);
  });

  it("should render created date",() => {
    const created_at = "21-03-2020";
    const component = setUp({created_at});
    const date = component.find(".date");
    // В идеале вот эту вот new Date(created_at).toLocaleDateString() переместить в
    // отдельную утилиту и юзать ее и в компоненте и в тестах
    // Uncovered line - в консоли в отчете теста указывается процент непокртытой части проекта
    expect(date.text()).toBe(new Date(created_at).toLocaleDateString());
  });
});

// в целом: для больших проектов куча find не применимы ведь тогда будет избыточное
// количество конструкции - решение этого юзать снепшоты


