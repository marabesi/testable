import React, { Component } from 'react';
import Button from './Button';
import AnimatedText from '../text-keyboard-animation/AnimatedText';

import './scene.scss';

export default class Scene extends Component {

	render() {
		const className = `scene flex flex-col items-start py-10 px-10 ${this.props.className ? this.props.className: ''}`;

		return (
			<div className={className}>

				<div className="content">
					<AnimatedText text={this.props.text}/>
				</div>


				<Button className="mt-10" description={this.props.button}/>
			</div>
		);
	}
}