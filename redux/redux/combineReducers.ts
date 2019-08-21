import { IReducer, State, Action } from './createStore'
export interface IReducers { [p: string]: IReducer }

export default function combineReducers(reducers: IReducers) {
  const keys = Object.keys(reducers);
  const finalReducers = {};
  keys.forEach((key) => {
    finalReducers[key] = reducers[key];
  });
  const finalKeys = Object.keys(finalReducers);
  const nextState = {};
  let hasChanged = false;

  return (state: State={}, action: Action): IReducer => {
    finalKeys.forEach((key) => {
      const preStateForKey = state[key];
      const reudcer = finalReducers[key];
      nextState[key] = reudcer(preStateForKey, action);
      hasChanged = hasChanged || nextState[key] !== preStateForKey;
    });
    return hasChanged ? nextState : state;
  };
}