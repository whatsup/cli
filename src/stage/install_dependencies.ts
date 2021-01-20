import { spawnSync } from 'child_process'
import Log from '../Log'

const installDependencies = (target: string, packageManager: 'yarn' | 'npm') => {
  Log.Instance.infoHeap('Installing dependencies...')

  const originalDirectory = process.cwd()

  try {
    process.chdir(target)

    if (packageManager === 'yarn') {
      spawnSync('yarnpkg', ['install'], { stdio: 'ignore' })
    } else {
      spawnSync('npm', ['install'], { stdio: 'ignore' })
    }
  } catch (err) {
    console.log(`\x1b[31m${err}\x1b[0m`)
  }

  process.chdir(originalDirectory)
}

export default installDependencies
