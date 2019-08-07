import 'babel-polyfill'

import transition from '../transition.js'

// 1. simple.scrollTop
document.querySelector('#btn1-1').addEventListener('click', () => {
  let target = document.querySelector('#div1')
  transition(target, {
    scrollTop: target.scrollTop + 200,
  })
})
document.querySelector('#btn1-2').addEventListener('click', () => {
  transition(document.querySelector('#div1'), {
    scrollTop: 0,
  })
})

// 2. rect
let rect = { x: 0, y: 0, w: 200, h: 200 }
document.querySelector('#btn2').addEventListener('click', () => {
  transition(rect, {
    x: rect.x === 0 ? 50 : 0,
    y: rect.x === 0 ? 50 : 0,
    w: rect.x === 0 ? 100 : 200,
    h: rect.x === 0 ? 100 : 200,
  }, {
    onUpdate() {
      document.querySelector('#div2 svg').setAttribute(
        'viewBox',
        `${rect.x}, ${rect.y}, ${rect.w}, ${rect.h}`,
      )
    },
  })
})

// 3. multiple layer object
// let line1 = {p1: {x: 10, y: 10}, p2: {x: 100, y: 10}}
// document.querySelector('#btn3').addEventListener('click', () => {
//   transition(line1, {
//     p1: { x: 50, y: 10 },
//     p2: { x: 50, y: 100 },
//   }, {
//     onUpdate() {
//       document.querySelector('#div3 svg line').setAttribute('x1', line1.p1.x)
//       document.querySelector('#div3 svg line').setAttribute('y1', line1.p1.y)
//       document.querySelector('#div3 svg line').setAttribute('x2', line1.p2.x)
//       document.querySelector('#div3 svg line').setAttribute('y2', line1.p2.y)
//     },
//   })
// })
