import React, { Component } from 'react';
import SurveyModal from '../../components/survey/Survey';

export default class Survey extends Component {
  render() {
    return (
      <SurveyModal skip={true} />
    );
  }
}