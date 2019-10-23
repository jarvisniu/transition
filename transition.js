// transition - CSS property transition for JavaScript.
// https://github.com/jarvisniu/transition

/* [ Usage ]
 * npm install @jarvisniu/transition
 * import transition from '@jarvisniu/transition'
 * transition(target: object, props: object, options: object)
 *
 * [ Options ]
 * duration: number in s, default is 0.2.
 * easing: string, can be set to `linear`, default is `quad`.
 *
 * [Data structure]
 * trans: {
 *   target: object,
 *   prop: string,
 *   startValue: number,
 *   endValue: number,
 *   startTime: timestamp,
 *   endTime: timestamp,
 *   completed: bool,
 * }
 */

import _debounce from 'lodash/debounce'

// constants -------------------------------------------------------------------

const DEFAULT_DURATION = 0.2

// variables -------------------------------------------------------------------

let raf = window.requestAnimationFrame

let transList = []

// functions -------------------------------------------------------------------

function transition(target, props, options) {
  options = options || {}
  options.duration = options.duration || DEFAULT_DURATION
  options.easing = options.easing || 'quad'
  // merge onComplete of all props
  if (typeof options.onComplete === 'function') {
    options.onComplete = _debounce(options.onComplete, 0)
  }
  if (options.duration && options.duration > 60) {
    console.error(`[transition] Maximum value of duration is 60 (seconds).`)
    return
  }
  Object.keys(props).forEach((prop) => {
    let startValue = target[prop]
    let targetVal = props[prop]
    if (/[\d.]+/.test(startValue)) {
      startValue = +startValue
    } else if (typeof startValue !== 'number') {
      console.error(`[transition] Can not read initial value of object property ${ prop } .`)
      return
    }

    let startTime = Date.now()
    // same target and prop only keep the last one
    let existingTransIndex = transList.findIndex((trans) => {
      return trans.target === target && trans.prop === prop
    })
    let newTrans = {
      target,
      prop,
      easing: options.easing,
      startValue,
      endValue: targetVal,
      onUpdate: options.onUpdate,
      onComplete: options.onComplete,
      startTime,
      endTime: startTime + options.duration * 1000,
      completed: false,
    }
    if (existingTransIndex > -1) {
      let existingTrans = transList[existingTransIndex]
      if (existingTrans.endValue !== targetVal) {
        transList = transList.filter((trans) => {
          return trans.target !== target || trans.prop !== prop
        })
        transList.push(newTrans)
      }
    } else {
      transList.push(newTrans)
    }
  })
  if (typeof options.onStart === 'function') options.onStart()
}

function loop() {
  transList.forEach((trans) => {
    let currentTime = Date.now()
    let t = (currentTime - trans.startTime) / (trans.endTime - trans.startTime)
    if (t >= 1) {
      t = 1
      trans.completed = true
      if (typeof trans.onComplete === 'function') trans.onComplete()
    }
    if (trans.easing !== 'linear') t = easingFunctions.quad(t)
    let currentVal = trans.startValue + (trans.endValue - trans.startValue) * t
    trans.target[trans.prop] = currentVal
    if (typeof trans.onUpdate === 'function') trans.onUpdate()
  })
  transList = transList.filter((trans) => !trans.completed)
  raf(loop)
}

let easingFunctions = {
  quad(t) {
    if (t < 0.5) {
      return 2 * t * t
    } else {
      return -2 * t * t + 4 * t - 1
    }
  },
}

// bootstrap -------------------------------------------------------------------

raf(loop)

// export ----------------------------------------------------------------------

export default transition
