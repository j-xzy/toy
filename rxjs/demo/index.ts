import { fromEvent } from '../src/observable/index';
import { map, filter, tap, mergeMap } from '../src/operators';
import { merge } from '../src/observable/merge';

const iptEl = document.querySelector('input');
const okEl = document.querySelector('button');
const ulEl = document.querySelector('ul');

const enter$ = fromEvent(iptEl, 'keydown')
  .pipe(
    map((e) => e.key),
    filter((k) => k === 'Enter')
  );

const ok$ = fromEvent(okEl, 'click');
const input$ = merge(ok$, enter$);

const item$ = input$.pipe(
  map(() => iptEl.value),
  filter((value) => value !== ''),
  map(createLi),
  tap((el) => {
    ulEl.appendChild(el);
    iptEl.value = '';
  })
);

const toggle$ = item$.pipe(
  mergeMap(
    (el) => {
      return fromEvent(el, 'click')
        .pipe(
          filter(((e) => e.target === el)),
          map(() => el)
        )
    }
  ),
  tap((el) => {
    if (el.style.textDecoration === 'line-through') {
      el.style.textDecoration = 'none';
    } else {
      el.style.textDecoration = 'line-through';
    }
  })
);

const remove$ = item$.pipe(
  mergeMap(
    (el) => {
      const btnEl = el.querySelector('button');
      return fromEvent(btnEl, 'click').pipe(
        filter((e) => e.target === btnEl),
        map(() => el)
      )
    }
  ),
  tap((el) => {
    el.parentElement.removeChild(el);
  })
);

function createLi(value) {
  const liEl = document.createElement('li');
  liEl.innerHTML = `
  ${value}<button>X</button>
  `;
  return liEl;
}

const app$ = merge(toggle$, remove$);

app$.subscribe({
  next(e) { }
});
