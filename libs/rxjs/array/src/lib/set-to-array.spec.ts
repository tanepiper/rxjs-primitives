import { marbles } from 'rxjs-marbles';
import { setToArray } from '@rxjs-ninja/rxjs-array';

describe('setToArray', () => {
  it(
    'should return an  array from a set',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: new Set(['x', 'a', 'f']),
        b: new Set(['a', 'a', 'b']),
        c: new Set(['c', 'y', 'o']),
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', {
        x: ['x', 'a', 'f'],
        y: ['a', 'b'],
        z: ['c', 'y', 'o'],
      });
      m.expect(input.pipe(setToArray())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
