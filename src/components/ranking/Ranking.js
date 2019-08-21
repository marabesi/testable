import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../loading/Loading';

/* eslint-disable */
const RANKING_API = process.env.REACT_APP_RANKING_API;
/* eslint-enable */

export default class Ranking extends Component {

  state = {
    ranking: [],
    loading: true,
    error: ''
  };

  componentDidMount() {
    // @ts-ignore
    fetch(RANKING_API)
      .then(response => response.json())
      .then(ranking => {
        this.setState({ ranking: ranking.data });
      })
      .catch(() => {
        const currentState = Object.assign({}, this.state);
        currentState.error = 'Ocorreu um erro ao carregar o ranking :(';
        this.setState(currentState);
      })
      .finally(() => {
        const currentState = Object.assign({}, this.state);
        currentState.loading = false;
        this.setState(currentState);
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading />
      );
    }

    const users = [];

    this.state.ranking.forEach((user, index) => {
      users.push(
        // @ts-ignore
        <li key={index}>{ user.name } { user.level }</li>
      );
    });

    return (
      <React.Fragment>
        { this.state.error && <h3 className="text-white">{this.state.error}</h3>}
        <ul className="text-white">
          { users }
        </ul>
      </React.Fragment>
    );
  }
}

Ranking.propTypes = {
  onRanking: PropTypes.func
};
