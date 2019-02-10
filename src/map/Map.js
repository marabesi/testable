import React, { Component } from 'react';
import Profile from '../profile/Profile';
import Tutorial from '../tutorial/Tutorial';
import Level from '../level/Level';

export default class Map extends Component {

  render() {
    if (this.props.isTutorial) {
      return (
        <Tutorial/>
      );
    }

    return (
      <div className="flex">
        <div className="user-info">
          <Profile user={this.props.user}/>
        </div>

        <div className="user-progress">
          <Level progress="10" level="1"/>
        </div>
        <br/>
        <br/>
        <br/>
      </div>
    )
  }
}