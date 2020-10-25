import { shallow } from 'enzyme';
import UnitTestingIntro from './UnitTestingIntro';
import { TEST_CODE } from '../../constants/editor';

const ENABLE_EDITOR_ON_HINT = 999;

describe('Unit testing intro page', () => {
  test.each([
    `function testeDeveRemoverAtravaDoTremDePouso() {
      var total = subtrair(2, 1)
      var esperado = 1;
      return total === esperado;
    }`,
    `function testMyFuncSub() {
      var total = subtrair(-2, 1)
      var esperado = -3;
      return total === esperado;
    }`,
  ])('valid code behavior %s', code => {
    const wrapper = shallow(<UnitTestingIntro />);
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
      var total = subtrair(2, 1)
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
    const wrapper = shallow(<UnitTestingIntro />);
    wrapper.instance().setState({
      currentHint: ENABLE_EDITOR_ON_HINT
    });

    wrapper.instance().onValidCode(code, TEST_CODE);

    expect(wrapper.instance().state.currentHint).toBe(ENABLE_EDITOR_ON_HINT);
  });
});
