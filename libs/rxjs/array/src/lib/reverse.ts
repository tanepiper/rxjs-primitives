/**
 * @packageDocumentation
 * @module Array
 */

import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits array taking the source and running the result of Array.reverse
 *
 * @category Array Modify
 *
 * @example
 * Reverse an array of values
 * ```ts
 * const input = ['Hello', 'RxJS', 'Ninja'];
 * of(input).pipe(reverse()).subscribe();
 * ```
 * Output: `['Ninja', 'RxJS', 'Hello']`
 *
 * @returns Observable that emits an array which is reversed from the source array
 */
export function reverse<T extends unknown>(): OperatorFunction<T[], T[]> {
  return (source: Observable<T[]>) => source.pipe(map((value) => [...value].reverse()));
}