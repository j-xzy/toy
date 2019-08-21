// tslint:disable: unified-signatures
import { parseSel } from './helper';

export function h(sel: string): IVNode;
export function h(sel: string, data: IVNodeData): IVNode;
export function h(sel: string, children: IVNode[] | string): IVNode;
export function h(sel: string, data: IVNodeData, children: IVNode[] | string): IVNode;
export function h(sel: any, b?: any, c?: any): IVNode {
  const { type, id, classes } = parseSel(sel);
  if (b && c) {
    return { sel, type, id, classes, data: b, children: c, __vnode: true };
  }
  if (Array.isArray(b)) {
    return { sel, type, id, classes, children: b, __vnode: true };
  }
  return { sel, type, id, classes, data: b, children: [], __vnode: true };
}
