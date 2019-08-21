import * as React from 'react';
import * as PropTypes from 'prop-types';

export const storeShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired
});


export class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  getChildContext() {
    return { store: this.store};
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

Provider.childContextTypes= {
  store: storeShape
}