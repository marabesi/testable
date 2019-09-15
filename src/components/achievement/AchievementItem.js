//@ts-nocheck
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AchievementItem extends Component {

  render() {
    const { title, active, description, items, onClick } = this.props;
    const list = items.map((item, index) => <li key={index}>{ item }</li>);
    return (
      <li className="p-2">
        <ul className="p-1">
          <h3 className="hover:underline cursor-pointer" onClick={onClick}>
            {title}
          </h3>
          <li className={`ml-5 mt-2 ${active ? '' : 'hidden'}`}>
            <span>{description}</span>
            <ul className="mt-2">
              { list }
            </ul>
          </li>
        </ul>
      </li>
    );
  }
}

AchievementItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  items: PropTypes.array,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

AchievementItem.defaultProps = {
  items: []
};
