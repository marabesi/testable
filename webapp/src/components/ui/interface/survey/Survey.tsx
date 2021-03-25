import { Component } from 'react';
import Button from '../../buttons/primary/Primary';
import Emitter, { LEVEL_UP } from '../../../../packages/emitter/Emitter';
import { User } from '../../../../packages/types/User';
import config from '../../../../config';

import '../../../../scss/shake-horizontal.scss';
import './survey.scss';

interface Props {
  user?: User,
  skip?: boolean,
  className?: string,
  surveyUrl?: string,
}

export class Survey extends Component<Props> {

  state = {
    surveyUrl: config.surveyUrl,
    loading: true,
    buttonDescription: 'Responder o questionário depois, quero descobrir o que é TDD!'
  }

  componentDidMount() {
    const surveyUrl = this.props.surveyUrl;
    const user = this.props.user;

    if (surveyUrl && user) {
      this.setState({
        surveyUrl: surveyUrl.replace('{id}', user.uid)
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
    const user = this.props.user;

    if (user && user.uid && this.props.surveyUrl) {
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

