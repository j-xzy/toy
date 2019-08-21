import * as React from 'react';
import { storeShape } from './provider';

const dummyState = {};

export default function connect(mapStateToProps, mapDispatchToProps) {
  let isEmptyArguments = arguments.length === 0;
  return function wrapWithConnect(wrappedComponent) {
    class Connect extends React.Component {
      constructor(props, context) {
        super(props, context);
        this.store = context.store;
        this.initSubscription();
      }

      getStateProps() {
        let stateProps = {};
        let dispatch = this.store.dispatch.bind(this.store);
        Object.assign(stateProps,this.props);
        if(isEmptyArguments) {
          stateProps.dispatch = dispatch;
        }
        if (typeof mapStateToProps !== 'undefined' && mapStateToProps != null) {
          Object.assign(stateProps, mapStateToProps(this.store.getState(), this.props));
        }
        if (typeof mapDispatchToProps !== 'undefined' && mapDispatchToProps != null) {
          if (typeof mapDispatchToProps === 'function') {
            Object.assign(stateProps, mapDispatchToProps(dispatch, this.props));
          }
          if (typeof mapDispatchToProps === 'object') {
            var dispatchProps = {};
            for (let key in mapDispatchToProps) {
              dispatchProps[key] = function () {
                dispatch(mapDispatchToProps[key].apply(this, arguments))
              };
            }
            Object.assign(stateProps, dispatchProps);
          }
        }
        return { ...stateProps };
      }

      initSubscription() {
        this.store.subscribe(this.onStateChange.bind(this));
      }

      onStateChange() {
        this.setState(dummyState);
      }

      render() {
        return React.createElement(wrappedComponent, this.getStateProps());
      }
    }

    Connect.contextTypes = {
      store: storeShape
    }

    return Connect;
  }
}