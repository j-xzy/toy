import { IUnaryFunction } from './typing';

export function pipeFromArray<T, R>(fns: Array<IUnaryFunction<T, R>>): IUnaryFunction<T, R> {
  if (fns.length === 1) {
    return fns[0];
  }

  return function piped(input: T): R {
    return fns.reduce((prev: any, fn: IUnaryFunction<T, R>) => fn(prev), input as any);
  };
}
