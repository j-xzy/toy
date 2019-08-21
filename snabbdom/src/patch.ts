export function vdom(modules: Array<Partial<IHooks>> = []) {
  const hooks = {
    creates: modules.filter(({ create }) => create).map(({ create }) => create!)
  };

  function createElm(vnode: IVNode) {
    const elm = vnode.elm = document.createElement(vnode.type);
    hooks.creates.forEach((cb) => cb(vnode));

    if (Array.isArray(vnode.children)) {
      vnode.children.forEach((cVNode) => {
        elm.appendChild(createElm(cVNode));
      });
    } else {
      elm.innerText = vnode.children;
    }
    return elm;
  }

  function patch(oldVNode: IVNode | Element, vnode: IVNode) {
    if (!isVNode(oldVNode)) {
      oldVNode.appendChild(createElm(vnode));
    }
  }

  return patch;
}

function isVNode(node: IVNode | Element): node is IVNode {
  return (node as IVNode).__vnode;
}
