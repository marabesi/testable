import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton, } from 'react-share';

export function AchievementItem(props) {
  const { title, active, description, items, onClick, intl, host } = props;
  const list = items.map((item, index) => <li key={index}>{item}</li>);
  return (
    <li className="p-2">
      <ul className="p-1">
        <h3 className="hover:underline cursor-pointer" onClick={onClick}>{title}</h3>
        <li className={`ml-5 mt-2 ${active ? '' : 'hidden'}`}>
          <span>{description}</span>
          <ul className="mt-2">{list}</ul>
          <div className="flex">
            <FacebookShareButton
              url={host}
              quote={`${intl.messages.achievements.social_sharing} ${title} - ${description}`}
              className="m-1 ml-0"
            >
              <FacebookIcon
                size={32}
                round />
            </FacebookShareButton>
            <TwitterShareButton
              url={host}
              title={`${intl.messages.achievements.social_sharing} ${title} - ${description}`}
              className="m-1"
            >
              <TwitterIcon
                size={32}
                round />
            </TwitterShareButton>
          </div>
        </li>
      </ul>
    </li>
  );
}

AchievementItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  items: PropTypes.array,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  intl: PropTypes.object,
  host: PropTypes.string
};

AchievementItem.defaultProps = {
  items: [],
  intl: {
    messages: {
      achievements: {}
    }
  },
  host: process.env.REACT_APP_HOST || window.location.origin
};

export default injectIntl(AchievementItem);