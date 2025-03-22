import { isAbsolutePathOrThrow } from './is-absolute-path-or-throw.js';

describe('isAbsolutePathOrThrow ', () => {
  it('should assert absolute paths', () => {
    [
      '\\some',
      '/some',
      'C:/some',
      'C:\\some\\other',
      'C:\\some\\other\\file.tx',
    ].forEach(isAbsolutePathOrThrow);
  });
  it('should assert absolute paths and throw errors', () => {
    expect(() =>
      ['some', '\\some\\other', '\\some\\other\\file.tx'].forEach(
        isAbsolutePathOrThrow
      )
    ).toThrowError();
  });
});
