import { mount } from 'enzyme';
import AnimatedText from './AnimatedText';

describe('animated text component', () => {
  test('receive text via props', () => {
    const wrapper = mount(<AnimatedText intl={{}} text={[]}/>);
    const texts = wrapper.find('TypedText').prop('strings');
    expect(texts).toEqual(['']);
  });

  test('render html to be typed', () => {
    const wrapper = mount(
      <AnimatedText
        intl={{
          messages: {
            my_translation_text: '<p>my text to be typed</p>'
          }
        }}
        text={[
          {
            line: 'my_translation_text',
            key: 1,
          }
        ]}
      />
    );
    const texts = wrapper.find('TypedText').prop('strings');
    expect(texts).toEqual(['<p>&lt;p&gt;my text to be typed&lt;/p&gt;</p>']);
  });

  test('render translation key when no translation is found', () => {
    const wrapper = mount(
      <AnimatedText
        intl={{
          messages: {}
        }}
        text={[
          {
            line: 'my_translation_text',
            key: 1,
          }
        ]}
      />
    );
    const texts = wrapper.find('TypedText').prop('strings');
    expect(texts).toEqual(['<p>my_translation_text</p>']);
  });
});