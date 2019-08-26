import React from 'react';
import { mount } from 'enzyme';
import Achievement from './Achievement';
import { auth } from '../../pages/login/Auth';

describe('Achievement component', () => {
  it('should render title', () => {
    const wrapper = mount(<Achievement />);
    wrapper.setState({
      achievements: []
    });

    expect(wrapper.find('h1').text()).toEqual('Conquistas');
  });

  it('should show up empty message when there is no achievements', () => {
    const wrapper = mount(<Achievement />);
    wrapper.setState({
      achievements: []
    });

    expect(wrapper.find('span').text()).toEqual('A lista de conquista está vazia');
  });

  describe('behavior based on the user level', () => {
    beforeEach(() => {
      auth.user.level = 1;
    });

    it('should render achievement title', () => {
      const wrapper = mount(<Achievement />);
      wrapper.setState({
        achievements: [
          {
            title: 'Desafio aceito',
            description: [
              'Vamos construir um foguete!'
            ],
            level: 1,
            active: false
          },
        ]
      });

      expect(wrapper.find('ul h3').text()).toEqual('Desafio aceito');
    });

    it('should render achievement description once clicked', () => {
      const wrapper = mount(<Achievement />);
      wrapper.setState({
        achievements: [
          {
            title: 'Desafio aceito',
            description: [
              'Vamos construir um foguete!'
            ],
            level: 1
          },
        ]
      });

      expect((wrapper.find('ul h3 + li').prop('className')|| []).includes('hidden')).toBeTruthy();

      wrapper.find('ul h3').simulate('click');

      expect((wrapper.find('ul h3 + li').prop('className') || []).includes('hidden')).toBeFalsy();
      expect(wrapper.find('ul h3 + li').text()).toEqual('Vamos construir um foguete!');
    });

    it('should not show achievement with higher level than the user', () => {
      const wrapper = mount(<Achievement />);
      wrapper.setState({
        achievements: [
          {
            title: 'Desafio aceito',
            description: [
              'Vamos construir um foguete!'
            ],
            level: 2,
          },
        ]
      });

      expect(wrapper.find('span').text()).toEqual('A lista de conquista está vazia');
    });
  });

  it('should render achievements via achievements prop', () => {
    const wrapper = mount(
      <Achievement
        achievements={[
          {
            title: 'my title',
            description: 'my desc',
            level: 0,
          }
        ]}
      />
    );

    expect(wrapper.find('ul h3').text()).toEqual('my title');
    expect(wrapper.find('ul li span').text()).toEqual('my desc');
  });
});
