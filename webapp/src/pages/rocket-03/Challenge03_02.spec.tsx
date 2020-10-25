import { shallow } from 'enzyme';
import Challenge03_02 from './Challenge03_02';
import { TEST_CODE, SOURCE_CODE } from '../../constants/editor';

const ENABLE_EDITOR_ON_HINT = 3;

describe('Rocket 03 challenge 02 page', () => {
  test.each([
    // empty function
    'function testeDividirGpsEmDuasPartes() {}',

    // assert against wrong value
    `function testeDividirGpsEmDuasPartes() {
      var total = dividirGps(2, 1)
      var esperado = 4;
      return total === esperado;
    }`,

    // assert true
    `function testeDividirGpsEmDuasPartes() {
      var total = true
      var esperado = true;
      return total === esperado;
    }`,

    // assert true
    `function testeDividirGpsEmDuasPartes() {
      return true
    }`,
  ])('invalid test code behavior %s (division by zero test case)', (testCode) => {
    const wrapper = shallow(<Challenge03_02 />);
    wrapper.instance().setState({
      currentHint: ENABLE_EDITOR_ON_HINT
    });

    wrapper.instance().onValidCode(testCode, TEST_CODE);

    expect(wrapper.instance().state.currentHint).toBe(ENABLE_EDITOR_ON_HINT);
  });

  test.each([
    // simple division function
    `function division(a, b) {
      return a /b;
    }`,
    //handles only first parameter with zero
    `function division(a, b) {
      if (a === 0) {
        return false;
      }
      return a / b;
    }`,
    //handles only second parameter with zero
    `function division(a, b) {
      if (b === 0) {
        return false;
      }
      return a /b;
    }`,
    // check zero against wrong variables
    `function division(a, b) {
      let c, d;
      if (c === 0 || d === 0) {
        return false;
      }
      return a / b;
    }`,
    // not division function after if
    `function division(a, b) {
      if (a === 0 || b === 0) {
        return false;
      }
      return '';
    }`,
  ])('invalid source code behavior (division by zero)', (sourceCode) => {
    const wrapper = shallow(<Challenge03_02 />);
    wrapper.instance().setState({
      currentHint: ENABLE_EDITOR_ON_HINT
    });

    wrapper.instance().onValidCode(sourceCode, SOURCE_CODE);

    expect(wrapper.instance().state.currentHint).toBe(ENABLE_EDITOR_ON_HINT);
  });

  test.each([
    // handles division by zero
    [
      `function division(a, b) {
        if (a === 0) {
          return false;
        }
        if (b === 0) {
          return false;
        }
        return a /b;
      }`,
      `function testeDividirGpsEmDuasPartes() {
        var total = division(2, 1)
        var esperado = 2;
        return total === esperado;
      }`,
    ],
    [
      `function division(a, b) {
        if (a === 0 || b === 0) {
          return false;
        }
        return a / b;
      }`,
      `function testeDividirGpsEmDuasPartes() {
        var total = division(2, 1)
        var esperado = 2;
        return total === esperado;
      }`,
    ],
  ])('valid source code behavior and valid test code behavior (division by zero)', (sourceCode, testCode) => {
    const wrapper = shallow(<Challenge03_02 />);
    wrapper.instance().setState({
      currentHint: ENABLE_EDITOR_ON_HINT
    });

    wrapper.instance().onValidCode(sourceCode, SOURCE_CODE);
    wrapper.instance().onValidCode(testCode, TEST_CODE);
    wrapper.update();

    expect(wrapper.instance().state.currentHint).toBe(ENABLE_EDITOR_ON_HINT + 1);
  });
});