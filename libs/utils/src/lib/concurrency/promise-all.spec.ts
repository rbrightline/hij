import { promiseAll } from './promise-all.js';

describe('resolveAll: should resolve promises correct', () => {
  const promises = '_'
    .repeat(1000)
    .split('')
    .map((_, index) => {
      return () =>
        new Promise<number>((res, rej) => {
          if (index === 3) {
            rej(undefined);
          } else {
            res(index);
          }
        });
    });

  it('should resolve all promises', { timeout: 30000 }, async () => {
    const result = await promiseAll(promises, 255);

    console.log(result);
    expect(result.length).toEqual(1000);
  });
});
