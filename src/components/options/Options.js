import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLocale } from '../../actions/localeAction';

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
              <select onChange={this.onChange}>
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

export default connect(null, mapDispatchToProps)(Options);