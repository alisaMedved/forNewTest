import React from "react";
import Posts from "./posts";
import {
  NEWS,
  BASE_PATH,
  SEARCH_PATH,
  SEARCH_PARAM,
  PAGE_HITS,
  PAGE_PARAM,
} from "./constants";
import {jest} from "@jest/globals";

// mock запроса
// вот { hits: NEWS, page: 1, nbPages: 10 } - это то что прислал нам сервер - ну мы его замокали
const mockJsonPromise = Promise.resolve({ hits: NEWS, page: 1, nbPages: 10 });
const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

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

  it("should call fetch in componentDidMount", () => {
    expect(global.fetch).toHaveBeenCalledWith(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${""}&${PAGE_HITS}${20}&${PAGE_PARAM}${0}`)
  });

  describe("updatePage method", () => {

    // чтобы страница в state менялась при изменении в Pagination
    it("should update state 'page' value during call updatePage", () => {
      instance.updatePage(DEFAULT_PAGE);
      expect(component.state().page).toBe(DEFAULT_PAGE);
    });

it("should call fetch during call updatePage", () => {
  instance.updatePage(DEFAULT_PAGE);
  expect(global.fetch).toHaveBeenCalledWith(
    `${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${""}&${PAGE_HITS}${20}&${PAGE_PARAM}${DEFAULT_PAGE}`)
});
  });

  describe("handlePageChange method", () => {

    describe("should call updatePage with given argument during call handlePageChange", () => {

      it("should call updatePage with given argument", () => {
        // мокаем функцию updatePage
        instance.updatePage = jest.fn();
        // устанавливаем в state дефолтное значение
        instance.setState({page: DEFAULT_PAGE});
        // вот этой запутанной строкой мы добиваемся того чтобы вызвался handlePageChange
        // с таким аргументом при котором btnType := 1
        // особое внимание mockReturnValue
        instance.handlePageChange({target: {getAttribute: jest.fn().mockReturnValue(1)}});
        // правильно - должен сработать первый if и будет вызов
        //       this.updatePage(+btnType);
        expect(instance.updatePage).toHaveBeenCalledWith(1);
      });

      it("should call updatePage with increase page", () => {
        instance.updatePage = jest.fn();
        instance.setState({page: DEFAULT_PAGE});
        instance.handlePageChange({target: {getAttribute: jest.fn().mockReturnValue("next")}});
        expect(instance.updatePage).toHaveBeenCalledWith(DEFAULT_PAGE + 1);
      });

      it("should call updatePage with decrease page", () => {
        instance.updatePage = jest.fn();
        instance.setState({page: DEFAULT_PAGE});
        instance.handlePageChange({target: {getAttribute: jest.fn().mockReturnValue("prev")}});
        expect(instance.updatePage).toHaveBeenCalledWith(DEFAULT_PAGE - 1);
      });
    });

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
