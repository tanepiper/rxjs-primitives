import { marbles } from 'rxjs-marbles/jest';
import { of } from 'rxjs';
import { differenceAll } from '@rxjs-ninja/rxjs-array';

describe('differenceAll', () => {
  it(
    'should return an array of the differences between the source and the difference of strings',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: ['a', 'b', 'c', 'b', 'a'],
        b: ['a', 'd', 'e', 'a'],
        c: ['x', 'y', 'z', 'x'],
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', {
        x: [['b'], ['g']],
        y: [
          ['d', 'e'],
          ['c', 'g'],
        ],
        z: [
          ['x', 'y', 'z'],
          ['a', 'c', 'g'],
        ],
      });
      m.expect(input.pipe(differenceAll(['a', 'c', 'g']))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of the differences between the source and the difference of numbers',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [1, 2, 3, 3], b: [1, 4, 5], c: [10, 11, 12] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', {
        x: [[3], [42]],
        y: [
          [4, 5],
          [2, 42],
        ],
        z: [
          [10, 11, 12],
          [1, 2, 42],
        ],
      });
      m.expect(input.pipe(differenceAll([1, 2, 42]))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of the differences between the source and the observable difference of strings',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: ['a', 'b', 'c', 'b'],
        b: ['a', 'd', 'e'],
        c: ['x', 'y', 'z'],
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', {
        x: [['b'], ['g']],
        y: [
          ['d', 'e'],
          ['c', 'g'],
        ],
        z: [
          ['x', 'y', 'z'],
          ['a', 'c', 'g'],
        ],
      });
      m.expect(input.pipe(differenceAll(of(['a', 'c', 'g'])))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
