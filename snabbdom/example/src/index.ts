import { attrModule, classModule, h, idModule, styleModule, vdom } from '../../src';

const patch = vdom([
  classModule,
  styleModule,
  idModule,
  attrModule
]);

let node = patch(
  document.querySelector('#root')!,
  h('div#container', { style: { background: 'red' } }, [
    h('p.text', { style: { color: 'blue' } }, 'txt'),
    h('img', {
      attr: { src: 'https://avatars3.githubusercontent.com/u/22634735?s=460&v=4' },
      style: { width: '100px' }
    }),
    h('p.text', 'xxx')
  ])
);

document.querySelector('#patchBtn')!.addEventListener('click', () => {
  node = patch(node, h('div#container', { style: { background: 'yellow' } }, [
    h('p.text', { style: { color: 'blue' } }, 'change!!!'),
    h('img', {
      attr: { src: 'https://raw.githubusercontent.com/whj1995/images-host/master/bac.972a2ec.png' },
      style: { width: '50px', height: '50px' }
    })
  ]));
});
