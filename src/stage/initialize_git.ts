import { spawnSync } from 'child_process'
import Log from '../Log'

const initializeGit = (projectName: string) => {
  Log.Instance.infoHeap(`Starting the git...`)

  const originalDirectory = process.cwd()

  try {
    process.chdir(projectName)

    spawnSync('git', ['init'], { stdio: 'ignore' })
    spawnSync('git', ['add', '*'], { stdio: 'ignore' })
    spawnSync('git', ['commit', '-m', 'First Commit'], { stdio: 'ignore' })
  } catch (err) {
    Log.Instance.exception(err)
  }

  process.chdir(originalDirectory)
}

export default initializeGit
