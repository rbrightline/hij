import { isFile } from './is-file.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { scopeResolver } from '../scope-resolver.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('isFile', () => {
  const resolve = scopeResolver(__dirname);
  it('should check the filepath is directory or not', async () => {
    expect(await isFile(resolve(__dirname, '.'))).toEqual(false);
    expect(await isFile(resolve(__dirname, 'is-directory.ts'))).toEqual(true);
  });
});
