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
        <Profile user={this.props.user}/>
        <Profile user={{displayName:'asdiasjdi isdjiadjisajdia aisj'}}/>
        <Profile user={{displayName:'asduhausd uashduashdua usdahuasdhaushd uadshau'}}/>
        <Profile user={{displayName:'nome grande de exemplo iuashaiush shussusu sira'}}/>
        <Profile user={{displayName:'test'}}/>

        <br/>

        <Level progress="10" level="1"/>
        <Level progress="70" level="10"/>
        <Level progress="40" level="3"/>
        <Level progress="90" level="685"/>
        <Level progress="100" level="1123685"/>

        <br/>
        <br/>
        <br/>
      </div>
    )
  }
}