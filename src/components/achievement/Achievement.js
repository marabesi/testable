import * as React from 'react';
import PropTypes from 'prop-types';
import achievements from './achievements-content';
import Close from '../icons/Close';
import Title from '../title/Title';
import { track } from '../../emitter/Tracking';
import { auth } from '../../pages/login/Auth';

export default class Achievement extends React.Component {

  state = {
    achievements: achievements
  }

  componentDidMount() {
    if (this.props.achievements.length > 0) {
      this.setState({
        achievements: this.props.achievements
      });
    }
  }

  /**
  * @param {Number} index 
  */
  showAchievement = (index) => {
    const current = this.state.achievements;
    const selected = current[index];
    const active = !selected.active;

    selected.active = active;

    current[index] = selected;

    this.setState({
      ...this.state.achievements, current
    });

    track({
      section: 'achievements',
      action: `toggle_achievement_${index}|button_click`,
      value: active,
    });
  }

  render() {
    const achievements = [];

    for (const [index, achievement] of this.state.achievements.entries()) {
      if (auth.user.level >= achievement.level) {
        achievements.push(
          <li key={index} className="p-2">
            <ul className="p-1">
              <h3 className="hover:underline cursor-pointer" onClick={() => this.showAchievement(index)}>
                {achievement.title}
              </h3>
              <li className={`ml-5 mt-2 ${achievement.active ? '' : 'hidden'}`}>
                <span>{achievement.description}</span>
              </li>
            </ul>
          </li>
        );
      }
    }

    return (
      <React.Fragment>
        <Title>
          Conquistas
          <Close className="fill-current w-4 h-4 text-white cursor-pointer" onClick={this.props.onClose} />
        </Title>

        { achievements.length === 0 && <span className="p-5 text-white">A lista de conquista está vazia</span> }

        <ul className="p-2 text-white">
          {achievements}
        </ul>
      </React.Fragment>
    );
  }
}

Achievement.propTypes = {
  /**
   * Callback invoked when the close button is clicked
   */
  onClose: PropTypes.func,
  /**
   * The achievements array to display.
   */
  achievements: PropTypes.array,
};

Achievement.defaultProps = {
  achievements: [],
};