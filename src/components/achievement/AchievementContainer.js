import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AchievementList from './AchievementList';
import achievements from './achievements-content';
import Close from '../icons/Close';
import Title from '../title/Title';

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
      <React.Fragment>
        <Title>
          Conquistas
          <Close className="fill-current w-4 h-4 text-white cursor-pointer" onClick={this.props.onClose} />
        </Title>

        {this.state.achievements.length === 0 && <span className="p-5 text-white">A lista de conquista está vazia</span>}

        {this.state.achievements.length > 0 && <AchievementList achievements={this.state.achievements} />}
      </React.Fragment>
    );
  }
}

AchievementContainer.propTypes = {
  /**
   * Callback invoked when the close button is clicked
   */
  onClose: PropTypes.func,
};