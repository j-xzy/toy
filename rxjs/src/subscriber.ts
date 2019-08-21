import { IObserver } from './typing';
import { empty } from './observer';

export class Subscriber<T> implements IObserver<T> {
  constructor(protected destination: IObserver<any> = empty) {
  }

  private isStopedd = false;

  next(value: T) {
    if (!this.isStopedd) {
      this._next(value);
    }
  };

  error(err: any) {
    if (!this.isStopedd) {
      this._error(err);
    }
  };

  complete() {
    if (!this.isStopedd) {
      this.isStopedd = true;
      this._complete();
    }
  };

  protected _next(value) {
    this.destination.next(value);
  }

  protected _error(err: any) {
    this.destination.error(err);
  };

  protected _complete() {
    if (this.destination.complete) {
      this.destination.complete();
    }
  };
}
