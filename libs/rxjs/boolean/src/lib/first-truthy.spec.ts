import { firstTruthy } from '@rxjs-ninja/rxjs-boolean';
import { marbles } from 'rxjs-marbles/jest';

describe('firstTruthy', () => {
  it(
    'filter the first truthy value',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-', { a: '', b: '', c: '', d: 'RxJS', e: 'Ninja' });
      const subs = '^------!';
      const expected = m.cold('-------(d|)', { d: 'RxJS' });
      m.expect(input.pipe(firstTruthy())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'filter the first truthy value with predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-', { a: 1, b: 3, c: 5, d: 6, e: 8 });
      const subs = '^------!';
      const expected = m.cold('-------(d|)', { d: 6 });
      m.expect(input.pipe(firstTruthy((num: number) => num % 2 === 0))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
