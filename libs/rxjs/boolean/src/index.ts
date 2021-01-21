/**
 * Package containing various operators for filtering, querying and generating `Boolean` values in RxJS.
 *
 * @packageDocumentation
 * @module Boolean
 *
 */
/* istanbul ignore file */
export { firstFalsy } from './lib/first-falsy';
export { firstTruthy } from './lib/first-truthy';
export { filterFalsy } from './lib/filter-falsy';
export { filterTruthy } from './lib/filter-truthy';
export { flip } from './lib/flip';
export { fromBoolean } from './lib/from-boolean';
export { lastFalsy } from './lib/last-falsy';
export { lastTruthy } from './lib/last-truthy';
export { luhnCheck } from './lib/luhn-check';
export { toBoolean } from './lib/to-boolean';

export * from './types/boolean';
