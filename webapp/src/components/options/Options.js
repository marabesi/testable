import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { setLocale } from '../../actions/localeAction';
import { setUpdateOptions } from '../../actions/optionsAction';

import '@formatjs/intl-relativetimeformat/polyfill-locales';

const mapDispatchToProps = dispatch => {
  return {
    setLocale: locale => dispatch(setLocale(locale)),
    setUpdateOptions: options => dispatch(setUpdateOptions(options))
  };
};

const mapStateToProps = state => ({
  options: state.optionsReducer.options,
  locale: state.localeReducer.locale,
});

export class Options extends Component {

  onChange = event => {
    this.props.setLocale(event.target.value);
  }

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
            <th className="captilize text-left p-2">{ intl.messages.global.options }</th>
            <th className="text-left p-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-testable-pink">
            <td className="p-3">{ intl.messages.options.language }</td>
            <td className="p-3" align="center">
              <select onChange={this.onChange} value={this.props.locale}>
                <option value="en">{ intl.messages.options.languages.en }</option>
                <option value="pt-br">{ intl.messages.options.languages['pt-br'] }</option>
              </select>
            </td>
          </tr>
          <tr className="hover:bg-testable-pink">
            <td className="p-3">{ intl.messages.options.background_animation }</td>
            <td className="p-3" align="center">
              <input type="checkbox" onClick={this.onUpdateOptions} readOnly={true} value="1" checked={`${this.props.options.animation ? 'checked' : ''}`}/>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

Options.propTypes = {
  setLocale: PropTypes.func,
  setUpdateOptions: PropTypes.func,
  options: PropTypes.object,
  locale: PropTypes.string,
  intl: PropTypes.object,
};

Options.defaultProps = {
  options: {},
  locale: 'pt-br',
  intl: {
    messages: {
      options: {
        languages: {}
      },
      global: {},
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Options));