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

export class Options extends Component {

  state = {
    animation: true
  }

  onChange = event => {
    this.props.setLocale(event.target.value);
  }

  onUpdateOptions = (event) => {
    const animation = !this.state.animation;
    this.setState({
      animation
    }, () => this.props.setUpdateOptions(this.state));
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
              <input type="checkbox" onClick={this.onUpdateOptions} readOnly={true} value="1" checked={`${this.state.animation ? 'checked' : ''}`}/>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

Options.propTypes = {
  setLocale: PropTypes.func,
  setUpdateOptions: PropTypes.func
};

export default connect(null, mapDispatchToProps)(injectIntl(Options));