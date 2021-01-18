import fs from 'fs'
import path from 'path'
import Log from '../Log'

const createPackageJson = (target: string, name: string) => {
  Log.Instance.infoHeap(`Creating file package.json`)

  let basePackageJson: any = {
    name: name,
    description: 'Project created with Whatsup CLI',
    version: '0.0.1',
    scripts: {
      start: 'cross-env NODE_ENV=development webpack-dev-server',
      build: 'cross-env NODE_ENV=production webpack -p',
    },
    dependencies: {
      whatsup: '^1.1.0',
      '@whatsup-js/jsx': '^0.1.3',
    },
    devDependencies: {
      '@babel/cli': '^7.10.4',
      '@babel/core': '^7.10.4',
      '@babel/plugin-proposal-class-properties': '^7.12.1',
      '@babel/plugin-transform-runtime': '^7.10.4',
      '@babel/plugin-transform-typescript': '^7.10.4',
      '@babel/preset-env': '^7.10.4',
      '@babel/preset-typescript': '^7.10.4',
      '@whatsup-js/babel-plugin-transform-jsx': '0.2.1',
      'babel-loader': '^8.1.0',
      'core-js': '^3.6.5',
      'cross-env': '^7.0.2',
      'css-loader': '^5.0.1',
      'file-loader': '^6.0.0',
      'html-webpack-plugin': '^4.3.0',
      prettier: '^2.0.5',
      sass: '^1.29.0',
      'sass-loader': '^10.1.0',
      'style-loader': '^2.0.0',
      typescript: '^3.9.6',
      webpack: '^4.44.2',
      'webpack-cli': '^3.3.12',
      'webpack-dev-server': '^3.11.0',
    },
  }

  fs.writeFileSync(path.join(target, 'package.json'), JSON.stringify(basePackageJson, null, 2))
}

export default createPackageJson
