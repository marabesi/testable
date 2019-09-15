//@ts-nocheck
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
          <th className="text-left p-2">Posição</th>
          <th className="text-left p-2">Nome</th>
          <th className="text-left p-2">Level</th>
        </thead>
        <tbody>
          { users }
        </tbody>
      </table>
    );
  }
}

Ranking.propTypes = {
  onRanking: PropTypes.func
};
