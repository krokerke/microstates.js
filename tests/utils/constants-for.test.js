import 'jest';

import constantsFor from '../../src/utils/constants-for';

describe('utils/constants-for', () => {
  let constants = constantsFor(
    class {
      n = 10;
      b = true;
      s = 'hello';
      o = { hello: 'world' };
      a = ['a', 'b', 'c'];

      get getter() {}

      method() {}
    }
  );
  it("doesn't include the getter", () => {
    expect(constants).not.toHaveProperty('getter');
  });
  it("doesn't include method", () => {
    expect(constants).not.toHaveProperty('method');
  });
  it('finds all constants', () => {
    expect(constants).toEqual({
      n: 10,
      b: true,
      s: 'hello',
      o: { hello: 'world' },
      a: ['a', 'b', 'c'],
    });
  });
  it('shares constants for a Type', () => {
    class MyType {
      shared = {};
    }
    let a = constantsFor(MyType).shared;
    let b = constantsFor(MyType).shared;
    expect(a).toBe(b);
  });
});