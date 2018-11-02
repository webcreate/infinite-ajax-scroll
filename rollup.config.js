import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'

const base = {
  input: './src/infinite-ajax-scroll.js',
  plugins: [
    nodeResolve(),
    buble(),
    commonjs(),
  ],
  watch: {
    include: 'src/**'
  }
};

const es = Object.assign({}, base, {
  external: [...Object.keys(pkg.dependencies || {})],
  output: {
    format: 'es',
    file: pkg.module
  }
});

const umd = Object.assign({}, base, {
  output: {
    format: 'umd',
    file: pkg.main,
    name: 'InfiniteAjaxScroll'
  }
});

export default [es, umd]
