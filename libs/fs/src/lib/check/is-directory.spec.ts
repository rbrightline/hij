import { scopeResolver } from '../scope-resolver.js';
import { isDirectory } from './is-directory.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('isDirectory', () => {
  const resolve = scopeResolver('.');
  it('should check the filepath is directory or not', async () => {
    expect(await isDirectory(resolve(__dirname))).toEqual(true);
    expect(await isDirectory(resolve(__dirname, 'is-directory.ts'))).toEqual(
      false
    );
  });
});
