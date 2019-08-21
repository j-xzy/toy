function create(vnode: IVNode) {
  if (!vnode.elm) {
    return;
  }
  if (typeof vnode.id !== 'undefined') {
    (vnode.elm as any).id = vnode.id;
  }
}

export const idModule: Partial<IHooks> = {
  create
};
