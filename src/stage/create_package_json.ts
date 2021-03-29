import fs from 'fs'
import path from 'path'
import Properties from '../types/Properties'
import Log from '../Log'

const webpackSettings = {
  scripts: {
    start: 'cross-env NODE_ENV=development webpack-dev-server',
    build: 'cross-env NODE_ENV=production webpack -p',
  },
  devDependencies: {
    'babel-loader': '^8.1.0',
    'core-js': '^3.6.5',
    'cross-env': '^7.0.2',
    'css-loader': '^5.0.1',
    'file-loader': '^6.0.0',
    'html-webpack-plugin': '^4.3.0',
    'style-loader': '^2.0.0',
    webpack: '^4.44.2',
    'webpack-cli': '^3.3.12',
    'webpack-dev-server': '^3.11.0',
  },
}

const rollupSettings = {
  scripts: {
    start: 'rollup -c -w',
    build: 'rollup -c',
  },
  devDependencies: {
    '@rollup/plugin-babel': '^5.2.2',
    '@rollup/plugin-commonjs': '^17.0.0',
    '@rollup/plugin-html': '^0.2.0',
    '@rollup/plugin-image': '^2.0.6',
    '@rollup/plugin-node-resolve': '^11.1.0',
    rollup: '^2.38.0',
    'rollup-plugin-livereload': '^2.0.0',
    'rollup-plugin-postcss': 'https://github.com/isaacl/rollup-plugin-postcss',
    'rollup-plugin-serve': '^1.1.0',
    'rollup-plugin-typescript2': '^0.29.0',
  },
}

const createPackageJson = (target: string, properties: Properties) => {
  Log.Instance.infoHeap('Creating package.json file...')
  const dependencies = {
    whatsup: '^1.2.0',
    '@whatsup/jsx': '^0.2.2',
  }

  const moduleBundlerSettings = properties.moduleBundler === 'webpack' ? webpackSettings : rollupSettings

  const basePackageJson: any = {
    name: properties.projectName,
    description: 'Project created with Whatsup CLI',
    version: '0.0.1',
    scripts: moduleBundlerSettings.scripts,
    dependencies: Object.assign(properties.routing ? { '@whatsup/route': '^0.4.1' } : {}, dependencies),
    devDependencies: {
      '@babel/cli': '^7.10.4',
      '@babel/core': '^7.10.4',
      '@babel/plugin-proposal-class-properties': '^7.12.1',
      '@babel/plugin-transform-runtime': '^7.10.4',
      '@babel/plugin-transform-typescript': '^7.10.4',
      '@babel/preset-env': '^7.10.4',
      '@babel/preset-typescript': '^7.10.4',
      '@whatsup/babel-plugin-transform-jsx': '^0.2.2',
      sass: '^1.29.0',
      'sass-loader': '^10.1.0',
      typescript: '^3.9.6',
      ...moduleBundlerSettings.devDependencies,
    },
  }

  fs.writeFileSync(path.join(target, 'package.json'), JSON.stringify(basePackageJson, null, 2))
}

export default createPackageJson
