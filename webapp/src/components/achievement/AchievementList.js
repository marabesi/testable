// @ts-nocheck
import React, {Component} from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AchievementItem from './AchievementItem';
import { track } from '../../emitter/Tracking';

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

export class AchievementList extends Component {

  state = {
    achievements: []
  };

  componentDidMount = () => this.handleAchievements(this.props)

  UNSAFE_componentWillReceiveProps = props => this.handleAchievements(props)

  handleAchievements = (props) => {
    const { achievements } = props;

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
      if (this.props.user.level >= achievement.level) {
        achievements.push(
          <AchievementItem
            key={index}
            title={achievement.title}
            description={achievement.description}
            items={achievement.items || []}
            active={achievement.active}
            onClick={() => this.showAchievement(index)}
          />
        );
      }
    }

    if (achievements.length === 0) {
      return (
        <span className="p-5 text-white">
          {this.props.intl.messages.achievements.empty_list}
        </span>
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
  user: PropTypes.object,
  intl: PropTypes.object,
  achievements: PropTypes.array,
};

AchievementList.defaultProps = {
  user: {},
  achievements: [],
  intl: {
    messages: {
      achievements: {}
    }
  }
};

export default injectIntl(connect(mapStateToProps)(AchievementList));