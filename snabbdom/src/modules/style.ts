function create(vnode: IVNode) {
  if (!vnode.elm) {
    return;
  }
  if (vnode.data && vnode.data.style) {
    for (const k in vnode.data.style) {
      if (vnode.data.style.hasOwnProperty(k)) {
        (vnode.elm as any).style[k] = vnode.data.style[k];
      }
    }
  }
}

export const styleModule: Partial<IHooks> = {
  create
};
