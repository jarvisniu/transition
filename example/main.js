import transition from '../transition.js'

// 1. simple.scrollTop
document.querySelector('#btnScrollTop1').addEventListener('click', () => {
  let target = document.querySelector('#divScrollTop')
  transition(target, {
    scrollTop: target.scrollTop + 200,
  })
})
document.querySelector('#btnScrollTop2').addEventListener('click', () => {
  transition(document.querySelector('#divScrollTop'), {
    scrollTop: 0,
  })
})

// 2. style.opacity
document.querySelector('#btnFadeOut').addEventListener('click', () => {
  transition(document.querySelector('#divOpacity').style, {
    opacity: 0,
  })
})
document.querySelector('#btnFadeIn').addEventListener('click', () => {
  transition(document.querySelector('#divOpacity').style, {
    opacity: 1,
  })
})
