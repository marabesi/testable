import React, { Component } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import Load from '../icons/load/Load';

export default class Loading extends Component {

  render() {
    return (
      <LoadingOverlay
        active={true}
        styles={{
          wrapper: (base) => ({
            ...base,
            position: 'inherit'
          }),
          overlay: (base) => ({
            ...base,
            background: 'rgba(0, 0, 0, 0.2)'
          })
        }}
      >
        <Load style={ { zIndex: 9999999 } }/>
      </LoadingOverlay>
    );
  }
}