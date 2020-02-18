import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Loading from '../loading/Loading';

/* eslint-disable */
const RANKING_API = process.env.REACT_APP_RANKING_API;
/* eslint-enable */

export class Ranking extends Component {

  state = {
    ranking: [],
    loading: true,
    error: ''
  };

  componentDidMount() {
    fetch(RANKING_API)
      .then(response => response.json())
      .then(ranking => {
        this.setState({ ranking: ranking.data || [] });
      })
      .catch(() => {
        const currentState = Object.assign({}, this.state);
        currentState.error = this.props.intl.messages.ranking.error;
        this.setState(currentState);
      })
      .finally(() => {
        const currentState = Object.assign({}, this.state);
        currentState.loading = false;
        this.setState(currentState);
      });
  }

  render() {
    if (this.state.error) {
      return (
        <h3 className="text-white flex justify-center mt-5">{this.state.error}</h3>
      );
    }

    if (this.state.loading) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

    if (this.state.ranking.length === 0) {
      return (
        <h3 className="text-white flex justify-center mt-5">{this.props.intl.messages.ranking.no_data}</h3>
      );
    }

    const users = [];

    this.state.ranking.forEach((user, index) => {
      users.push(
        <tr key={index} className={index === 0 ? 'text-xl font-bold bg-testable-pink' : ''}>
          <td className="p-2">{ index + 1 }</td>
          <td className="p-2">{ user.name }</td>
          <td className="p-2">{ user.level }</td>
        </tr>
      );
    });

    return (
      <table className="text-white m-auto w-3/5">
        <thead>
          <tr>
            <th className="text-left p-2 captalize">{this.props.intl.messages.ranking.table.position}</th>
            <th className="text-left p-2 captalize">{this.props.intl.messages.ranking.table.name}</th>
            <th className="text-left p-2 captalize">{this.props.intl.messages.ranking.table.level}</th>
          </tr>
        </thead>
        <tbody>
          { users }
        </tbody>
      </table>
    );
  }
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