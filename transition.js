// transition function
// CSS property transition for JavaScript.

// Usage
// npm install @jarvisniu/transition
// import transition from '@jarvisniu/transition'
// transition(target: object, props: object, options: object)

// Options
// duration: number in s, default is 0.2.
// ease: string, can be set to `linear`, default is `quad`.

// constants -------------------------------------------------------------------

const DEFAULT_DURATION = 0.2

// variables -------------------------------------------------------------------

let raf = window.requestAnimationFrame

// transition structure:
// {
//   target: object,
//   prop: string,
//   initVal: number,
//   destVal: number,
//   startTime: timestamp,
//   endTime: timestamp,
//   finished: bool,
// }
let transitionList = []

// functions -------------------------------------------------------------------

function transition (target, props, options) {
  options = options || {}
  options.duration = options.duration || DEFAULT_DURATION
  options.ease = options.ease || 'quad'
  Object.keys(props).forEach(prop => {
    let initVal = target[prop]
    let targetVal = props[prop]
    if (/[\d.]+/.test(initVal)) {
      initVal = +initVal
    } else if (typeof initVal !== 'number') {
      console.error(`[transition] Can not read initial value of object property ${ prop } .`)
      return
    }
    // console.log('transition', initVal, targetVal)

    let startTime = Date.now()
    transitionList.push({
      target,
      prop,
      ease: options.ease,
      initVal,
      destVal: targetVal,
      startTime,
      endTime: startTime + options.duration * 1000,
      finished: false,
    })
  })
}

function loop () {
  transitionList.forEach(trans => {
    let currentTime = Date.now()
    let t = (currentTime - trans.startTime) / (trans.endTime - trans.startTime)
    if (t >= 1) {
      t = 1
      trans.finished = true
    }
    if (trans.ease !== 'linear') t = quadEase(t)
    let currentVal = trans.initVal + (trans.destVal - trans.initVal) * t
    trans.target[trans.prop] = currentVal
  })
  transitionList = transitionList.filter(trans => !trans.finished)
  raf(loop)
}

// quad easing function
function quadEase (t) {
  if (t < 0.5) {
    return 2 * t * t
  } else {
    return -2 * t * t + 4 * t - 1
  }
}

// bootstrap -------------------------------------------------------------------

raf(loop)

// export ----------------------------------------------------------------------

export default transition
