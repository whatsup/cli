import commander from 'commander'
import path from 'path'
import Log from './Log'

const packageJson = require(path.join(__dirname, '../package.json'))

Log.Instance.title(`Whatsup`)

commander.version(packageJson.version, '-v --version', 'Version number').helpOption('-h --help', 'For more information')
commander
    .name(`whatsup`)
    .command('project', 'Generate a project', {
        executableFile: path.join(__dirname, 'generator/project.js'),
    })
    .allowUnknownOption(false)

commander.parse(process.argv)
