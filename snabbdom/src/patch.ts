import * as helper from './helper';
import { h } from './vnode';

const emptyNode = h('', {}, []);

export function vdom(modules: Array<Partial<IHooks>> = []) {
  const hooks = {
    creates: modules.filter(({ create }) => create).map(({ create }) => create!),
    update: modules.filter(({ update }) => update).map(({ update }) => update!)
  };

  function createElm(vnode: IVNode) {
    const elm = vnode.elm = document.createElement(vnode.type);
    hooks.creates.forEach((cb) => cb(emptyNode, vnode));

    if (Array.isArray(vnode.children)) {
      vnode.children.forEach((cVNode) => {
        elm.appendChild(createElm(cVNode));
      });
    } else {
      elm.innerText = vnode.children;
    }
    return elm;
  }

  function patchVNode(oldVNode: IVNode, vnode: IVNode) {
    const elm = vnode.elm = oldVNode.elm;
    if (!elm) {
      return;
    }
    // 更新节点
    hooks.update.forEach((cb) => cb(oldVNode, vnode));
    const ch = vnode.children;
    const oldCh = oldVNode.children;

    if (typeof ch === 'string') {
      // 孩子节点是文本
      if (ch !== oldCh) {
        helper.clearChildren(elm);
        elm.textContent = ch;
      }
      return;
    }

    if (ch.length === 0) {
      // 没有孩子节点
      helper.clearChildren(elm);
      elm.textContent = null;
      return;
    }

    if (typeof oldCh === 'string' || oldCh.length === 0) {
      // 旧节点是文本节点或为空
      if (typeof oldCh === 'string') {
        elm.textContent = null;
      }
      ch.forEach((chEle) => {
        elm.appendChild(createElm(chEle));
      });
      return;
    }

    updateChildren(elm, oldCh, ch);
  }

  function updateChildren(parent: Element, oldCh: IVNode[], newCh: IVNode[]) {
    newCh.forEach((newChNode, idx) => {
      const oldChNode = oldCh[idx];
      if (!oldChNode) {
        parent.appendChild(createElm(newChNode));
      } else if (helper.sameVnode(newChNode, oldChNode)) {
        patchVNode(oldChNode, newChNode);
      } else {
        createElm(newChNode);
        helper.replaceEle(newChNode.elm!, oldChNode.elm!);
      }
    });
    const deletedCh = oldCh.slice(newCh.length);
    helper.removeEles(deletedCh.map((chNode) => chNode.elm!));
  }

  function patch(oldVNode: IVNode | Element, vnode: IVNode) {
    if (!helper.isVNode(oldVNode)) {
      // 挂载到dom上
      oldVNode.appendChild(createElm(vnode));
      return vnode;
    }
    if (!helper.sameVnode(oldVNode, vnode)) {
      // 根节点不相同，直接替换旧的
      createElm(vnode);
      helper.replaceEle(vnode.elm!, oldVNode.elm!);
      return vnode;
    }
    // 根节点相同，开始diff
    patchVNode(oldVNode, vnode);
    return vnode;
  }

  return patch;
}
