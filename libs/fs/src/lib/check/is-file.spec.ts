import { isFile } from './is-file.js';

describe('isFile', () => {
  it('should check the filepath is directory or not', async () => {
    expect(await isFile('.')).toEqual(false);
    expect(await isFile('is-directory.ts')).toEqual(true);
  });
});
