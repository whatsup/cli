import path from 'path'
import fs from 'fs'
import commander from 'commander'
import inquirer from 'inquirer'

import createPackageJson from '../stage/create_package_json'
import installDependencies from '../stage/install_dependencies'
import initializeGit from '../stage/initialize_git'
import { replaceMaskFile } from '../utils/replace_mask'
import copyFolder from '../utils/copy_folder'

import Properties from '../types/Properties'
import Log from '../Log'

const createProject = (properties: Properties) => {
  Log.Instance.infoHeap('Creating the project...')

  const source_tooling = path.join(__dirname, '/../../template/tooling')
  const target = path.join(process.cwd(), properties.projectName)
  const src_target = path.join(target, 'src')

  try {
    Log.Instance.infoHeap(`Copying files...`)
    fs.mkdirSync(target)

    copyFolder(source_tooling, target)
    replaceMaskFile(path.join(target, 'README.md'), {
      projectName: properties.projectName,
      packageManager: properties.packageManager,
    })

    if (properties.routing) {
      const source = path.join(__dirname, '/../../template/routing-project')
      copyFolder(source, src_target)
    } else {
      const source = path.join(__dirname, '/../../template/project')
      copyFolder(source, src_target)
    }

    if (properties.moduleBundler === 'webpack') {
      const source = path.join(__dirname, '/../../template/config/webpack.config.js')
      fs.copyFileSync(source, path.join(target, 'webpack.config.js'))
    } else {
      const source = path.join(__dirname, '/../../template/config/rollup.config.js')
      fs.copyFileSync(source, path.join(target, 'rollup.config.js'))
    }

    createPackageJson(target, properties)

    if (properties.git) {
      fs.renameSync(path.join(target, 'gitignore'), path.join(target, '.gitignore'))
      initializeGit(properties.projectName)
    } else {
      fs.unlinkSync(path.join(target, 'gitignore'))
    }

    installDependencies(target, properties)

    Log.Instance.successHeap(`The ${properties.projectName} project was created.`)
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
        name: 'moduleBundler',
        message: 'Module bundler:',
        type: 'list',
        default: 'webpack',
        choices: ['webpack', 'rollup'],
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
      createProject({
        projectName: answers.projectName,
        packageManager: answers.packageManager,
        moduleBundler: answers.moduleBundler,
        routing: answers.tooling.includes('routing'),
        git: answers.tooling.includes('git'),
      })
    })
}

commander
  .name(`recife-cli project`)
  .arguments('[project-name]')
  .option('-p, --package-manager <packageManager>', 'Package Manager', 'npm')
  .option('-m, --module-bundler <moduleBundler>', 'Module Bundler', 'webpack')
  .option('-g, --git', 'Git', false)
  .option('-r, --routing', 'Routing', false)
  .action((name, cmd) => {
    const tooling = []

    if (cmd.git) {
      tooling.push('git')
    }

    if (cmd.routing) {
      tooling.push('routing')
    }

    if (name) {
      createProject({
        projectName: name,
        packageManager: cmd.packageManager,
        moduleBundler: cmd.moduleBundler,
        routing: !!cmd.routing,
        git: !!cmd.git,
      })
    } else {
      createProjectWithOptions()
    }
  })
  .allowUnknownOption(false)
  .parse(process.argv)
