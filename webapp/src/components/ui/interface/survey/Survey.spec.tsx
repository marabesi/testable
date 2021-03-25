import { mount } from 'enzyme';
import { Survey } from './Survey';
import { auth } from '../../../../pages/login/Auth';
import Button from '../../buttons/primary/Primary';
import { User } from '../../../../packages/types/User';
import Emitter, { LEVEL_UP } from '../../../../packages/emitter/Emitter';

describe('Survey page', () => {

  const surveyUrl: string = 'http://localhost';
  const user: User = {
    email: '',
    introduction: false,
    level: 0,
    name: '',
    photo: '',
    progress: 0,
    tutorial: false,
    uid: 'uhiuqwqw-k-woqk-wq--qw'
  };

  test('should show up message when survey url is not defined',() => {
    const wrapper = mount(<Survey user={user} surveyUrl={surveyUrl} />);
    const text = wrapper.find('h1').text();

    expect(text).toEqual('Carregando questionário...');
  });

  test('should not load survey when user does not exists', () => {
    const wrapper = mount(<Survey />);

    const text = wrapper.find('h1').text();

    expect(text).toEqual('Ocorreu um erro ao carregar o questionário');
  });

  test('load survey passing user id as a parameter in the query string', () => {
    const wrapper = mount(<Survey user={user} surveyUrl={surveyUrl} />);
    const url: string = wrapper.find('iframe').prop('src') || '';

    expect(url.includes(auth.user.uid)).toBe(true);
  });

  test('should not up button when it is loading', () => {
    const wrapper = mount(<Survey user={user} />);

    expect(wrapper.find(Button).length).toBe(0);
  });

  test('should not up button when skip prop is not set', () => {
    const wrapper = mount(<Survey user={user} />);

    expect(wrapper.find(Button).length).toBe(0);
  });

  test('show up button when loading is done and skip prop is true', () => {
    const wrapper = mount(<Survey user={user} skip={true} surveyUrl={surveyUrl} />);

    wrapper.find('iframe').simulate('load');

    expect(wrapper.find(Button).length).toBe(1);
  });

  test('level up when skipping the survey', () => {
    const listener = jest.fn();
    Emitter.addListener(LEVEL_UP, listener);

    const wrapper = mount(<Survey user={user} skip={true} surveyUrl={surveyUrl} />);

    wrapper.find('iframe').simulate('load');
    wrapper.find(Button).simulate('click');

    expect(listener).toHaveBeenCalled();
  });
});
