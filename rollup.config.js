/* eslint import/no-extraneous-dependencies: ['error', {'devDependencies': true}] */
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/plugin.js',
  external: ['negotiator'],
  plugins: [
    babel({
      babelrc: false,
      exclude: ['./node_modules/**'],
      presets: ['es2015-rollup']
    })
  ],
  output: [
    {file: 'lib/plugin.cjs.js', format: 'cjs'},
    {file: 'lib/plugin.es.js', format: 'es'}
  ]
};
