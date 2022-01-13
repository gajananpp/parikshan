import {SourceLocation} from 'jscodeshift';
import {Performance} from 'perf_hooks';

// since typescript globals.d.ts doesn't contain performance
declare let performance: Performance;

/** Set this property on functions wrapped by parikshan */
const measured = Symbol('measured');

export interface AnyFunction {
  (...args: any[]): any;
  [key: symbol]: (...args: any[]) => any;
}

/**
 * Wraps input function with performance measurement.
 * If the wrapped function returns a promise,
 * a finally handler will be attached to the promise and the duration will be reported once the finally handler is invoked
 * @param fn - input function
 * @param loc - location of function in original source code
 * @returns function wrapped with performance hooks
 */
export const parikshan = (fn: AnyFunction, loc?: SourceLocation) => {
  const processComplete = (name: string, start: number, args: any[]) => {
    const end = performance.now();
    const returnedAt = Date.now();
    const duration = end - start;
    const functionName = name.split(' ').pop();
    // @ts-ignore: perf-hooke.d.ts doesn't contain performance.measure definition with object as second argument
    performance.measure('parikshan', {
      start: start,
      end: end,
      detail: {
        functionName: functionName?.length ? functionName : 'anonymous',
        calledAt: new Date(returnedAt - duration),
        returnedAt: new Date(returnedAt),
        arguments: args.map(arg => {
          try {
            const strigifiedArg =
              typeof arg === 'string' ? arg : JSON.stringify(arg);
            if (!strigifiedArg) {
              throw new Error('Not a JSON value');
            }
            return strigifiedArg;
          } catch (e) {
            return arg?.toString();
          }
        }),
        location: loc,
      },
    });
  };

  if (typeof fn === 'function') {
    if (fn[measured]) return fn[measured];

    const wrap = (...args: any[]) => {
      const start = performance.now();
      const result = fn(...args);
      if (typeof result?.finally === 'function') {
        return result.finally(() => {
          processComplete(fn.name, start, args);
          return result;
        });
      }
      processComplete(fn.name, start, args);
      return result;
    };

    Object.defineProperties(wrap, {
      [measured]: {
        configurable: false,
        enumerable: false,
        value: wrap,
      },
      length: {
        configurable: false,
        enumerable: true,
        value: fn.length,
      },
      name: {
        configurable: false,
        enumerable: true,
        value: `parikshan ${fn.name}`,
      },
    });

    Object.defineProperties(fn, {
      [measured]: {
        configurable: false,
        enumerable: false,
        value: wrap,
      },
    });

    return wrap;
  } else {
    return fn;
  }
};

// TODO: a better way to do this
/**
 * Checks function string for native code/this.
 * @param fn - any function
 * @returns true if function string contains native code/this variable
 */
parikshan.usesThisOrNative = (fn: AnyFunction) => {
  if (!fn[measured]) {
    return /(\[native code\]|this)/g.test(fn.toString());
  } else {
    return false;
  }
};

export interface ParikshanPerformaceEntry {
  /** PerformanceEntry name */
  name: 'parikshan';
  /** A high res timeStamp representing the time value of the duration of the function */
  duration: number;
  /** A high res timeStamp representing the starting time for the performance metric. Not a UNIX timestamp */
  startTime: number;
  /** Entry type */
  entryType: 'measure';
  /** Extra details */
  detail: {
    /** Function name. 'anonymous' if function doesn't have any name */
    functionName: string;
    /** list of function's stringified arguments */
    arguments: string[];
    /** `Date` object for function called at */
    calledAt: Date;
    /** `Date` object for function returned at */
    returnedAt: Date;
    /** Location of function in source code. Will be only present when compiled with -s flag else undefined */
    location:
      | {
          start: {
            line: number;
            column: number;
          };
          end: {
            line: number;
            column: number;
          };
          filename: string;
        }
      | undefined;
  };
}
