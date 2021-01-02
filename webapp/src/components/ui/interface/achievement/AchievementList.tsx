// @ts-nocheck
import { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AchievementItem as Item } from './types';
import AchievementItem from './AchievementItem';
import { track } from '../../../../packages/emitter/Tracking';

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

export const AchievementList = (props: { achievements: Item[] }) => {
  const [achievements, setAchievements] = useState<Item[]>([]);
  const handleAchievements = () => {
    if (props.achievements.length) {
      setAchievements(props.achievements);
    }
  };

  useEffect(handleAchievements);

  const showAchievement = index => {
    const current = Object.assign([], props.achievements);
    const selected = current[index];
    const active = !selected.active;

    selected.active = active;

    current[index] = selected;

    setAchievements(current);

    track({
      section: 'achievements',
      action: `toggle_achievement_${index}|button_click`,
      value: active,
    });
  };

  const achievementsToRender = [];

  for (const [index, achievement] of achievements.entries()) {
    if (props.user.level >= achievement.level) {
      achievementsToRender.push(
        <AchievementItem
          key={index}
          title={achievement.title}
          description={achievement.description}
          items={achievement.items || []}
          active={achievement.active}
          onClick={() => showAchievement(index)}
        />
      );
    }
  }

  if (achievementsToRender.length === 0) {
    return (
      <span className="p-5 text-white">
        {props.intl.messages.achievements.empty_list}
      </span>
    );
  }

  return (
    <ul className="p-2 text-white">
      {achievementsToRender}
    </ul>
  );
};

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
