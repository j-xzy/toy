import { Observable } from '../observable';

export function fromEvent<T extends Event>(target: HTMLElement, eventName: string) {
  return Observable.create<T>((observer) => {
    function handler(e: T) {
      observer.next(e);
    }
    target.addEventListener(eventName, handler);
  });
}
