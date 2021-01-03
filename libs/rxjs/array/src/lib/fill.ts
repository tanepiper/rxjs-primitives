/**
 * @packageDocumentation
 * @module Array
 */

import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable array of values filled with Array.fill. Using the source array length, some or all the values are replaced with the `fillWith` parameter.
 *
 * @category Array Modify
 *
 * @param fillWith The value to fill the array with
 * @param start Optional start index to fill the array from
 * @param fillTo Optional index of the item to stop filling at, the last item filled is `fillTo - 1`
 *
 * @example
 * Return an array with all values replaced
 * ```ts
 * const input = ['The', 'Cake', 'is', 'a', 'lie'];
 * of(input).pipe(fill('CAKE!')).subscribe();
 * ```
 * Output: `'CAKE!', 'CAKE!', 'CAKE!', 'CAKE!', 'CAKE!'`
 *
 * @example
 * Return an array where all items at and after index `2` are replaced
 * ```ts
 * const input = ['The', 'Cake', 'is', 'a', 'lie'];
 * of(input).pipe(fill('CAKE!', 2)).subscribe();
 * ```
 * Output: `'The', 'Cake', 'CAKE!', 'CAKE!', 'CAKE!'`
 *
 * @example
 * Return an array where all items at index `2`  and upto index `4` are replaced
 * ```ts
 * const input = ['The', 'Cake', 'is', 'a', 'lie'];
 * of(input).pipe(fill('CAKE!', 2, 4)).subscribe();
 * ```
 * Output: `'The', 'Cake', 'CAKE!', 'CAKE!', 'lie'`
 *
 * @returns An Observable that emits an array of values where some or all of the source array values are replaced with the `fillValue`
 */
export function fill<T extends unknown, K extends T | unknown>(
  fillWith: K,
  start = 0,
  fillTo?: number,
): OperatorFunction<T[], K[]> {
  return (source: Observable<T[]>) =>
    source.pipe(map((value: T[]) => value.fill(fillWith as never, start, fillTo) as K[]));
}