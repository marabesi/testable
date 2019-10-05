// @ts-nocheck
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
    return (
      <table className="text-white m-auto w-3/5">
        <thead>
          <tr>
            <th className="text-left p-2">Opções</th>
            <th className="text-left p-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-testable-pink">
            <td className="p-3">Idioma</td>
            <td className="p-3" align="center">
              <select value="pt-br" onChange={this.onChange}>
                <option value="en">Inglês</option>
                <option value="pt-br">Português</option>
              </select>
            </td>
          </tr>
          <tr className="hover:bg-testable-pink">
            <td className="p-3">Animação de fundo</td>
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
};

Options.defaultProps = {
  options: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Options));