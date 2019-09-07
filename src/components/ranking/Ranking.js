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

    const users = [];

    this.state.ranking.forEach((user, index) => {
      users.push(
        // @ts-ignore
        <li key={index} className={ index === 0 ? 'text-xl font-bold' : ''}>{ user.name } { user.level }</li>
      );
    });

    return (
      <ul className="list-reset text-white flex flex-col justify-center items-center">
        { users }
      </ul>
    );
  }
}

Ranking.propTypes = {
  onRanking: PropTypes.func
};
