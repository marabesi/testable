import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { setLocale } from '../../actions/localeAction';

import '@formatjs/intl-relativetimeformat/polyfill-locales';

const mapDispatchToProps = dispatch => {
  return {
    setLocale: locale => dispatch(setLocale(locale))
  };
};

export class Options extends Component {

  onChange = event => {
    this.props.setLocale(event.target.value);
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <select value="pt-br" onChange={this.onChange}>
                <option value="en">Inglês</option>
                <option value="pt-br">Português</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

Options.propTypes = {
  setLocale: PropTypes.func
};

export default connect(null, mapDispatchToProps)(injectIntl(Options));