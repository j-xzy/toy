import React from 'react';

export default function createFunctional(WrappedComponent, getStores, calculateState) {
  return class extends React.Component {
    constructor() {
      super();
      this.changed = false;
      this.setStore(getStores());
    }

    setStore(stores) {
      stores.forEach(store => {
        store.addEventListener(() => {
          this.changed = true;
        });
      });

      // update Component
      const _dispatcher = stores[0].getDispatcher();

      _dispatcher.register(() => {
        if (this.changed) {
          this.setState({});
          this.changed = false;
        }
      });
    }

    getState() {
      return calculateState();
    }

    render() {
      return React.createElement(WrappedComponent, this.getState());
    }

  }
}