import { mount } from 'enzyme';
import { Survey } from './Survey';
import { auth } from '../../../../pages/login/Auth';
import Button from '../../buttons/primary/Primary';

describe('Survey page', () => {

  test('should show up message when survey url is not defined',() => {
    const wrapper = mount(<Survey user={{ uid: 'uhiuqwqw-k-woqk-wq--qw' }} />);
    const text = wrapper.find('h1').text();
    expect(text).toEqual('Carregando questionário...');
  });

  test('should not load survey when user id is missing', () => {
    const wrapper = mount(<Survey user={{ }} />);
    const text = wrapper.find('h1').text();
    expect(text).toEqual('Ocorreu um erro ao carregar o questionário');
  });
  test('load survey passing user id as a parameter in the query string', () => {
    const user = { uid: 'uhiuqwqw-k-woqk-wq--qw' };

    const wrapper = mount(<Survey user={user} />);
    const url = wrapper.find('iframe').prop('src');
    expect(url.includes(auth.user.uid)).toBe(true);
  });

  test('should not up button when it is loading', () => {
    const user = { uid: 'uhiuqwqw-k-woqk-wq--qw' };

    const wrapper = mount(<Survey user={user} />);
    expect(wrapper.find(Button).length).toBe(0);
  });

  test('should not up button when skip prop is not set', () => {
    const user = { uid: 'uhiuqwqw-k-woqk-wq--qw' };

    const wrapper = mount(<Survey user={user} />);
    expect(wrapper.find(Button).length).toBe(0);
  });

  test('show up button when loading is done and skip prop is true', () => {
    const user = { uid: 'uhiuqwqw-k-woqk-wq--qw' };

    const wrapper = mount(<Survey user={user} skip={true} />);
    wrapper.setState({
      loading: false
    });
    expect(wrapper.find(Button).length).toBe(1);
  });
});
