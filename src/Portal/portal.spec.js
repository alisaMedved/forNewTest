import React from "react";
import ReactDOM from "react-dom";
import Portal from "./Portal";
import { shallow } from "enzyme";

// создаем оболочки-шпионы за методами жизненного циикла
const componentDidMountSpy = jest.spyOn(Portal.prototype, "componentDidMount");
const componentWillUnmountSpy = jest.spyOn(
  Portal.prototype,
  "componentWillUnmount"
);

// рендерим компонент + указываем дочернею разметку которую принимает портал
const setUp = () =>
  shallow(
    <Portal>
      <div>webDev</div>
    </Portal>
  );

describe("Portal component", () => {
  let component;

  beforeEach(() => {
    // вешаем шпионов-оболочки для методов
    jest.spyOn(document.body, "appendChild").mockImplementation(() => {});
    jest.spyOn(document.body, "removeChild").mockImplementation(() => {});
    component = setUp();
  });

  afterEach(() => {
    document.body.appendChild.mockRestore();
    document.body.removeChild.mockRestore();
  });

  // beforeAll и afterEach - это хак против бага тестирования портала
  // issue в react репозитории заведено

  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
  });

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });

  // тупо проверяем прорендерена ли та самая разметка портала которую мы завели для него
  it("should render Portal component", () => {
    expect(component).toMatchSnapshot();
  });

  // проверяем вызываются ли методы appendChild и removeChild в
  // соответствующих методах жиненного цикла
  it("should call appendChild when component mounted", () => {
    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
  });

  it("should call removeChild when component unmounted", () => {
    component.unmount();
    expect(document.body.removeChild).toHaveBeenCalledTimes(1);
  });
});
