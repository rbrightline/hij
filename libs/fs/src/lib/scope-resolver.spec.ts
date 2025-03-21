import { scopeResolver } from './scope-resolver.js';
import { resolve as __resolve } from 'path';

describe('scopeResolver: limit access to the resources that outside the scope directory', () => {
  const rootdir = 'tmp';
  const resolve = scopeResolver(rootdir);

  it('should create the resolver', () => {
    expect(resolve).toBeDefined();
  });
  it('should resolve path', () => {
    expect(resolve(rootdir, 'some')).toEqual(__resolve(rootdir, 'some'));
  });

  it('should create a directory scope', () => {
    expect(resolve(rootdir, 'some')).toBeTruthy();
    expect(() => resolve('../../../some')).toThrow();
  });
});
