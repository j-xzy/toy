class ReduceStore {
  constructor(dispatcher) {
    this.state = this.getInitialState();
    this.callbacks = [];
    this.changed = false;
    this.dispatcher = dispatcher;
    dispatcher.register((payload) => {
      this.invokeDispatch(payload);
    });
  }

  invokeDispatch(action) {
    const startingState = this.state;
    const endingState = this.reduce(startingState, action);
    if(endingState !== startingState) {
      this.state = endingState;
      this.callbacks.forEach((fn) => fn());
    }
  }

  getInitialState() {
    console.log('请覆写 getInitialState方法');
  }

  getState() {
    return this.state;
  }
  
  getDispatcher() {
    return this.dispatcher;
  }

  addEventListener(fn) {
    this.callbacks.push(fn);
  }
}

export default ReduceStore;