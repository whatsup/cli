import spawn from 'cross-spawn'
import Properties from '../types/Properties'
import Log from '../Log'

const installDependencies = (target: string, properties: Properties) => {
  Log.Instance.infoHeap('Installing dependencies...')
  Log.Instance.jump()

  const originalDirectory = process.cwd()

  try {
    process.chdir(target)

    if (properties.packageManager === 'yarn') {
      spawn.sync('yarnpkg', ['install'], { stdio: 'inherit' })
    } else {
      spawn.sync('npm', ['install'], { stdio: 'inherit' })
    }
  } catch (err) {
    console.log(`\x1b[31m${err}\x1b[0m`)
  }

  process.chdir(originalDirectory)
}

export default installDependencies
