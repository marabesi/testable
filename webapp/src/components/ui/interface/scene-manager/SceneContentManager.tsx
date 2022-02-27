import PropTypes from 'prop-types';
import SceneManager  from './SceneManager';
import Emitter, { LEVEL_UP } from '../../../../packages/emitter/Emitter';

export interface SceneContent {
  line: string;
  style: string;
}

export interface SceneItem {
  button: string;
  step: Number;
  lastScene?: boolean;
  showAlien?: CharacterBehavior;
  content: SceneContent[];
  onCompleted?: { showBug: boolean };
}

export interface CharacterBehavior {
  animate?: boolean;
  show?: boolean;
}

export interface InteractiveContent {
  version: number;
  steps: SceneItem[]
}

const WrappedSceneContentManager = (
  identifier: string,
  content: InteractiveContent,
  redirectTo: string,
) => {
  const SceneContentManager = ({ handleLastScene, history, className }) => {
    const lastScene = () => {
      if (handleLastScene) {
        handleLastScene();
        return;
      }

      Emitter.emit(LEVEL_UP, {
        tutorial: true,
      });

      history.push(redirectTo);
    };

    return (
      <SceneManager
        className={className}
        identifier={identifier}
        content={content}
        handleLastScene={lastScene}
      />
    );
  };

  SceneContentManager.propTypes = {
    history: PropTypes.object,
    handleLastScene: PropTypes.func,
    className: PropTypes.string,
  };

  return SceneContentManager;
};

export default WrappedSceneContentManager;