// @ts-nocheck
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AchievementItem from './AchievementItem';
import { track } from '../../emitter/Tracking';
import { auth } from '../../pages/login/Auth';

export default class AchievementList extends Component {

  state = {
    achievements: []
  };

  componentDidMount() {
    const { achievements } = this.props;

    if (achievements.length) {
      this.setState({
        achievements
      });
    }
  }

  showAchievement = index => {
    const current = this.props.achievements;
    const selected = current[index];
    const active = !selected.active;

    selected.active = active;

    current[index] = selected;

    this.setState({
      ...this.props.achievements, current
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
          <AchievementItem
            key={index}
            title={achievement.title}
            description={achievement.description}
            active={achievement.active}
            onClick={() => this.showAchievement(index)}
          />
        );
      }
    }

    if (achievements.length === 0) {
      return (
        <span className="p-5 text-white">Você não possui nenhuma conquista até o momento</span>
      );
    }

    return (
      <ul className="p-2 text-white">
        {achievements}
      </ul>
    );
  }
}

AchievementList.propTypes = {
  achievements: PropTypes.array
};

AchievementList.defaultProps = {
  achievements: []
};