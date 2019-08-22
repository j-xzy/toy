function update(oldVNode: IVNode, vnode: IVNode) {
  if (!vnode.elm) {
    return;
  }
  const style = vnode.data ? vnode.data.style ? vnode.data.style : {} : {};
  const oldStyle = oldVNode.data ? oldVNode.data.style ? oldVNode.data.style : {} : {};

  // tslint:disable-next-line: forin
  for (const key in style) {
    const cur = style[key];
    const old = oldStyle[key];
    if (cur !== old) {
      (vnode.elm as any).style.setProperty(key, cur);
    }
  }

  for (const key in oldStyle) {
    if (!(key in style)) {
      (vnode.elm as any).style.removeProperty(key);
    }
  }
}

export const styleModule: Partial<IHooks> = {
  create: update,
  update
};
