//@ts-nocheck
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './background.scss';

const mapStateToProps = state => ({
  options: state.optionsReducer.options,
  user: state.userReducer.user,
});

export const Background = props =>
  <>
    {
      !props.user.uid &&
      <div className="path">
        <div className="comet"></div>
      </div>
    }
    <div className={props.options.animation ? 'stars' : 'stars-only'}></div>
    {props.children}
  </>;

Background.propTypes = {
  children: PropTypes.node,
  options: PropTypes.object,
  user: PropTypes.object,
};

Background.defaultProps = {
  options: {},
  user: {},
};

export default connect(mapStateToProps)(Background);