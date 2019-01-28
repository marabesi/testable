import React, { Component } from 'react';
import Button from './Button';

import './scene.scss';

export default class Scene extends Component {

    render() {
        return (
            <div className="scene">
                {this.props.text}

                <Button description={this.props.button}/>
            </div>
        );
    }
}