//@ts-nocheck
import PropTypes from 'prop-types';
import SceneManager from './SceneManager';
import Emitter, { LEVEL_UP } from '../../../../packages/emitter/Emitter';

const WrappedSceneContentManager = (
  identifier,
  content,
  redirectTo
) => {
  const SceneContentManager = props => {
    const handleLastScene = () => {
      if (props.handleLastScene) {
        props.handleLastScene();
        return;
      }

      Emitter.emit(LEVEL_UP, {
        tutorial: true,
      });

      props.history.push(redirectTo);
    };

    return (
      <SceneManager
        className={props.className}
        identifier={identifier}
        content={content}
        handleLastScene={handleLastScene}
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