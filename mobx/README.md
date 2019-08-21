# Flux

[Original project](https://github.com/mobxjs/mobx)

## Basic usage

``` javascript
var person = mobx.observable({
   name: 'wu',
   age: 23
});

mobx.autorun(function printAge() {
   console.log('现在我' + person.age + '啦！');
});
// 现在我23啦!
 
person.age = person.age + 1; 
// 现在我24啦!

person.name = 'wu' + Math.random();
// nothing
```