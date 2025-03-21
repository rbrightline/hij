import { isDirectory } from './is-directory.js';

describe('isDirectory', () => {
  it('should check the filepath is directory or not', async () => {
    expect(await isDirectory('.')).toEqual(true);
    expect(await isDirectory('is-directory.ts')).toEqual(false);
  });
});
