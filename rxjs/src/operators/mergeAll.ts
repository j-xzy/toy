import { mergeMap } from './mergeMap';

function identity<T>(x: T): T {
  return x;
}

export function mergeAll<T>(concurrent = Infinity) {
  return mergeMap<T, T>(identity as any, concurrent);
}
