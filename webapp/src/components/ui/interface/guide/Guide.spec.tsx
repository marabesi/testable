import { vitest } from 'vitest';
import { shallow, mount } from 'enzyme';
import { Guide } from './Guide';

const content = [
  { line: 'my_text' },
  { line: 'line_2' },
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
    const progress = vitest.fn();
    const onHover = vitest.fn();
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

    expect(progress).toHaveBeenCalled();
  });

  test('should dispatch hover action when hovering the next button', () => {
    const onHover = vitest.fn();
    const progress = vitest.fn();
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
    expect(onHover).toHaveBeenCalledWith(true);

    wrapper.find('button').simulate('mouseleave');
    expect(onHover).toHaveBeenCalledWith(false);
  });

  test('should not toggle next class if button is hovered', () => {
    const progress = vitest.fn();
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
    test('should show Buggy by default as guide image', () => {
      const wrapper = mount(
        <Guide
          guideContent={content}
          currentHint={0}
          showNext={false}
        />
      );
      expect(wrapper.find('Buggy').length).toBe(1);
    });

    test('should show BuggyBug when the code is invalid', () => {
      const wrapper = mount(
        <Guide
          guideContent={content}
          currentHint={0}
          showNext={false}
          invalidCode={true}
        />
      );
      expect(wrapper.find('BuggyBug').length).toBe(1);
    });

    test('should show BuggySleepy when the user is afk', () => new Promise(done => {
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
        expect(wrapper.find('BuggySleepy').length).toBe(1);
        wrapper.unmount();
        done();
      }, 100);
    }));

    test('should show Buggy on user interaction by keyboard', () => new Promise(done => {
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
        expect(wrapper.find('BuggySleepy').length).toBe(1);


        const keypress = new KeyboardEvent('keydown', {keyCode: 37});
        document.dispatchEvent(keypress);

        wrapper.update();

        expect(wrapper.find('BuggySleepy').length).toBe(0);
        done();
      }, 500);
    }));
  });
});
