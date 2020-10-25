import { shallow } from 'enzyme';
import UnitTesting from './UnitTesting';
import { TEST_CODE } from '../../constants/editor';

const ENABLE_EDITOR_ON_HINT = 1;

describe('UnitTesting page', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<UnitTesting />);

    expect(wrapper.find('EditorManager').length).toBe(1);
  });

  test.each([
    `function testeSomarNumerosPositivos() {
      var total = somar(2, 1)
      var esperado = 3;
      return total === esperado;
    }`,
    `function myTestingFunc() {
      var total = somar(100, 100)
      var esperado = 200;
      return total === esperado;
    }`,
  ])('valid code behavior %s', (code) => {
    const wrapper = shallow(<UnitTesting />);
    wrapper.instance().setState({
      currentHint: ENABLE_EDITOR_ON_HINT
    });

    wrapper.instance().onValidCode(code, TEST_CODE);

    expect(wrapper.instance().state.currentHint).toBe(ENABLE_EDITOR_ON_HINT + 1);
  });

  test.each([
    // empty function
    'function testeSomarNumerosPositivos() {}',

    // function that doesn't exists
    `function testeSomarNumerosPositivos() {
      var total = functionThatDoestExits(2, 1)
      var esperado = 3;
      return total === esperado;
    }`,

    // wrong expected value
    `function testeSomarNumerosPositivos() {
      var total = somar(2, 2)
      var esperado = 10;
      return total === esperado;
    }`,

    // always return true
    `function testeSomarNumerosPositivos() {
      var total = somar(2, 2)
      var esperado = 4;
      return true;
    }`,

    // try to bypass the parser
    `function testeSomarNumerosPositivos() {
      var total = true
      var esperado = true;
      return total === esperado;
    }`,

    // arrow func not supported
    `testeSomarNumerosPositivos() => {
      var total = true
      var esperado = true;
      return total === esperado;
    }`,
  ])('invalid code behavior %s', (code) => {
    const wrapper = shallow(<UnitTesting />);
    wrapper.instance().setState({
      currentHint: ENABLE_EDITOR_ON_HINT
    });

    wrapper.instance().onValidCode(code, TEST_CODE);

    expect(wrapper.instance().state.currentHint).toBe(ENABLE_EDITOR_ON_HINT);
  });
});
