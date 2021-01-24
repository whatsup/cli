type Properties = {
  projectName: string
  packageManager: 'yarn' | 'npm'
  moduleBundler: 'webpack' | 'rollup'
  routing: boolean
  git: boolean
}

export default Properties
