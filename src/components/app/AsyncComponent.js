import * as React from 'react';

// @ts-ignore
const asyncComponent = importComponent => {
  return class extends React.Component {
    state = {
      displayName: 'asyncComponent',
      // @ts-ignore
      component: null
    }

    componentDidMount() {
      importComponent()
        // @ts-ignore
        .then(cmp => {
          this.setState({ component: cmp.default });
        });
    }

    render() {
      // @ts-ignore
      const C = this.state.component;
      // @ts-ignore
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;