import React from "react";
import Posts from "./posts";

// а в каком методе мы тестируем хендлеры и изменения стейта - достаточно shallow
const setUp = () => shallow(<Posts />);

describe("Posts component", () => {
  const DEFAULT_PAGE = 10;
  let component;
  let instance;

  beforeEach(() => {
    component = setUp();
    // instance() это метод который возвращает нам сам комонент мы после
    // можем экспериментировать с его жизненными методами
    instance = component.instance();
  });

  it("should render Post", () => {
  expect(component).toMatchSnapshot();
  });

  describe("Post handlers", () => {
    it("should handle search input value", () => {
      // проверяем что перед запуском хендлера значение реально пустое в стейте
      expect(component.state().searchQuery).toBe("");
      // вот здесь мы через instance достаем хендлер
      instance.handleInputChange({ target: { value: "test" } });
      // а вот через component достаем со state
      expect(component.state().searchQuery).toBe("test");
    });

    it("should handle hits page value", () => {
      // второй хендлер по аналогии
      expect(component.state().hitsPerPage).toBe(20);
      instance.handleHitsChange({ target: { value: String(DEFAULT_PAGE) } });
      expect(component.state().hitsPerPage).toBe(DEFAULT_PAGE);
    });

    it("should change page if clicked button is ENTER", () => {
      // заметь ты вообще могла initial value в state сама назначить в тесте
      // итого логика проверки полностью инкапсулирована в state
      instance.setState({page: DEFAULT_PAGE});
      instance.getSearch({key: "Enter"});
      expect(component.state().page).toBe(0);
    });

    it("should not change page if clicked button is a", () => {
      instance.setState({page: DEFAULT_PAGE});
      instance.getSearch({key: "a"});
      expect(component.state().page).toBe(DEFAULT_PAGE);
    });

  });
});
