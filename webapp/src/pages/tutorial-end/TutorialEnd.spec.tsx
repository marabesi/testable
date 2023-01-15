import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import TutorialEnd from './TutorialEnd';
import SceneManager from '../../components/ui/interface/scene-manager/SceneManager';
import IntlProvider from '../../third-party/wrappers/i18n/IntlProvider';

describe('TutorialEnd page', () => {
  const BuildComponent = (props: any) =>
    <BrowserRouter>
      <IntlProvider locale="en">
        <TutorialEnd {...props} />
      </IntlProvider>
    </BrowserRouter>;

  test('render without crashing', () => {
    const wrapper = mount(<BuildComponent />);

    expect(wrapper.find('SceneManager').length).toBe(1);
  });

  test('should not render debug button by default', () => {
    const wrapper = mount(<BuildComponent />);

    expect(wrapper.find('DebugButton').length).toBe(0);
  });

  test('should redirect to unit testing intro page when done', () => {
    const history = {
      push: vitest.fn()
    };
    const wrappedWithRouter = mount(
      <BuildComponent history={history}/>
    );

    wrappedWithRouter.find(SceneManager).props().handleLastScene();

    wrappedWithRouter.update();

    expect(history.push).toBeCalledWith('unit-testing-intro');
  });
});
