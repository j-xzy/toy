import { Subscriber } from './subscriber';
import { InnerSubscriber } from './innerSubscriber';

export class OuterSubscriber<T, R> extends Subscriber<T> {
  notifyNext(
    outerValue: T, innerValue: R,
    outerIndex: number, innerIndex: number,
    innerSub: InnerSubscriber<T, R>
  ): void {
    this.destination.next(innerValue);
  }

  notifyComplete(innerSub: Subscriber<R>) {
    // overload
  }
}
