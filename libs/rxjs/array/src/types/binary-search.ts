/**
 * @packageDocumentation
 * @module array
 */

/**
 * The return tuple for an Array search result, contains the search value, the search array and the index of the search result
 *
 * @typeParam T Type of array items
 */
export type BinarySearchResult<T = any> = [index: number, searchValue: T, searchArray: T[]]; // eslint-disable-line

/**
 * Method used to sort an Array of values
 *
 * @typeParam T The Type of the value to sort
 *
 * @param first The first value to compare
 * @param second The second value to compare
 *
 * @example
 * ```ts
 * const sortFn<string> = (first: string, second: string): number => first.localCompare(second)
 * ```
 *
 * @returns A number that represents the value match position for sorting
 */

export type SortFn<T = any> = (first: T, second: T) => number; // eslint-disable-line
