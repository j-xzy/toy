// tslint:disable: unified-signatures
import { parseSel } from './helper';

export function h(sel: string): IVNode;
export function h(sel: string, data: IVNodeData): IVNode;
export function h(sel: string, children: IVNode[] | string): IVNode;
export function h(sel: string, data: IVNodeData, children: IVNode[] | string): IVNode;
export function h(sel: any, b?: any, c?: any): IVNode {
  const { type, id, classes } = parseSel(sel);
  if (b && c) {
    // tslint:disable-next-line: no-shadowed-variable
    const node: IVNode = { sel, type, id, classes, data: b, children: c, __vnode: true };
    if (b.key !== undefined) {
      node.key = b.key;
    }
    return node;
  }

  if (Array.isArray(b) || typeof b === 'string') {
    return { sel, type, id, classes, children: b, __vnode: true };
  }

  const node: IVNode = { sel, type, id, classes, data: b, children: [], __vnode: true };
  if (b.key !== undefined) {
    node.key = b.key;
  }
  return node;
}
