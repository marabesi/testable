import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../../scss/shake-horizontal.scss';
import './survey.scss';

/* eslint-disable-next-line */
const survey = process.env.REACT_APP_SURVEY_URL || '';

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

export class Survey extends Component {

  state = {
    surveyUrl: '',
    loading: true
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
    this.setState({
      // @ts-ignore
      ...this.state.loading, loading: false
    });
  }

  render() {
    if (this.props.user.uid && survey) {
      return (
        <div className="w-full">
          {
            this.state.loading && 
            <div className="flex justify-center items-center text-white">
              <h1>Carregando questionário...</h1>
            </div>
          }

          <iframe
            style={ { height: '65vh', width: '100%' } }
            src={this.state.surveyUrl}
            title="survey form"
            onLoad={this.onSurveyLoaded}
          />
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
};

Survey.defaultProps = {
  user: {}
};

export default connect(mapStateToProps)(Survey);