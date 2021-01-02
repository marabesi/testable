//@ts-nocheck
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../../buttons/primary/Primary';
import Emitter, { LEVEL_UP } from '../../../../packages/emitter/Emitter';
import config from '../../../../config';

import '../../scss/shake-horizontal.scss';
import './survey.scss';

const survey = config.surveyUrl;

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

export class Survey extends Component {

  state = {
    surveyUrl: '',
    loading: true,
    buttonDescription: 'Responder o questionário depois, quero descobrir o que é TDD!'
  }

  componentDidMount() {
    if (survey) {
      const surveyUrl = survey.replace('{id}', this.props.user.uid);
      this.setState({
        surveyUrl: surveyUrl
      });
    }
  }

  onSurveyLoaded = () => {
    this.setState({ loading: false });
  }

  skipSurvey = () => {
    Emitter.emit(LEVEL_UP);
  }

  render() {
    if (this.props.user.uid && survey) {
      return (
        <div className={`w-full ${this.props.className}`}>
          {
            this.state.loading &&
            <div className="flex justify-center items-center text-white">
              <h1>Carregando questionário...</h1>
            </div>
          }

          <iframe
            style={{ height: '65vh', width: '100%' }}
            src={this.state.surveyUrl}
            title="survey form"
            onLoad={this.onSurveyLoaded}
          />

          {
            !this.state.loading && this.props.skip &&
            <Button
              className="block mt-5 m-auto"
              description={this.state.buttonDescription}
              onClick={this.skipSurvey}
            />
          }
        </div>
      );
    }

    return (
      <div className="flex justify-center items-center text-white">
        <h1 className="shake-horizontal">Ocorreu um erro ao carregar o questionário</h1>
      </div>
    );
  }
}

Survey.propTypes = {
  user: PropTypes.object,
  skip: PropTypes.bool,
  className: PropTypes.string
};

Survey.defaultProps = {
  user: {},
  skip: false
};

export default connect(mapStateToProps)(Survey);