import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import image from '@rollup/plugin-image'
import html from '@rollup/plugin-html'
import postcss from 'rollup-plugin-postcss'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.tsx',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'build/bundle.js',
  },
  plugins: [
    typescript(),
    postcss({
      extract: true,
      extract: 'bundle.css',
      modules: true,
      namedExports(name) {
        return name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
      },
      use: ['sass'],
    }),
    babel({ extensions: ['.ts', '.tsx'], include: ['src/**/*'], exclude: 'node_modules/**', babelHelpers: 'bundled' }),
    image(),
    resolve(),
    commonjs(),
    html({ title: 'Whatsup project', meta: [{ name: 'viewport', content: 'width=device-width,initial-scale=1' }] }),
    !production && serve({ port: 4000, contentBase: 'build' }),
    !production && livereload(),
  ],
  watch: { clearScreen: false },
}
