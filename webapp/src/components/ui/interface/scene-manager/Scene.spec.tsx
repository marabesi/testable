import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Scene from './Scene';
import Button from '../../buttons/primary/Primary';

describe('Scene component', () => {

  beforeEach(() => {
    jest.useFakeTimers();
    window.localStorage.removeItem('testable.alien.png');
  });

  afterEach(() => {
    window.localStorage.removeItem('testable.alien.png');
    jest.restoreAllMocks();
  });

  test('default props value', () => {
    const wrapper = mount(<Scene />);

    expect(wrapper.props().onCompleted).toEqual({});
    expect(wrapper.props().releaseButton).toEqual(2000);
    expect(wrapper.props().showBuggy).toEqual({});
    expect(wrapper.props().showNextButton).toEqual(900);
  });

  test('by default, does not show up the next button', () => {
    const wrapper = mount(<Scene />);

    expect(wrapper.find(Button).length).toEqual(0);
  });

  test('remove disable from button after finished typing', () => {
    const wrapper = mount(
      <Scene
        text={[ {key: 0, line: 'a'} ]}
        button="just a label"
        showNextButton={1}
      />
    );

    act(() => {
      jest.runAllTimers();
    });

    wrapper.update();

    expect(wrapper.find(Button).props().disabled).toBeFalsy();
  });

  test('by default, does not show alien component', () => {
    const wrapper = mount(<Scene />);

    expect(wrapper.find('AlienSvg').prop('className')).toContain('hidden');
  });

  test('by default, does not show buggy bug component', () => {
    const wrapper = mount(<Scene />);

    expect(wrapper.find('BuggyBug').length).toBe(0);
  });

  test('should show alien component', () => {
    const wrapper = mount(
      <Scene
        showAlien={{}}
      />
    );

    const className: string = wrapper.find('AlienSvg').prop('className') || '';

    expect(className.includes('block')).toBeTruthy();
  });

  test('should show alien component with animation', () => {
    const wrapper = mount(
      <Scene
        showAlien={{
          animate: true
        }}
      />
    );

    expect(wrapper.find('AlienSvg').prop('className')).toContain('slide-in-bck-top');
  });

  test('pass in a custom class to the scene container', () => {
    const wrapper = mount(
      <Scene
        className="custom-class"
        text={[ {key: 0, line: 'my'} ]}
      />
    );

    expect(wrapper.find('div').at(0).hasClass('custom-class')).toBeTruthy();
  });

  test('should show up buggy component after typing', () => {
    const NODE_INDEX = 1;
    const wrapper = mount(
      <Scene
        onCompleted={{showBug: true}}
        text={[ {key: 0, line: 'my'} ]}
      />
    );

    expect(wrapper.find('BuggyLeft').at(NODE_INDEX).prop('className')).toContain('hidden');

    act(() => {
      jest.runAllTimers();
    });

    wrapper.update();

    expect(wrapper.find('BuggyLeft').at(NODE_INDEX).prop('className')).toContain('slide-in-bck-right');
  });

  test('should show up alien character', () => {
    window.localStorage.setItem('testable.alien.png', 'img content');
    const wrapper = mount(
      <Scene
        showAlien={{
          'show': true,
          'animate': false
        }}
        text={[ {key: 0, line: 'my'} ]}
      />
    );

    expect(wrapper.find('img').at(3).prop('src')).toEqual('img content');
  });

  test('should handle last scene', () => {
    const handleLastScene = jest.fn();
    const handleNextScene = jest.fn();

    const wrapper = mount(
      <Scene
        lastScene={true}
        handleLastScene={handleLastScene}
        next={handleNextScene}
        text={[{ key: 0, line: 'my' }]}
        showNextButton={1}
        releaseButton={1}
      />
    );

    act(() => {
      jest.runAllTimers();
    });

    wrapper.update();

    wrapper.find(Button).simulate('click');

    expect(handleLastScene).toHaveBeenCalled();
    expect(handleNextScene).toHaveBeenCalledTimes(0);
  });

  test('should handle next scene', () => {
    const handleLastScene = jest.fn();
    const handleNextScene = jest.fn();

    const wrapper = mount(
      <Scene
        lastScene={false}
        handleLastScene={handleLastScene}
        next={handleNextScene}
        text={[{ key: 0, line: 'my' }]}
        showNextButton={1}
        releaseButton={1}
      />
    );

    act(() => {
      jest.runAllTimers();
    });

    wrapper.update();
    wrapper.find(Button).simulate('click');

    expect(handleLastScene).toHaveBeenCalledTimes(0);
    expect(handleNextScene).toHaveBeenCalled();
  });

  test('should disable button once clicked to prevent firing the event twice', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Scene
        text={[ {key: 0, line: 'my'} ]}
        button="my button"
        next={onClick}
        showNextButton={1}
      />
    );

    act(() => {
      jest.runAllTimers();
    });

    wrapper.update();

    // tries to click 10 times next button
    for (let i = 0; i < 10; i++) {
      act(() => {
        wrapper.find(Button).props().onClick();
      });

      wrapper.update();
    }
    expect(onClick).toBeCalledTimes(1);
  });

  test('should release disable from next button based on releaseButton prop', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Scene
        text={[ {key: 0, line: 'my'} ]}
        button="my button"
        next={onClick}
        showNextButton={1}
        releaseButton={5}
      />
    );

    act(() => {
      jest.runAllTimers();
    });

    wrapper.update();

    expect(wrapper.find(Button).prop('disabled')).toBeFalsy();
  });

  test('should render buggy bug version', () => {
    const wrapper = mount(
      <Scene
        showBuggy={{
          type: 'bug',
        }}
        text={[ {key: 0, line: 'my'} ]}
      />
    );

    expect(wrapper.find('BuggyBug').length).toBe(1);
  });

  test('should render buggy happy version', () => {
    const wrapper = mount(
      <Scene
        showBuggy={{
          type: 'happy',
        }}
        text={[ {key: 0, line: 'my'} ]}
      />
    );

    expect(wrapper.find('BuggyHappy').length).toBe(1);
  });

  test('should apply responsive classes to buggy when animate is set', () => {
    const wrapper = mount(<Scene showBuggy={{ animate: true}} />);
    const buggy = wrapper.find('BuggyLeft').at(0);
    const classes = buggy.prop('className') || '';
    expect(classes.includes('md:slide-in-bck-right')).toBeTruthy();
  });

  test('should apply block class to buggy when buggy prop is true', () => {
    const wrapper = mount(<Scene showBuggy={{}} />);
    const buggy = wrapper.find('BuggyLeft').at(0);
    const classes = buggy.prop('className') || '';
    expect(classes.includes('md:block')).toBeTruthy();
  });

  test('should apply animation class to buggy happy', () => {
    const wrapper = mount(
      <Scene
        onCompleted={{ type: 'happy' }}
        text={[ {key: 0, line: 'my'} ]}
        button="my button"
        showNextButton={1}
      />
    );

    act(() => {
      jest.runAllTimers();
    });

    wrapper.update();

    const buggyHappy = wrapper.find('BuggyHappyLeft');
    const classes = buggyHappy.prop('className') || '';
    expect(classes.includes('md:block md:slide-in-bck-right')).toBeTruthy();
  });
});
