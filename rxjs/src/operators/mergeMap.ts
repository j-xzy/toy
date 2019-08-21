import { Observable } from "../index";
import { IOperatorFunction, IOperator } from "../typing";
import { Subscriber } from "../subscriber";
import { OuterSubscriber } from "../outerSubscriber";
import { InnerSubscriber } from "../innerSubscriber";

export function mergeMap<T, R>(
  project: (value: T) => Observable<R>,
  concurrent: number = Infinity
): IOperatorFunction<T, R> {
  return (source: Observable<T>) => source.lift(new MergeMapOperator(project, concurrent))
}

class MergeMapOperator<T, R> implements IOperator<T, R> {
  constructor(private project: (value: T) => Observable<R>, private concurrent = Infinity) { }
  call(observer: Subscriber<R>, source: any) {
    return source.subscribe(new MergeMapSubscriber(observer, this.project, this.concurrent));
  }
}

class MergeMapSubscriber<T, R> extends OuterSubscriber<T, R> {
  private active: number = 0;

  constructor(
    desination: Subscriber<R>,
    private project: (value: T) => Observable<R>,
    private concurrent = Infinity
  ) {
    super(desination);
  }

  protected _next(value: T): void {
    if (this.active < this.concurrent) {
      this.active++;
      let result = this.project(value);
      const innerSubscriber = new InnerSubscriber(this, undefined, undefined);
      result.subscribe(innerSubscriber);
    }
  }

  notifyComplete(innerSub: Subscriber<R>) {
    this.active --;
  }
}