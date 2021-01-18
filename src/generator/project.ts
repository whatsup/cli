import commander from 'commander'
import inquirer from 'inquirer'
import Log from '../Log'

const createProject = (projectName: string, packageManager: 'yarn' | 'npm') => {
    Log.Instance.infoHeap('Creating the project')
    Log.Instance.infoHeap(projectName)
    Log.Instance.infoHeap(packageManager)
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
