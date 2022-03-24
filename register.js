/**
 * Overrides the tsconfig used for the app.
 * In the test environment we need some tweaks.
 */

const { register } = require('ts-node');
// import testTSConfig from './test/tsconfig.json';

register({
  files: true,
  transpileOnly: true,
  project: './test/tsconfig.json',
});
