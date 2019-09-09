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

  describe('guide image behavior', () => {
    test('should show SvgBuggy by default as guide image', () => {
      const wrapper = mount(
        <Guide
          guideContent={content}
          currentHint={0}
          showNext={false}
        />
      );
      expect(wrapper.find('SvgBuggy').length).toBe(1);
    });

    test('should show SvgBuggyBug when the code is invalid', () => {
      const wrapper = mount(
        <Guide
          guideContent={content}
          currentHint={0}
          showNext={false}
          invalidCode={true}
        />
      );
      expect(wrapper.find('SvgBuggyBug').length).toBe(1);
    });

    test('should show SvgBuggySleepy when the user is afk', done => {
      const wrapper = mount(
        <Guide
          guideContent={content}
          currentHint={0}
          showNext={false}
          invalidCode={false}
          afkExpirationTime={0}
        />
      );

      setTimeout(() => {
        wrapper.update();
        expect(wrapper.find('SvgBuggySleepy').length).toBe(1);
        wrapper.unmount();
        done();
      }, 100);
    });

    test('should show SvgBuggy on user interaction by keyboard', done => {
      const wrapper = mount(
        <Guide
          guideContent={content}
          currentHint={0}
          showNext={false}
          invalidCode={false}
          afkExpirationTime={400}
        />
      );
      setTimeout(() => {
        wrapper.update();
        expect(wrapper.find('SvgBuggySleepy').length).toBe(1);

        // @ts-ignore
        const keypress = new KeyboardEvent('keydown', {keyCode: 37});
        document.dispatchEvent(keypress);

        wrapper.update();

        expect(wrapper.find('SvgBuggySleepy').length).toBe(0);
        done();
      }, 500);
    });

    test('should show SvgBuggyHappy', () => {

    });
  });
});