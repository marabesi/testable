import { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Loading from '../loading/Loading';
import config from '../../../../config';
import { User } from '../../../../packages/types/User';

export function Ranking(props) {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(config.rankingApi)
      .then(response => response.json())
      .then(ranking => {
        setRanking(ranking.data || []);
      })
      .catch(() => {
        setError(props.intl.messages.ranking.error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <h3 className="text-white flex justify-center mt-5">{error}</h3>
    );
  }

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (ranking.length === 0) {
    return (
      <h3 className="text-white flex justify-center mt-5">{props.intl.messages.ranking.no_data}</h3>
    );
  }

  const users: any[] = [];

  ranking.forEach((user: User, index) => {
    users.push(
      <tr key={index} className={index === 0 ? 'text-xl font-bold bg-testable-pink' : ''}>
        <td className="p-2">{index + 1}</td>
        <td className="p-2">{user.name}</td>
        <td className="p-2">{user.level}</td>
      </tr>
    );
  });

  return (
    <table className="text-white m-auto w-3/5">
      <thead>
        <tr>
          <th className="text-left p-2 captalize">{props.intl.messages.ranking.table.position}</th>
          <th className="text-left p-2 captalize">{props.intl.messages.ranking.table.name}</th>
          <th className="text-left p-2 captalize">{props.intl.messages.ranking.table.level}</th>
        </tr>
      </thead>
      <tbody>
        {users}
      </tbody>
    </table>
  );
}

Ranking.propTypes = {
  onRanking: PropTypes.func,
  intl: PropTypes.object,
};

Ranking.defaultProps = {
  intl: {
    messages: {
      ranking: {
        table: {}
      }
    }
  }
};

export default injectIntl(Ranking);