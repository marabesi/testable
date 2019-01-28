import React, { Component } from 'react';

import './level.scss';

export default class Level extends Component {

    render() {
        return (
            <div className="level">
                <h1 className="title">level {this.props.level}</h1>
                <div className="progress-holder">
                    <div className={'progress progress-' + this.props.progress}></div>
                </div>
            </div>
        );
    }
}