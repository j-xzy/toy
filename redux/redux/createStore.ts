export type Action = { [p: string]: any };

export type State = any;

export interface IReducer {
  (curState: State, action: Action): State
}

export class Store {
  constructor(reducer: IReducer, preloadedState?: State) {
    this.reducer = reducer;
    this.curState = preloadedState;
    this.dispatch({ type: '@redux/init  ' })
  }

  reducer: IReducer;

  curState: State;

  listeners: Array<Function> = [];

  getState(): any {
    return this.curState;
  }

  subscribe(listener: Function) {
    this.listeners.push(listener);
    return () => this.unsubscribe(listener);
  }

  unsubscribe(listener: Function) {
    let index = this.listeners.indexOf(listener);
    this.listeners.splice(index, 1);
  }

  dispatch(action: Action) {
    this.curState = this.reducer(this.curState, action);
    for (let i = 0; i < this.listeners.length; i++) {
      this.listeners[i]();
    }
  }
}

export function createStore(reducer: IReducer, preloadedState?: any) {
  return new Store(reducer, preloadedState);
}