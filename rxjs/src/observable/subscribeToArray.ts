import { Subscriber } from '../subscriber';

export function subscribeToArray<T>(array: ArrayLike<T>) {
  return (subscriber: Subscriber<T>) => {
    for (let i = 0; i < array.length; i++) {
      subscriber.next(array[i]);
    }
    // subscriber.complete();
  }
}
