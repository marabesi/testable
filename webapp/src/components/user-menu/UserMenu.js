import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Profile from '../profile/Profile';
import Modal from '../modal/Modal';
import Cup from '../icons/Cup';
import Ranking from '../ranking/Ranking';
import Button from '../../components/scene-manager/Button';
import Survey from '../../components/survey/Survey';
import { auth } from '../../pages/login/Auth';
import {track} from '../../emitter/Tracking';
import { colors } from '../../tailwind';

/* eslint-disable-next-line */
const shoulShowSurvey = process.env.REACT_APP_SHOW_SURVEY || false;
const hideButtonOnLevel = 14;

export class UserMenu extends Component {

  state = {
    ranking: false,
    survey: false
  };

  onRanking = () => {
    this.setState({
      // @ts-ignore
      ...this.state.ranking, ranking: !this.state.ranking
    });
    track({
      section: 'user_menu',
      action: 'toggle_ranking|button_click'
    });
  }

  onSurvey = () => {
    this.setState({
      survey: !this.state.survey
    });
    track({
      section: 'user_menu',
      action: 'toggle_survey|button_click'
    });
  }

  render() {
    return (
      <div className="flex justify-end items-center">
        {
          shoulShowSurvey && this.props.user.level !== hideButtonOnLevel &&
          <Button
            className="mr-5 m-auto"
            description="Responder o questionário"
            onClick={this.onSurvey}
          />
        }

        <Cup
          className="ranking fill-current w-8 h-8 text-white mr-5 hover:text-blue-lightest cursor-pointer"
          onClick={this.onRanking}
        />
        <Profile user={auth.user} />
        <Modal
          title={
            <div>
              <Cup
                style={{ fill: 'none', stroke: colors['blue-lightest'], strokeWidth: '1px'}}
                className="fill-current w-5 h-5 mr-3"
              />
              { this.props.intl.messages.ranking.title }
            </div>
          }
          isOpen={this.state.ranking}
          onClose={this.onRanking}
        >
          <Ranking onClick={this.onRanking} />
        </Modal>
        <Modal
          title={
            <div>
              { this.props.intl.messages.survey.title }
            </div>
          }
          isOpen={this.state.survey}
          onClose={this.onSurvey}
        >
          <Survey onClick={this.onSurvey} className="mt-8" />
        </Modal>
      </div>
    );
  }
}

UserMenu.propTypes = {
  user: PropTypes.object,
  intl: PropTypes.object,
  onNotification: PropTypes.func
};

UserMenu.defaultProps = {
  intl: {
    messages: {
      ranking: {},
      survey: {}
    }
  }
};

export default injectIntl(UserMenu);
