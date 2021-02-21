import { ReactElement } from 'react';
import AchievementList from './AchievementList';
import Achievement from '../../icons/Achievement';
import Close from '../../icons/Close';
import Title from '../title/Title';
import { colors } from '../../../../tailwind';
import { User } from '../../../../packages/types/User';

interface Props {
  intl: any;
  /**
   * Callback invoked when the close button is clicked
   */
  onClose: any;
  /**
   * Logged in user object
   */
  user: User
}

const AchievementContainer = ({ intl, onClose, user }: Props): ReactElement => (
  <>
    <Title>
      <div>
        <Achievement
          className="fill-current w-6 h-6 text-blue mr-3"
          style={{ fill: 'none', stroke: colors['blue-lightest'], strokeWidth: '20px'}}
        />
        {intl.messages.achievements.title}
      </div>
      <Close className="fill-current w-4 h-4 text-white cursor-pointer" onClick={onClose} />
    </Title>

    {
      intl.messages.achievements.list.length === 0 &&
      <span className="p-5 text-white">
        {intl.messages.achievements.empty_list}
      </span>
    }

    {
      intl.messages.achievements.list.length > 0 &&
      <AchievementList
        achievements={intl.messages.achievements.list}
        intl={intl}
        user={user}
      />
    }
  </>
);

export default AchievementContainer;
