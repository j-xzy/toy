export function parseSel(sel: string) {
  let type = '';
  const classes: string[] = [];
  let classCount = -1;
  let id = '';

  let state: 'type' | 'class' | 'id' = 'type';

  for (let i = 0; i < sel.length; ++i) {
    if (sel[i] === '.') {
      state = 'class';
      classes[++classCount] = '';
      continue;
    }
    if (sel[i] === '#') {
      state = 'id';
      continue;
    }
    if (state === 'type') {
      type += sel[i];
    }
    if (state === 'class') {
      classes[classCount] += sel[i];
    }
    if (state === 'id') {
      id += sel[i];
    }
  }

  return { type, classes, id: id || undefined };
}

export function sameVnode(vnode1: IVNode, vnode2: IVNode): boolean {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}

export function isVNode(node: IVNode | Element): node is IVNode {
  return (node as IVNode).__vnode;
}

export function clearChildren(parent: Element) {
  const children = parent.children;
  for (let i = 0; i < children.length; ++i) {
    parent.removeChild(children[i]);
  }
}

export function replaceEle(newEl: Element, oldEl: Element) {
  if (oldEl.parentNode) {
    oldEl.parentNode.insertBefore(newEl, oldEl);
    oldEl.parentNode.removeChild(oldEl);
  }
}

export function removeEles(els: Element[]) {
  if (els.length <= 0) {
    return;
  }
  const parent = els[0].parentElement;
  if (!parent) {
    return;
  }
  els.forEach((el) => {
    parent.removeChild(el);
  });
}
