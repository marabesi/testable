import ReactDOM from 'react-dom';
import {vitest} from 'vitest';

vitest.mock('react-dom', () => ({ render: vitest.fn() }));

describe('Application root', () => {
  test.skip('should render without crashing', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    require('./index');
    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
