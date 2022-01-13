import path from 'path';
import jsc, {
  ObjectExpression,
  SpreadElement,
  VariableDeclaration,
} from 'jscodeshift';
import * as recast from 'recast';
import {ExpressionKind} from 'ast-types/gen/kinds';
import fg from 'fast-glob';
import fs from 'fs-extra';

/**
 * Compiler class
 * @example
 * How to use it:
 * ```javascript
 * const compiler = new Compiler()
 * const compiledFileContents = await compiler.compile(["build/src/**\/*.js"], "output", true)
 * ```
 */
export class Compiler {
  /** AST for requiring parikshan to be added at start of each file */
  static parikshanAST: VariableDeclaration = recast.parse(
    '\nconst {parikshan} = require("parikshan/build/src/parikshan");\n'
  ).program.body[0];

  /**
   * Wraps callee in parikshan callExpression
   * @param callee - callee to be wrapped
   * @param isCallee - whether callExpression's callee or callExpression's argument
   * @param location - location of callee
   * @returns callee wrapped in parikshan callExpression
   */
  #wrapper(
    callee: SpreadElement | ExpressionKind,
    isCallee = false,
    location?: ObjectExpression
  ) {
    if (
      callee.type === 'MemberExpression' &&
      callee.object.type !== 'CallExpression' &&
      isCallee
    ) {
      callee = jsc.conditionalExpression(
        jsc.callExpression(jsc.identifier('parikshan.usesThisOrNative'), [
          callee,
        ]),
        jsc.callExpression(
          jsc.memberExpression(callee, jsc.identifier('bind')),
          [callee.object]
        ),
        callee
      );
    } else if (callee.type === 'SequenceExpression') {
      // NOTE :- ignoring below line messes up parenthesis marking in output code, the expressions of SequenceExpression becomes individual arguments
      (<any>callee).extra = {
        parenthesized: true,
      };
    }
    const parikshanArgs = [callee];
    if (location) parikshanArgs.push(location);
    return jsc.callExpression(jsc.identifier('parikshan'), parikshanArgs);
  }

  /**
   * Wraps source code's functions and their arguments
   * which could possibly have function value at runtime into {@link parikshan | `parikshan`} function
   * @param src - original source code
   * @param filePath - source code file path
   * @param captureSourceLocation - whether to pass source code coordinates as argument to {@link parikshan | `parikshan`} function
   * @returns transformed source code
   */
  transform(src: string, filePath?: string, captureSourceLocation?: boolean) {
    const validCalleeTypes = [
      'ArrowFunctionExpression',
      'FunctionExpression',
      'Identifier',
      'MemberExpression',
      'SequenceExpression',
    ];

    return jsc(src)
      .find(jsc.CallExpression)
      .filter(c => {
        const callee = c.value.callee;
        const isSuperMemberExpr =
          callee.type === 'MemberExpression' && callee.object.type === 'Super';
        const isSuper = callee.type === 'Super';
        if (isSuperMemberExpr || isSuper) {
          return false;
        }
        return validCalleeTypes.includes(callee.type);
      })
      .replaceWith(c => {
        const srcLoc = c.value.loc;
        let location: ObjectExpression | undefined;

        if (captureSourceLocation) {
          location = recast.parse(
            `(${JSON.stringify({
              start: {
                line: srcLoc?.start.line,
                column: srcLoc?.start.column,
              },
              end: {
                line: srcLoc?.end.line,
                column: srcLoc?.end.column,
              },
              filename: filePath || '',
            })})`
          ).program.body[0].expression;
        }

        c.value.callee = this.#wrapper(c.value.callee, true, location);
        c.value.arguments = c.value.arguments.map(argument => {
          if (validCalleeTypes.includes(argument.type)) {
            return this.#wrapper(argument, false, location);
          } else {
            return argument;
          }
        });

        return c.value;
      })
      .closest(jsc.Program)
      .replaceWith(p => {
        p.value.body = [Compiler.parikshanAST, ...p.value.body];
        return p.value;
      })
      .toSource();
  }

  /**
   * Reads source from matched files and writes transformed
   * source to output dir keeping the file structure
   * @param globPaths - input file glob patterns
   * @param destPath - output dir
   * @param captureSourceLocation - set it to true if wanted to capture line, column number and filename in performance entry
   */
  async compile(
    globPaths: string[],
    destPath: string,
    captureSourceLocation = false
  ) {
    await fs.remove(destPath);
    const files = await fg(globPaths, {dot: true});
    const compiledFiles = files.map(async filePath => {
      const src = await fs.readFile(filePath, 'utf8');
      const output = this.transform(src, filePath, captureSourceLocation);
      const outputPath = path.join(
        destPath,
        path
          .relative(destPath, filePath)
          .split('/')
          .filter(seg => seg !== '..')
          .join('/')
      );
      await fs.ensureFile(outputPath);
      return fs.writeFile(path.join(outputPath), output);
    });
    return Promise.all(compiledFiles);
  }
}
