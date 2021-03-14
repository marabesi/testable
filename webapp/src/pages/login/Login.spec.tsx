import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Login } from './Login';
import LanguageSelector from '../../components/ui/interface/language-selector/LanguageSelector';
import ProviderIntl from '../../third-party/wrappers/i18n/IntlProvider';
import { store } from '../../__test__/withReduxProvider';

const buildComponent = (props: any) => {
  return shallow(
    <BrowserRouter>
      <Login
        {...props}
      />
    </BrowserRouter>
  );
};

describe('Login page behavior', () => {
  test('should load firebase container', () => {
    const wrapper = mount(
      <ProviderIntl locale='en'>
        <Provider store={store}>
          <BrowserRouter>
            <Login
              setUser={jest.fn()}
              user={undefined}
            />
          </BrowserRouter>
        </Provider>
      </ProviderIntl>
    );

    expect(wrapper.find('#firebaseui-auth-container').length).toBe(1);
  });

  test('should render <LanguageSelector />', () => {
    const wrapper = mount(
      <ProviderIntl locale='en'>
        <Provider store={store}>
          <BrowserRouter>
            <Login
              setUser={jest.fn()}
              user={undefined}
            />
          </BrowserRouter>
        </Provider>
      </ProviderIntl>
    );

    expect(wrapper.find(LanguageSelector).length).toBe(1);
  });

  describe('user logged in already', () => {
    test('should redirect if already logged in', () => {
      const login = buildComponent({
        onLoading: () => { },
        setUser: () => { },
        user: { uid: 999 }
      }).find('Login').dive();

      expect(login.find('Redirect').length).toBe(1);
    });

    test('should fill in logged user data', () => {
      const setUser = jest.fn();
      const login = buildComponent({ setUser }).find('Login').dive();
      login.instance().authStatusChanged({ email: 'test@test.com' });

      expect(setUser).toBeCalledWith({ email: 'test@test.com' });
    });
  });
});

