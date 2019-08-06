import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { Guide } from './Guide';

const content = [
  { line: 'my text' },
  { line: 'line 2' },
  { line: 'last' },
];

describe('guide component', () => {
  test('should start with next button hidden', () => {
    const wrapper = shallow(<Guide guideContent={content} />);

    expect(wrapper.find('button').length).toEqual(0);
  });

  test('should show up next button', () => {
    const wrapper = mount(
      <Guide
        guideContent={content}
        currentHint={0}
        showNext={true}
      />
    );

    expect(wrapper.find('button').length).toEqual(1);
  });

  test('should handle next button click action', () => {
    const progress = sinon.spy();
    const onHover = sinon.spy();
    const wrapper = mount(
      <Guide
        guideContent={content}
        currentHint={0}
        showNext={true}
        handleProgress={progress}
        onHover={onHover}
      />
    );

    wrapper.find('button').simulate('click');

    expect(progress.called).toBeTruthy();
  });

  test('should dispatch hover action when hovering the next button', () => {
    const onHover = sinon.spy();
    const progress = sinon.spy();
    const wrapper = mount(
      <Guide
        guideContent={content}
        currentHint={0}
        showNext={true}
        handleProgress={progress}
        onHover={onHover}
      />
    );
    wrapper.find('button').simulate('mouseenter');
    expect(onHover.calledWith(true)).toBeTruthy();

    wrapper.find('button').simulate('mouseleave');
    expect(onHover.calledWith(false)).toBeTruthy();
  });

  test('should not toggle next class if button is hovered', () => {
    const progress = sinon.spy();
    const wrapper = mount(
      <Guide
        guideContent={content}
        currentHint={0}
        showNext={true}
        handleProgress={progress}
        hovered={true}
      />
    );
    expect(wrapper.find('.next').length).toBe(0);
  });
});