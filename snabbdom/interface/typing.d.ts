interface IVNode {
  sel: string;
  type: string;
  id?: string;
  classes?: string[];
  children: IVNode[] | string;
  data?: IVNodeData;
  elm?: Node;
  __vnode: true;
}

interface IVNodeData {
  style?: Partial<CSSStyleDeclaration>;
  class?: string[];
  attr?: { [p: string]: string };
}

type ICreateHook = (node: IVNode) => any;

interface IHooks {
  create: ICreateHook;
}