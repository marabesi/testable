import React from 'react';
import { Guide } from './Guide';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

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

  test('should handle next buton click action', () => {
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
});