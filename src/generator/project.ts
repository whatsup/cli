import path from 'path'
import fs from 'fs'
import commander from 'commander'
import inquirer from 'inquirer'

import createPackageJson from 'stage/createPackageJson'
import installDependencies from 'stage/installDependencies'
import { replaceMaskFile } from 'utils/replaceMask'
import copyFolder from 'utils/copyFolder'

import Log from '../Log'

const createProject = (projectName: string, packageManager: 'yarn' | 'npm') => {
  Log.Instance.infoHeap('Creating the project')

  const source = path.join(__dirname, '/../../template/project')
  const target = path.join(process.cwd(), projectName)

  try {
    Log.Instance.infoHeap(`Copying files`)
    fs.mkdirSync(projectName)

    copyFolder(source, target)
    replaceMaskFile(path.join(target, 'config/app.ts'), {
      projectName,
    })

    createPackageJson(target, projectName)
    installDependencies(target, packageManager)

    Log.Instance.successHeap(`The ${projectName} project was created.`)
    Log.Instance.info(`Path: ${target}\n\n`)
  } catch (err) {
    Log.Instance.exception(err)
  }
}

const createProjectWithOptions = () => {
  inquirer
    .prompt([
      {
        name: 'projectName',
        message: 'Project Name:',
        type: 'string',
        default: 'my-project',
      },
      {
        name: 'packageManager',
        message: 'Package Manager:',
        type: 'list',
        default: 'npm',
        choices: ['npm', 'yarn'],
      },
    ])
    .then((answers) => {
      Log.Instance.jump()
      createProject(answers.projectName, answers.packageManager)
    })
}

commander
  .name(`recife-cli project`)
  .arguments('[project-name]')
  .option('-p, --package-manager <packageManager>', 'Package Manager', 'npm')
  .action((name, cmd) => {
    if (name) {
      createProject(name, cmd.packageManager)
    } else {
      createProjectWithOptions()
    }
  })
  .allowUnknownOption(false)
  .parse(process.argv)
