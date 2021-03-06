import { filterIncludes } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

describe('filterIncludes', () => {
  it(
    'should return string value of string including the value',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'testing', c: 'driving' });
      const subs = '^------!';
      const expected = m.cold('---y-z-|', { y: 'testing', z: 'driving' });
      m.expect(input.pipe(filterIncludes('ing'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return string value of string including the value',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'testing', c: 'driving' });
      const subs = '^------!';
      const expected = m.cold('---y-z-|', { y: 'testing', z: 'driving' });
      m.expect(input.pipe(filterIncludes(of('ing')))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
