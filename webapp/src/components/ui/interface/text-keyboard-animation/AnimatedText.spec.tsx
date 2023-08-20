import AnimatedText from './AnimatedText';
import { mountApp } from '../../../../__test__/mount';

describe('animated text component', () => {
  test('receive text via props', () => {
    const wrapper = mountApp(<AnimatedText text={[]}/>);
    const texts = wrapper.find('TypedText').prop('strings');
    expect(texts).toEqual(['']);
  });

  test('render translation key when no translation is found', () => {
    const wrapper = mountApp(
      <AnimatedText
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
