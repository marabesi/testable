import { shallow } from 'enzyme';
import { Options } from './Options';

describe('options menu component', () => {
  test('dispatch action on change selected language', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <Options setUpdateOptions={onClick} intl={{ messages: { global:{}, options: {}}}}  />
    );

    wrapper.find('input').simulate('click', {target: { value : true}});

    expect(onClick).toHaveBeenCalledWith({ animation: true })
  });
});