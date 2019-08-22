interface IVNode {
  sel: string;
  type: string;
  id?: string;
  key?: string | number;
  classes?: string[];
  children: IVNode[] | string;
  data?: IVNodeData;
  elm?: Element;
  __vnode: true;
}

interface IVNodeData {
  style?: Partial<CSSStyleDeclaration>;
  attr?: { [p: string]: any };
}

type ICreateHook = (node: IVNode, ...p: any[]) => any;
type IUpdateHook = (node: IVNode, oldNode: IVNode) => any;

interface IHooks {
  create: IUpdateHook;
  update: IUpdateHook;
}