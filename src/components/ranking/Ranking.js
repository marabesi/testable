import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { auth } from '../../pages/login/Auth';

export default class Ranking extends Component {

  state = {
    ranking: []
  };

  componentDidMount() {
    const query = auth.usersRef().orderByChild('level').limitToLast(10);
    query.once('value', snapshot => {
      const data = _.map(snapshot.val(), (v, k) => {
        return _.merge({}, v, { key: k });
      });
      const ranking = _.sortBy(data, ['level']).reverse();
      this.setState({ ranking: ranking });
    });
  }

  render() {
    const users = [];

    this.state.ranking.forEach((user, index) => {
      users.push(
        // @ts-ignore
        <li key={index}>{ user.name } { user.level }</li>
      );
    });

    return (
      <React.Fragment>
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
