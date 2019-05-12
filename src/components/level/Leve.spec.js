import React from 'react';
import Level from './Level';
import { shallow } from 'enzyme';

describe('Level component', () => {

  it('should render user level', () => {
    const wrapper = shallow(<Level level={2} />);
    const level = wrapper.find('h1').text();

    expect(level).toBe('level 2');
  });

  describe.each([[10], [20], [30], [40], [50], [60], [70], [80], [90], [100]])(
    'user progress bar',
    (progress) => {
      it('should render user progress through css class (progress: %i)',() => {
        const wrapper = shallow(<Level progress={progress} />);
        expect(wrapper.find(`.progress-${progress}`).length).toEqual(1);
      });

      it('should render user progress in percentage (progress: %i)',() => {
        const wrapper = shallow(<Level progress={progress} />);
        expect(wrapper.find(`[title="${progress} %"]`).length).toEqual(1);
      });
    }
  );
});
