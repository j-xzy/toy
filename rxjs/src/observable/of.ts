import { Observable } from '../observable';
import { subscribeToArray } from './subscribeToArray';

export function of<T>(...args: Array<T>): Observable<T> {
  return Observable.create(subscribeToArray(args));
}
