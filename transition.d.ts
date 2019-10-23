interface TransitionOptions {
  duration: number,
  easing: 'linear' | 'quad'
}

declare let transition: (target: object, props: object, options?: TransitionOptions) => void

export default transition
