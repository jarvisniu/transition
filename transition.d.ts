interface TransitionOptions {
  duration?: number,
  easing?: 'linear' | 'quad'
  onStart?: any,
  onUpdate?: any,
  onComplete?: any,
}

declare let transition: (target: object, props: object, options?: TransitionOptions) => void

export default transition
