/**
 * @packageDocumentation
 * @module Number
 */
import { MonoTypeOperatorFunction, Subscribable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits numbers, where that number falls outside the provided `min` and `max` values.
 *
 * @remarks When filtering out-of-range, the range numbers are excluded from the filter - to include them set
 *   `includeBounds = true`
 *
 * @category Filter
 *
 * @see The [[inRange]] operator returns a boolean value instead of the number
 * @see The [[filterOutOfRange]] can be used to get numbers that fall outside the `min` and `max` range
 *
 * @param min The minimum range value
 * @param max The maximum range value
 * @param includeBounds Optionally include the `min` and `max` values in the Observable
 *
 * @example
 * Returns values outside the `min` and `max` range
 * ```ts
 * const input = [-10, -2.3, 0, 1, 2, 3.14, 4.2, 10, 11, 42];
 * from(input).pipe(filterOutOfRange(0, 10)).subscribe();
 * ```
 * Output: `-10, -2.3, 11, 42`
 *
 * @example
 * Returns values outside and including the `min` and `max` range
 * ```ts
 * const input = [-10, -2.3, 0, 1, 2, 3.14, 4.2, 10, 11, 42];
 * from(input).pipe(filterOutOfRange(0, 10, true)).subscribe();
 * ```
 * Output: `-10, -2.3, 0, 10, 11, 42`
 *
 * @returns Observable that emits a number that falls outside the `min` and `max` ranges
 */
export function filterOutOfRange(
  min: Subscribable<number> | number,
  max: Subscribable<number> | number,
  includeBounds?: Subscribable<boolean> | boolean,
): MonoTypeOperatorFunction<number> {
  const min$ = createOrReturnObservable(min);
  const max$ = createOrReturnObservable(max);
  const includeBounds$ = createOrReturnObservable(includeBounds);
  return (source) =>
    source.pipe(
      withLatestFrom(min$, max$, includeBounds$),
      filter(([value, minvalue, maxValue, includeBoundsValue]) =>
        includeBoundsValue ? value <= minvalue || value >= maxValue : value < minvalue || value > maxValue,
      ),
      map(([value]) => value),
    );
}
