import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import banner from 'bannerjs';
import pkg from './package.json';

export default [{
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/validator.min.js',
      format: 'umd',
      name: 'Validator',
      banner: banner.onebanner(),
      sourcemap: true
    },
    {
      file: pkg.unpkg,
      format: 'umd',
      name: 'Validator',
      banner: banner.multibanner(),
      sourcemap: true,
    },
    {
      file: pkg.main,
      format: 'cjs',
      name: 'Validator',
      exports: 'auto',
      banner: banner.multibanner(),
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      name: 'Validator',
      banner: banner.multibanner(),
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    commonjs(),
  ]
}, {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/validator.min.js',
      format: 'umd',
      name: 'Validator',
      banner: banner.onebanner(),
      sourcemap: true
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    terser({}),
  ]
}]