/**
 * @packageDocumentation
 * @module Array
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits an array taking a source array and randomly shuffling the elements
 *
 * @category Array Modify
 *
 * @typeParam T The type of data in the input array
 *
 * @example
 * Return a randomly shuffled array
 * ```ts
 * const input = [1, 2, 3, 4, 5, 6];
 * of(input).pipe(shuffle()).subscribe();
 * ```
 * Output: `[4, 2, 5, 1, 6, 3]`
 *
 * @returns Observable that emits an array of values shuffled from the source array
 */
export function shuffle<T extends unknown>(): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) =>
    source.pipe(
      map(([...arr]) => {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      }),
    );
}