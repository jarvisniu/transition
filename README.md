# transition

> CSS property transition for JavaScript

## Demo

[Demo](https://unpkg.com/@jarvisniu/transition/demo/dist/index.html)

## Usage

```js
import transition from '@jarvisniu/transition'

let coord = { x: 0, y: 0 }

transition(coord, { x: 100, y: 50 }, { duration: 0.5 })
```

## API

`transition(targetObject, props, options)`

Options:

- `duration`: Default is `0.2` second. The last time of the transition.
- `easing`: Default is `'quad'`. The easing function, can be set to `'linear'`.
- `onStart`: The callback function executed before the first transition frame.
- `onUpdate`: The callback function executed after each transition frame.
- `onComplete`: The callback function executed after the last transition frame.

## Licence

MIT
