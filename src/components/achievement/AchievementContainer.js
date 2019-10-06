import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AchievementList from './AchievementList';
import achievements from './achievements-content';
import Achievement from '../icons/Achievement';
import Close from '../icons/Close';
import Title from '../title/Title';
import { colors } from '../../tailwind';

export default class AchievementContainer extends Component {

  state ={
    achievements: []
  }

  componentDidMount() {
    this.setState({
      achievements: achievements
    });
  }

  render() {
    return (
      <>
        <Title>
          <div>
            <Achievement
              className="fill-current w-6 h-6 text-blue mr-3"
              style={{ fill: 'none', stroke: colors['blue-lightest'], strokeWidth: '20px'}}
            />
            Conquistas
          </div>
          <Close className="fill-current w-4 h-4 text-white cursor-pointer" onClick={this.props.onClose} />
        </Title>

        {this.state.achievements.length === 0 && <span className="p-5 text-white">A lista de conquista está vazia</span>}

        {this.state.achievements.length > 0 && <AchievementList achievements={this.state.achievements} />}
      </>
    );
  }
}

AchievementContainer.propTypes = {
  /**
   * Callback invoked when the close button is clicked
   */
  onClose: PropTypes.func,
};