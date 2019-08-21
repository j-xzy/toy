import { Subscriber } from "../subscriber";
import { Observable } from "../observable";
import { IOperator, IOperatorFunction } from "../typing";

export function map<T, R>(project: (value: T) => R): IOperatorFunction<T, R> {
  return function mapOperation(source: Observable<T>): Observable<R> {
    return source.lift(new MapOperator(project));
  }
}

class MapOperator<T, R> implements IOperator<T, R> {
  constructor(private project: (value: T) => R) {
  }

  call(subscriber: Subscriber<R>, source: any): any {
    return source.subscribe(new MapSubscriber(subscriber, this.project));
  }
}

class MapSubscriber<T, R> extends Subscriber<T> {
  constructor(destination: Subscriber<R>, private project: (value: T) => R) {
    super(destination);
  }

  protected _next(value: T) {
    const result = this.project(value);
    this.destination.next(result);
  }
}
