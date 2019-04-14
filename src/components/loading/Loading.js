import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export default class Loading extends Component {

  render() {
    return (
      <div className="login absolute">
        <Helmet>
          <style>
            {`
              body {
                background-image: url("assets/bg-loading.png"), linear-gradient(#0a3366, #007eff, #6cf7e5);
                background-position: center center;
                height: 100vh;
              }
            `}
          </style>
        </Helmet>
        <h1 className={this.props.loading ? 'uppercase text-5xl text-white' : 'hidden'}>
          Load<span style={{ color: '#04edf6' }}>ing...</span>
        </h1>
      </div>
    );
  }
}