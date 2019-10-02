import React from 'react';
import { shallow } from 'enzyme';
import Challenge03_02 from './Challenge03_02';
import { TEST_CODE } from '../../constants/editor';

const ENABLE_EDITOR_ON_HINT = 3;

describe('Rocket 02 page', () => {
  test('mount rocket 01 component', () => {
    const wrapper = shallow(<Challenge03_02 />);

    expect(wrapper.find('EditorManager').length).toBe(1);
  });

  test.each([
    `function testeNaoAceitarDivisaoPorZero() {
      var total = dividirGps(2, 1)
      var esperado = 2;
      return total === esperado;
    }`,
    `function testMyFuncDiv() {
      var total = dividirGps(-2, -1)
      var esperado = 2;
      return total === esperado;
    }`,

    // division by zero
    `function testeDividirGpsEmDuasPartes() {
      var total = dividirGps(0, 1)
      var esperado = false;
      return total === esperado;
    }`,
  ])('valid code behavior %s', (code) => {
    const wrapper = shallow(<Challenge03_02 />);
    wrapper.instance().setState({
      currentHint: ENABLE_EDITOR_ON_HINT
    });

    wrapper.instance().onValidCode(code, TEST_CODE);

    expect(wrapper.instance().state.currentHint).toBe(ENABLE_EDITOR_ON_HINT + 1);
  });

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
  ])('invalid code behavior %s', (code) => {
    const wrapper = shallow(<Challenge03_02 />);
    wrapper.instance().setState({
      currentHint: ENABLE_EDITOR_ON_HINT
    });

    wrapper.instance().onValidCode(code, TEST_CODE);

    expect(wrapper.instance().state.currentHint).toBe(ENABLE_EDITOR_ON_HINT);
  });
});