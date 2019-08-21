import { Subscriber } from "../subscriber";
import { Observable } from "../observable";
import { IOperator, IOperatorFunction } from "../typing";

export function filter<T>(predicate: (value: T) => boolean): IOperatorFunction<T, T> {
  return function filterOperation(source: Observable<T>): Observable<T> {
    return source.lift(new FilterOperator(predicate));
  }
}

class FilterOperator<T, R> implements IOperator<T, R> {
  constructor(private predicate: (value: T) => boolean) {
  }

  call(subscriber: Subscriber<R>, source: any): any {
    return source.subscribe(new FilterSubscriber(subscriber, this.predicate));
  }
}

class FilterSubscriber<T, R> extends Subscriber<T> {
  constructor(destination: Subscriber<R>, private predicate: (value: T) => boolean) {
    super(destination);
  }

  protected _next(value: T) {
    if (this.predicate(value)) {
      this.destination.next(value);
    }
  }
}
