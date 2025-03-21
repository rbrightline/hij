import { rm } from 'fs/promises';
import { dirs } from './dirs.js';
import { createTestDirs, TEST_DIRS_TREE } from './testing/create-test-files.js';
import { scopeResolver } from './scope-resolver.js';
import { debug as __debug } from 'debug';

describe('dirs: list all dirs/files under the provided directory', () => {
  const rootdir = 'tmp/dirs';
  const resolve = scopeResolver(rootdir);
  const rootDirectory = resolve(rootdir);

  beforeAll(async () => {
    await createTestDirs(rootdir, TEST_DIRS_TREE);
  });

  afterAll(async () => {
    await rm(rootDirectory, { recursive: true });
  });

  it('should list all dirs/files under the directory', async () => {
    const result = await dirs(rootDirectory, { recursive: true });
    expect(result).toEqual(
      TEST_DIRS_TREE.map((filepath) => resolve(rootDirectory, filepath))
    );
  });
});
