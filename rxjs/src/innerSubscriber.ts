import { Subscriber } from './subscriber';
import { OuterSubscriber } from './outerSubscriber';

export class InnerSubscriber<T, R> extends Subscriber<R> {
  private index = 0;

  constructor(private parent: OuterSubscriber<T, R>, public outerValue: T, public outerIndex: number) {
    super();
  }

  protected _next(value: R): void {
    this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
  }

  complete() {
    this.parent.notifyComplete(this);
  };
}
