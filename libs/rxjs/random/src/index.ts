/**
 * Package containing various operators for generating Observables with random values in RxJS
 *
 * @packageDocumentation
 * @module Random
 *
 */
/* istanbul ignore file */
export { fromRandom } from './lib/from-random';
export { fromRandomInt } from './lib/from-random-integer';
export { fromRandomStr } from './lib/from-random-string';
export { fromRandomCrypto } from './lib/from-random-crypto';
export { fromUUIDv4 } from './lib/from-uuid-v4';

export { FromRandomStringOpts } from './types/from-random-string';
export { FromRandomCryptoOpts } from './types/from-random-crypto';
export { RND_STR_DEFAULTS } from './utils/from-random-string';
