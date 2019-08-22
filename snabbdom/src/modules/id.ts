function update(oldVNode: IVNode, vnode: IVNode) {
  if (!vnode.elm) {
    return;
  }
  const id = vnode.id;
  const oldId = oldVNode.id;

  if (id !== oldId && id !== undefined) {
    (vnode.elm as any).id = id;
  }
}

export const idModule: Partial<IHooks> = {
  create: update,
  update
};
