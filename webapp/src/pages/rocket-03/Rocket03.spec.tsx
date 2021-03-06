import { shallow } from 'enzyme';
import Rocket03 from './Rocket03';
import { TEST_CODE } from '../../components/ui/interface/editor-manager/constants';

const ENABLE_EDITOR_ON_HINT = 3;

describe('Rocket 02 page', () => {
  test('mount rocket 01 component', () => {
    const wrapper = shallow(<Rocket03 />);

    expect(wrapper.find('EditorManager').length).toBe(1);
  });

  test.each([
    `function testeDividirGpsEmDuasPartes() {
      var total = dividirGps(2, 1)
      var esperado = 2;
      return total === esperado;
    }`,
    `function testMyFuncDiv() {
      var total = dividirGps(-2, -1)
      var esperado = 2;
      return total === esperado;
    }`,
  ])('valid code behavior %s', (code) => {
    const wrapper = shallow(<Rocket03 />);
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
    const wrapper = shallow(<Rocket03 />);
    wrapper.instance().setState({
      currentHint: ENABLE_EDITOR_ON_HINT
    });

    wrapper.instance().onValidCode(code, TEST_CODE);

    expect(wrapper.instance().state.currentHint).toBe(ENABLE_EDITOR_ON_HINT);
  });
});