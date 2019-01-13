import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const banner = `/**
 * Infinite Ajax Scroll v${pkg.version}
 * Turn your existing pagination into infinite scrolling pages with ease
 *
 * Commercial use requires one-time purchase of a commercial license
 * https://infiniteajaxscroll.com/docs/license.html
 *
 * Copyright 2014-2019 Webcreate (Jeroen Fiege)
 * https://infiniteajaxscroll.com
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
      }
    })
  ],
});

export default [es, umd, min]
