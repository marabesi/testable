import React from 'react';
import { shallow } from 'enzyme';
import Rocket02 from './Rocket02';
import { TEST_CODE } from '../../constants/editor';

const ENABLE_EDITOR_ON_HINT = 3;

describe('Rocket 02 page', () => {
  test('mount rocket 02 component', () => {
    const wrapper = shallow(<Rocket02 />);

    expect(wrapper.find('EditorManager').length).toBe(1);
  });

  test.each([
    `function testeDeveRemoverAtravaDoTremDePouso() {
      var total = subtrairTravaDoTremDePouso(2, 1)
      var esperado = 1;
      return total === esperado;
    }`,
    `function testMyFuncSub() {
      var total = subtrairTravaDoTremDePouso(-2, 1)
      var esperado = -3;
      return total === esperado;
    }`,
  ])('valid code behavior %s', (code) => {
    const wrapper = shallow(<Rocket02 />);
    wrapper.instance().setState({
      currentHint: ENABLE_EDITOR_ON_HINT
    });

    wrapper.instance().onValidCode(code, TEST_CODE);

    expect(wrapper.instance().state.currentHint).toBe(ENABLE_EDITOR_ON_HINT + 1);
  });

  test.each([
    // empty function
    'function testeDeveRemoverAtravaDoTremDePouso() {}',

    // assert against wrong value
    `function testeDeveRemoverAtravaDoTremDePouso() {
      var total = subtrairTravaDoTremDePouso(2, 1)
      var esperado = 4;
      return total === esperado;
    }`,

    // assert true
    `function testeDeveRemoverAtravaDoTremDePouso() {
      var total = true
      var esperado = true;
      return total === esperado;
    }`,
  ])('invalid code behavior %s', (code) => {
    const wrapper = shallow(<Rocket02 />);
    wrapper.instance().setState({
      currentHint: ENABLE_EDITOR_ON_HINT
    });

    wrapper.instance().onValidCode(code, TEST_CODE);

    expect(wrapper.instance().state.currentHint).toBe(ENABLE_EDITOR_ON_HINT);
  });
});