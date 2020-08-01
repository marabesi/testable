import React from 'react';
import { shallow } from 'enzyme';
import Rocket01 from './Rocket01';
import { TEST_CODE } from '../../constants/editor';

const ENABLE_EDITOR_ON_HINT = 3;

describe('Rocket 01 page', () => {
  test('mount rocket 01 component', () => {
    const wrapper = shallow(<Rocket01 />);

    expect(wrapper.find('EditorManager').length).toBe(1);
  });

  test.each([
    `function testDeveMultiplicarMotor() {
      var total = multiplicarMotor(2, 1)
      var esperado = 2;
      return total === esperado;
    }`,
    `function testMyFuncMult() {
      var total = multiplicarMotor(-2, 1)
      var esperado = -2;
      return total === esperado;
    }`,
  ])('valid code behavior %s', (code) => {
    const wrapper = shallow(<Rocket01 />);
    wrapper.instance().setState({
      currentHint: ENABLE_EDITOR_ON_HINT
    });

    wrapper.instance().onValidCode(code, TEST_CODE);

    expect(wrapper.instance().state.currentHint).toBe(ENABLE_EDITOR_ON_HINT + 1);
  });

  test.each([
    // empty function
    'function testDeveMultiplicarMotor() {}',

    // assert against wrong value
    `function testDeveMultiplicarMotor() {
      var total = multiplicarMotor(2, 1)
      var esperado = 4;
      return total === esperado;
    }`,

    // assert true
    `function testDeveMultiplicarMotor() {
      var total = true
      var esperado = true;
      return total === esperado;
    }`,
  ])('invalid code behavior %s', (code) => {
    const wrapper = shallow(<Rocket01 />);
    wrapper.instance().setState({
      currentHint: ENABLE_EDITOR_ON_HINT
    });

    wrapper.instance().onValidCode(code, TEST_CODE);

    expect(wrapper.instance().state.currentHint).toBe(ENABLE_EDITOR_ON_HINT);
  });
});