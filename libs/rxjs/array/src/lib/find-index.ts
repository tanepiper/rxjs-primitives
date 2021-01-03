/**
 * @packageDocumentation
 * @module Array
 */

import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { PredicateFn } from '../types/generic-methods';

/**
 * Returns an Observable number which is the index of the first value found in an array using Array.findIndex
 *
 * @category Array Query
 *
 * @param predicate Optional [[PredicateFn]] used to get a truthy or falsy value of array values
 *
 * @example
 * Returns the index of the first value that is `> 2`
 * ```ts
 * const input = [1, 2, 3, 4, 5]
 * of(input).pipe(findIndex(v => v > 2)).subscribe();
 * ```
 * Output: `2`
 *
 * @example
 * Returns the index of the first string where the length `< 5`
 * ```ts
 * const input = ['Hello', 'RxJS', 'Ninja'];
 * of(input).pipe(findIndex(v => v.length < 5)).subscribe();
 * ```
 * Output: `1`
 *
 * @returns An Observable that emits a number value, the index of first value where [[PredicateFn]] is true
 */
export function findIndex<T extends unknown>(predicate?: PredicateFn<T>): OperatorFunction<T[], number> {
  return (source: Observable<T[]>) =>
    source.pipe(
      map((value) =>
        value.findIndex((v) => {
          if (predicate && typeof v === 'number') {
            return predicate(v);
          }
          return predicate ? Boolean(v) && predicate(v) : Boolean(v);
        }),
      ),
    );
}