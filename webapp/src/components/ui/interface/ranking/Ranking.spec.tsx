import { vitest } from 'vitest';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Ranking } from './Ranking';

const mockedResponse = {
  data: [
    { name: 'john', level: 89 }
  ]
};

describe('Ranking component', () => {

  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    vitest.useFakeTimers();
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
    vitest.useRealTimers();
  });

  test('should show a friendly intl message if the data fetching fails', async () => {
    global.fetch = () => {
      return Promise.reject('Something went wrong');
    };

    await act(async () => {
      ReactDOM.render(
        <Ranking
          intl={{ messages: { ranking: { error: 'Ocorreu um erro ao carregar o ranking :(' } } }}
        />,
        container
      );
    });

    expect(container.querySelector('h3').innerHTML).toBe('Ocorreu um erro ao carregar o ranking :(');
  });

  test('should render loading component by default', async () => {
    global.fetch = vitest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockedResponse)
      });
    });

    await act(async () => {
      ReactDOM.render(<Ranking />, container);
    });

    expect(container.querySelector('.loading')).toBeFalsy();
  });

  test('should render table header based on intl', async () => {
    global.fetch = vitest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockedResponse)
      });
    });

    await act(async () => {
      ReactDOM.render(
        <Ranking
          intl={{
            messages: {
              ranking: {
                table: {
                  position: 'position',
                  name: 'name',
                  level: 'level'
                }
              }
            }
          }}
        />,
        container
      );
    });

    const headers = container.querySelectorAll('table thead tr th');

    expect(headers[0].innerHTML).toEqual('position');
    expect(headers[1].innerHTML).toEqual('name');
    expect(headers[2].innerHTML).toEqual('level');
  });

  test('should render ranking table with one user', async () => {
    global.fetch = vitest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockedResponse)
      });
    });

    await act(async () => {
      ReactDOM.render(
        <Ranking />,
        container
      );
    });

    const rows = container.querySelectorAll('table tbody tr td');

    expect(rows[0].innerHTML).toEqual('1');
    expect(rows[1].innerHTML).toEqual('john');
  });

  test('should show message when data is empty', async () => {
    global.fetch = vitest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(new Response(''))
      });
    });

    await act(async () => {
      ReactDOM.render(
        <Ranking
          intl={{
            messages: {
              ranking: {
                no_data: 'no data'
              }
            }
          }}
        />,
        container
      );
    });

    expect(container.querySelector('h3').innerHTML).toEqual('no data');
  });
});
