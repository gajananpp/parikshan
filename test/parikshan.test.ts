import assert from 'assert';
import fs from 'fs-extra';
import path from 'path';
import {Compiler} from '../src';

describe('parikshan', () => {
  it('should output files as expected', async () => {
    const compiler = new Compiler();
    await compiler.compile(
      ['build/test/sample-scripts/**/*.js'],
      'build/test/output'
    );
    assert(
      await fs.stat(path.join(__dirname, 'output/sample-scripts/sample.js')),
      new Error('expected output file not present')
    );
    assert(
      await fs.stat(path.join(__dirname, 'output/sample-scripts/greet.js')),
      new Error('expected output file not present')
    );
  });

  it('should compile source as expected', async () => {
    const compiler = new Compiler();
    const expected = await fs.readFile(
      path.join(__dirname, 'assets/expected.txt'),
      'utf8'
    );
    const compiled = compiler.transform("greet('John');\nobj.greet('John')");
    assert.strictEqual(
      compiled.trim(),
      expected.trim(),
      new Error('compiled code is not as expected')
    );
  });
});
