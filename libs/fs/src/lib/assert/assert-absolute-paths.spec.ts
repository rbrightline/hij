import { assertAbsolutePaths } from './assert-absolute-paths.js';

describe('assertAbsolutePaths ', () => {
  it('should assert absolute paths', () => {
    assertAbsolutePaths([
      '\\some',
      '/some',
      'C:/some',
      'C:\\some\\other',
      'C:\\some\\other\\file.tx',
    ]);
  });
  it('should assert absolute paths and throw errors', () => {
    expect(() =>
      assertAbsolutePaths(['some', '\\some\\other', '\\some\\other\\file.tx'])
    ).toThrowError();
  });
});
