function update(oldVNode: IVNode, vnode: IVNode) {
  if (!vnode.elm) {
    return;
  }
  const attr = vnode.data ? vnode.data.attr ? vnode.data.attr : {} : {};
  const oldAttr = oldVNode.data ? oldVNode.data.attr ? oldVNode.data.attr : {} : {};

  // tslint:disable-next-line: forin
  for (const key in attr) {
    const cur = attr[key];
    const old = oldAttr[key];
    if (cur !== old) {
      if (cur === true) {
        vnode.elm.setAttribute(key, '');
      } else if (cur === false) {
        vnode.elm.removeAttribute(key);
      } else {
        vnode.elm.setAttribute(key, cur);
      }
    }
  }

  for (const key in oldAttr) {
    if (!(key in attr)) {
      vnode.elm.removeAttribute(key);
    }
  }
}

export const attrModule: Partial<IHooks> = {
  create: update,
  update
};
