import { Observable } from "./observable";
import { Subscriber } from "./subscriber";

export interface IUnsubscribable {
  unsubscribe(): void;
}

export type ITeardownLogic = IUnsubscribable | Function | void;

export interface IObserver<T> {
  next: (value: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
}

export interface IUnaryFunction<T, R> { (source: T): R; }

export interface IOperatorFunction<T, R> extends IUnaryFunction<Observable<T>, Observable<R>> {}

export interface IOperator<T, R> {
  call(subscriber: Subscriber<R>, source: any): ITeardownLogic;
}