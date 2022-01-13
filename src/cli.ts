#!/usr/bin/env node

import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';
import {Compiler} from '.';

yargs(hideBin(process.argv))
  .scriptName('parikshan')
  .command(
    '$0  <files..>',
    'Compiles code to performance.measure the functions',
    yargs => {
      return yargs.positional('files', {
        description: 'One or more files or glob patterns to compile',
      });
    },
    argv => {
      const compiler = new Compiler();
      compiler.compile(
        <string[]>argv.files,
        <string>argv.outputDir,
        <boolean>argv.sourceLoc
      );
    }
  )
  .example([
    [
      '$0 "{,!(node_modules)/**/}*.js" -o output',
      'Compile all js files except for files under node_modules to output folder',
    ],
    [
      '$0 build/src/**/*.js -so output',
      'Compile to output folder with source location captured',
    ],
  ])
  .option('output-dir', {
    alias: 'o',
    type: 'string',
    description: 'Output directory',
    default: 'build/parikshan',
  })
  .option('source-loc', {
    alias: 's',
    type: 'boolean',
    description: 'Capture line, column number in performance measurement',
    default: false,
  })
  .updateStrings({
    'Positionals:': 'Positional Arguments:',
  })
  .alias('help', 'h')
  .alias('version', 'v')
  .parse();
