function create(vnode: IVNode) {
  if (!vnode.elm) {
    return;
  }
  if ((vnode.elm as any).classList && vnode.classes) {
    if (vnode.classes.length > 0) {
      (vnode.elm as any).classList.add(...vnode.classes);
    }
  }
}

export const classModule: Partial<IHooks> = {
  create
};
