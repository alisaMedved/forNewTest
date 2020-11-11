import React from "react";
import Info from "./info";
import {shallow} from "enzyme";
import {jest} from "@jest/globals";


// мы создаем шпионов-отслеживателей вызовов методов жизненного цикла компонента
// кстати с помощью таких оберток можно восоздать и сами методы
const componentDidMountSpy = jest.spyOn(Info.prototype, "componentDidMount");
const componentDidUpdateSpy = jest.spyOn(Info.prototype, "componentDidUpdate");
const componentWillUnmountSpy = jest.spyOn(
  Info.prototype,
  "componentWillUnmount"
);

const setUp = () => shallow(<Info />);


describe("Info component", () => {
  let component;

 beforeEach(() => {
   // а здесь мы следим за вызовами методов addEventListener и removeEventListener
   jest.spyOn(window, "addEventListener");
   jest.spyOn(window, "removeEventListener");
   // строгий порядок - это правило! Сначало создаешь наблюдателей и только потом
   // отрисовываешь компонент
   component = setUp();
 });

  afterEach(() => {
    // после всех тестов мы сбрасываем записанные данные во время отрабатывания тестов
    window.addEventListener.mockRestore;
    window.removeEventListener.mockRestore;
  });

  it("should render Info component", () => {
    expect(component).toMatchSnapshot();
  });

  describe("lifeCycels Methods", () => {
    it("componentDidMount calls once", () => {
      // смотрим чтобы метод componentDidMount вызывался лишь однажды
      // и используем для этого нашу обертку componentDidMountSpy
      expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
    });

    it("should not call componentWillUnmount when component just mounted", () => {
      // простая и дефолтная по мне проверка
      // чтобы при вызове componentDidMount не вызывался componentWillUnmount
      expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
      expect(componentWillUnmountSpy).toHaveBeenCalledTimes(0);
    });

    it("should call componentDidUpdate", () => {
      // а дейсвительно ли вызывается componentDidUpdate при
      // изменении пропсов компонента

      // с помощью метода setProps можно даже пропсы у компонента менять
      component.setProps();

      expect(componentDidUpdateSpy).toHaveBeenCalled();
    });

    it("should call componentWillUnmount", () => {
      // проверяем что при размонтировании компонента вызывается метод
      // componentWillUnmount

      // делаем размонтирование компонента
      component.unmount();
      expect(componentWillUnmountSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Info handlers", () => {

    it("should call addEventListener in componentDidMount", () => {
      // вешается ли обработчик resize при монтаже компонента componentDidMount

      // ну реализация этой проверки логичная раз componentDidMount должен вызываться
      // лишь единожды то и метод addEventListener должен был вызваться единожды
      expect(window.addEventListener).toHaveBeenCalledTimes(1);
    });

    it("should call handleChangeTitle in componentDidUpdate", () => {
      const instance = component.instance();
      instance.handleChangeTitle = jest.fn();
      instance.componentDidUpdate();
      expect(instance.handleChangeTitle).toHaveBeenCalled();
    });

    it("should call removeEventListener in componentWillMount", () => {
      // удаляется ли обработчик resize при демонтаже компонента
      component.unmount();
      expect(window.removeEventListener).toHaveBeenCalledTimes(1);
    });

    it("should call handleWidth during resize window", () => {
      // проверяем вызывается ли метод handleWidth и меняет ли он значение
      // в state при малейшем изменении экрана

      expect(component.state().width).toBe(0);

      // а теперь самое интересное - вызвать ресайз
      global.dispatchEvent(new Event("resize"));
      expect(component.state().width).toBe(window.innerWidth);
    });
  });
});
