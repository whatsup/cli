declare module '*.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.svg' {
  const src: string
  export default src
}
