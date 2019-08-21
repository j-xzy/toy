function create(vnode: IVNode) {
  if (!vnode.elm) {
    return;
  }
  if (vnode.data && vnode.data.attr) {
    for (const k in vnode.data.attr) {
      if (vnode.data.attr.hasOwnProperty(k)) {
        (vnode.elm as any)[k] = vnode.data.attr[k];
      }
    }
  }
}

export const attrModule: Partial<IHooks> = {
  create
};
