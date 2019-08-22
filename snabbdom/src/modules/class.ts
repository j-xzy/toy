function update(oldVNode: IVNode, vnode: IVNode) {
  if (!vnode.elm) {
    return;
  }

  const classes = vnode.classes || [];
  const oldClasses = oldVNode.classes || [];

  classes.forEach((cls) => {
    if (!oldClasses.includes(cls)) {
      vnode.elm!.classList.add(cls);
    }
  });

  oldClasses.forEach((cls) => {
    if (!classes.includes(cls)) {
      vnode.elm!.classList.remove(cls);
    }
  });
}

export const classModule: Partial<IHooks> = {
  create: update,
  update
};
