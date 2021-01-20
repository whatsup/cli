import path from 'path'
import fs from 'fs'
import commander from 'commander'
import inquirer from 'inquirer'

import createPackageJson from '../stage/create_package_json'
import installDependencies from '../stage/install_dependencies'
import initializeGit from '../stage/initialize_git'
import { replaceMaskFile } from '../utils/replace_mask'
import copyFolder from '../utils/copy_folder'

import Log from '../Log'

const createProject = (projectName: string, packageManager: 'yarn' | 'npm', tooling: string[]) => {
  Log.Instance.infoHeap('Creating the project')

  const source_tooling = path.join(__dirname, '/../../template/tooling')
  const target = path.join(process.cwd(), projectName)
  const src_target = path.join(target, 'src')

  try {
    Log.Instance.infoHeap(`Copying files`)
    fs.mkdirSync(target)
    fs.mkdirSync(src_target)

    copyFolder(source_tooling, target)
    replaceMaskFile(path.join(target, 'README.md'), {
      projectName,
    })

    if (tooling.includes('git')) {
      fs.renameSync(path.join(target, 'gitignore'), path.join(target, '.gitignore'))
      initializeGit(projectName)
    } else {
      fs.unlinkSync(path.join(target, 'gitignore'))
    }

    if (tooling.includes('routing')) {
      const source = path.join(__dirname, '/../../template/routing-project')
      copyFolder(source, src_target)
    } else {
      const source = path.join(__dirname, '/../../template/project')
      copyFolder(source, src_target)
    }
    createPackageJson(target, projectName, tooling.includes('routing'))
    installDependencies(target, packageManager)

    Log.Instance.successHeap(`The ${projectName} project was created.`)
    Log.Instance.info(`Path: ${target}\n\n`)
  } catch (err) {
    Log.Instance.exception(err)
    Log.Instance.jump()
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
      {
        name: 'tooling',
        message: 'Tooling:',
        type: 'checkbox',
        choices: [
          { name: 'Git', value: 'git' },
          { name: 'Routing', value: 'routing' },
        ],
      },
    ])
    .then((answers) => {
      Log.Instance.jump()
      createProject(answers.projectName, answers.packageManager, answers.tooling)
    })
}

commander
  .name(`recife-cli project`)
  .arguments('[project-name]')
  .option('-p, --package-manager <packageManager>', 'Package Manager', 'npm')
  .option('-g, --git', 'Git', 'git')
  .option('-r, --routing', 'Routing', 'routing')
  .action((name, cmd) => {
    const tooling = []

    if (cmd.git) {
      tooling.push('git')
    }

    if (cmd.routing) {
      tooling.push('routing')
    }

    if (name) {
      createProject(name, cmd.packageManager, tooling)
    } else {
      createProjectWithOptions()
    }
  })
  .allowUnknownOption(false)
  .parse(process.argv)
