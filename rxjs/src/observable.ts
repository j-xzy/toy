import { Subscriber } from "./subscriber";
import { ITeardownLogic, IObserver, IOperatorFunction, IOperator } from "./typing";
import { pipeFromArray } from "./pipe";

export class Observable<T> {
  constructor(subscribe?: (subscriber: Subscriber<T>) => ITeardownLogic) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }

  private source: Observable<any>;
  private operator: IOperator<any, T>;

  private _subscribe(subscriber: Subscriber<T>) {
    this.source && this.source.subscribe(subscriber);
  }

  static create<T>(subscribe: (subscriber: Subscriber<T>) => ITeardownLogic) {
    return new Observable(subscribe);
  }

  public subscribe(observer: IObserver<T>) {
    let sink : Subscriber<T>;
    if (observer instanceof Subscriber) {
      sink = observer;
    }else {
      sink = new Subscriber(observer);
    }
    if (this.operator) {
      this.operator.call(sink, this.source);
    } else {
      this._subscribe(sink);
    }
  }

  public pipe(...operations: IOperatorFunction<any, any>[]): Observable<any> {
    return pipeFromArray(operations)(this)
  }

  lift<R>(operator: IOperator<T, R>): Observable<R> {
    const observable = new Observable<R>();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }
}
