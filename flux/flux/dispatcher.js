class Dispatch {
  constructor() {
    this.callbacks = [];
  }

  dispatch(payload) {
    this.callbacks.forEach((fn) => {
      fn(payload);
    });
  }

  register(callback) {
    this.callbacks.push(callback);
  }
}

export default Dispatch;