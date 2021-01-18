import fs from 'fs'
import path from 'path'

const copyFolder = (source: string, target: string) => {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target)
  }

  const files = fs.readdirSync(source)

  files.forEach((file: string) => {
    const currentPath = path.join(source, file)
    const targePath = path.join(target, file)

    if (fs.lstatSync(currentPath).isDirectory()) {
      copyFolder(currentPath, targePath)
    } else {
      fs.copyFileSync(currentPath, targePath)
    }
  })
}

export default copyFolder
