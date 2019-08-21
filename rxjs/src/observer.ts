import { IObserver } from "./typing";

export const empty: IObserver<any> = {
  next(value: any): void { },
  error(err: any): void { },
  complete(): void { }
};
