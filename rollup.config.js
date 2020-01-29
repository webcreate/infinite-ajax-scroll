import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const banner = `/**
 * ${pkg.title} v${pkg.version}
 * ${pkg.description}
 *
 * Commercial use requires one-time purchase of a commercial license
 * https://infiniteajaxscroll.com/docs/license.html
 *
 * Copyright 2014-${(new Date).getFullYear()} ${pkg.author.company} (${pkg.author.name})
 * ${pkg.homepage}
 */`;

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
    banner,
    format: 'es',
    file: pkg.module
  }
});

const umd = Object.assign({}, base, {
  output: {
    banner,
    format: 'umd',
    file: pkg.main,
    name: 'InfiniteAjaxScroll'
  }
});

const min = Object.assign({}, base, {
  output: {
    banner,
    format: 'umd',
    file: 'dist/infinite-ajax-scroll.min.js',
    name: 'InfiniteAjaxScroll'
  },
  plugins: [
    nodeResolve(),
    buble(),
    commonjs(),
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      },
      output: {
        comments: new RegExp(pkg.title)
      }
    })
  ],
});

export default [es, umd, min]
