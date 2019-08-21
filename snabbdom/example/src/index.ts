import { attrModule, classModule, h, idModule, styleModule, vdom } from '../../src';

const patch = vdom([
  classModule,
  styleModule,
  idModule,
  attrModule
]);

patch(
  document.querySelector('#root')!,
  h('div#container', { style: { background: 'red' } }, [
    h('p.text', { style: { color: 'blue' } }, 'txt'),
    h('img', {
      attr: { src: 'https://avatars3.githubusercontent.com/u/22634735?s=460&v=4' },
      style: { width: '100px' }
    })
  ])
);
