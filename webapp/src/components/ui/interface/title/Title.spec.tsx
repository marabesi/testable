import { render as mount } from '@testing-library/react';
import Title from './Title';

describe('title component', () => {
  test('should render title as a string', () => {
    const { getByText } = mount(
      <Title>
        my title
      </Title>
    );
    expect(getByText('my title')).toBeInTheDocument();
  });

  test('should render title with raw html elements', () => {
    const { getByText } = mount(
      <Title>
        <div>my title</div>
      </Title>
    );

    expect(getByText('my title')).toBeInTheDocument();
  });
});
