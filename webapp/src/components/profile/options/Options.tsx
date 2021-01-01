//@ts-nocheck
import { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import LanguageSelector from '../../language-selector/LanguageSelector';
import { setUpdateOptions } from '../../../actions/optionsAction';

const mapDispatchToProps = dispatch => ({
  setUpdateOptions: options => dispatch(setUpdateOptions(options))
});

const mapStateToProps = state => ({
  options: state.optionsReducer.options,
});

export class Options extends Component {

  onUpdateOptions = () => {
    const animation = !this.props.options.animation;
    this.props.setUpdateOptions({
      animation
    });
  }

  render() {
    const { intl } = this.props;
    return (
      <table className="text-white m-auto w-3/5">
        <thead>
          <tr>
            <th className="captilize text-left p-2">{intl.messages.global.options}</th>
            <th className="text-left p-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-testable-pink">
            <td className="p-3">{intl.messages.options.language}</td>
            <td className="p-3" align="center">
              <LanguageSelector />
            </td>
          </tr>
          <tr className="hover:bg-testable-pink">
            <td className="p-3">{intl.messages.options.background_animation}</td>
            <td className="p-3" align="center">
              <input type="checkbox" onClick={this.onUpdateOptions} readOnly={true} value="1" checked={`${this.props.options.animation ? 'checked' : ''}`} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

Options.propTypes = {
  setUpdateOptions: PropTypes.func,
  options: PropTypes.object,
  intl: PropTypes.object,
};

Options.defaultProps = {
  options: {},
  intl: {
    messages: {
      global: {},
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Options));