import content from './introduction-content.json';
import WrappedSceneContentManager from '../../components/ui/interface/scene-manager/SceneContentManager';

export default WrappedSceneContentManager(
  'introduction',
  content,
  'tutorial'
);
