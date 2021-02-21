import { useState, useEffect, ReactElement } from 'react';
import { AchievementItem as Item } from './types';
import AchievementItem from './AchievementItem';
import { track } from '../../../../packages/emitter/Tracking';
import { User } from '../../../../packages/types/User';

interface Props {
  achievements: Item[];
  user: User;
  intl: any;
}

export const AchievementList = (props: Props) => {
  const [achievements, setAchievements] = useState<Item[]>([]);
  const handleAchievements = () => {
    if (props.achievements.length) {
      setAchievements(props.achievements);
    }
  };

  useEffect(handleAchievements);

  const showAchievement = (index: number) => {
    const current: Item[] = Object.assign([], props.achievements);
    const selected: Item = current[index];
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

  const achievementsToRender: ReactElement<Item>[] = [];

  for (const [index, achievement] of achievements.entries()) {
    if (props.user.level >= achievement.level) {
      achievementsToRender.push(
        <AchievementItem
          key={index}
          title={achievement.title}
          description={achievement.description}
          items={achievement.items || []}
          active={achievement.active}
          level={props.user.level}
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

AchievementList.defaultProps = {
  user: {},
  achievements: [],
  intl: {
    messages: {
      achievements: {}
    }
  }
};

export default AchievementList;
