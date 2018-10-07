import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

const base = {
  input: './src/infinite-ajax-scroll.js',
  plugins: [
    nodeResolve(),
    buble()
  ],
  watch: {
    include: 'src/**'
  }
}

const es = Object.assign({}, base, {
  external: [...Object.keys(pkg.dependencies || {})],
  output: {
    format: 'es',
    file: './dist/infinite-ajax-scroll.es.js'
  }
})

const umd = Object.assign({}, base, {
  output: {
    format: 'umd',
    file: './dist/infinite-ajax-scroll.js',
    name: 'InfiniteAjaxScroll'
  }
})

export default [es, umd]
