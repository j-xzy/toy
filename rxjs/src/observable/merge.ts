import { mergeAll } from "../operators";
import { Observable } from "../observable";
import { subscribeToArray } from "./subscribeToArray";

export function merge<T, R>(...observables: Array<Observable<any> | number>) {
  let concurrent = Infinity;
  let last = observables[observables.length - 1];
  if (typeof last === 'number') {
    concurrent = <number>observables.pop();
  }
  return mergeAll(concurrent)(Observable.create(subscribeToArray(observables)));
}
