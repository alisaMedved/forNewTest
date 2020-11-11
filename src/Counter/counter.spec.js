import React from "react";
import Counter from "./counter";

const setUp = () => shallow(<Counter />);

describe("Count component", () => {
  let component;
  let instance;
  beforeEach(() => {
    component = setUp();
    instance = component.instance();
  });

  it("should render Counter component", () => {
    expect(component).toMatchSnapshot();
  });

  describe("Count handlers", () => {
    it("change count value plus one", () => {
     const btn = component.find(".plusOneBtn");
     // знакомьтесь симуляция клика
     btn.simulate("click");
     // проверка тупо на то что разметка поменялась при клике
      // и она поменяется вместо 0 будет 1 в div
      // но проверка снепшотами на такие случаи будет не удобна
      // в более навороченных компонентах и к тому же она более
      // размытая чем тупо проверка определенного поля state
     // expect(component).toMatchSnapshot();
      // альтернатива - тупо проверка определенного поля state
      expect(component.state().count).toBe(1);
    });

    // дальше тестим кнопку сброса двумя способами

    // способ первый: симуляция клика по кнопке
    it("change count value for click btn reset", () => {
      const btn = component.find(".resetBtn");
      btn.simulate("click");
      // expect(component).toMatchSnapshot();
      expect(component.state().count).toBe(10);
    });

    // способ второй: через хендлер кнопки
    it("change count value for handleReset", () => {
      instance.handleReset(20);
      expect(component.state().count).toBe(20);
    });
  })
});
