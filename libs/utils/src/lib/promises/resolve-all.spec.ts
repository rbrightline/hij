import { resolveAll } from './resolve-all.js';
import { wait } from './wait.js';

describe('resolveAll: should resolve promises correct', () => {
  const promises = '_'
    .repeat(1000)
    .split('')
    .map(async (value, index) => {
      return await new Promise<number>(async (res, rej) => {
        if (index % 2 > 0) {
          await wait(5000);
          res(index);
        } else {
          res(index);
        }
      });
    });

  it('should resolve all promises', { timeout: 30000 }, async () => {
    const result = await resolveAll(promises);

    console.log(result);
    expect(result.length).toEqual(1000);
  });
});
