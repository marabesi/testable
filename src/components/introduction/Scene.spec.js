import React from 'react';
import Scene from './Scene';
import { shallow, mount } from 'enzyme';

describe('Scene component', () => {
  it('by default, does not show up the next button', () => {
    const wrapper = shallow(<Scene />);

    expect(wrapper.state().showNextButton).toBeFalsy();
  });

  test('should show up next button', done => {
    const wrapper = mount(<Scene text={[ {key: 0, line: 'my'} ]} />);

    setTimeout(() => {
      expect(wrapper.state().showNextButton).toBeTruthy();
      done();
    }, 1500);
  });
});
