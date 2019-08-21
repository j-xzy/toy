import { Subscriber } from "../subscriber";
import { Observable } from "../observable";
import { IOperator, IOperatorFunction } from "../typing";

export function tap<T>(project: (value: T) => void) {
  return function tapOperation(source: Observable<T>): Observable<T> {
    return source.lift(new DoOperator(project));
  }
}

class DoOperator<T> implements IOperator<T, T> {
  constructor(private project: (value: T) => void) {
  }

  call(subscriber: Subscriber<T>, source: any): any {
    return source.subscribe(new TapSubscriber(subscriber, this.project));
  }
}

class TapSubscriber<T> extends Subscriber<T> {
  constructor(destination: Subscriber<T>, private project: (value: T) => void) {
    super(destination);
  }

  protected _next(value: T) {
    this.project(value);
    this.destination.next(value);
  }
}
