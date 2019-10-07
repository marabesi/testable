import content from './completed-content.json';

import WrappedSceneContentManager from '../../components/scene-manager/SceneContentManager';

export default WrappedSceneContentManager(
  'completed',
  content,
  'survey'
);
