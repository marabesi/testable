import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Introduction from './Introduction';
import SceneManager from '../../components/ui/interface/scene-manager/SceneManager';
import IntlProvider from '../../third-party/wrappers/i18n/IntlProvider';

describe('Introduction page', () => {
  test('should define route to redirect to when done', () => {
    const history = {
      push: jest.fn()
    };

    const wrapper = mount(
      <BrowserRouter>
        <IntlProvider locale="en">
          <Introduction
            history={history}
          />
        </IntlProvider>;
      </BrowserRouter>
    );

    wrapper.find(SceneManager).props().handleLastScene();

    wrapper.update();

    expect(history.push).toBeCalledWith('tutorial');
  });
});
