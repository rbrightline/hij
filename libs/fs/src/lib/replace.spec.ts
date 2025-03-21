import { readFile, rm, writeFile } from 'fs/promises';
import { forEachFile } from './for-each-file.js';
import { scopeResolver } from './scope-resolver.js';
import {
  createTestDirs,
  createTestFiles,
  TEST_DIRS_TREE,
  TEST_FILES_TREE,
} from './testing/create-test-files.js';

import { debug as __debug } from 'debug';

describe('replace files content asynconiously by forEachFile function', () => {
  const rootdir = 'tmp/replace';
  const resolve = scopeResolver(rootdir);

  beforeAll(async () => {
    await createTestFiles(resolve(rootdir), TEST_FILES_TREE);
    await createTestDirs(resolve(rootdir), TEST_DIRS_TREE);
  });

  afterAll(async () => {
    await rm(resolve(rootdir), { recursive: true });
  });

  it('should replace each file content with forEachFile function', async () => {
    await forEachFile(
      TEST_FILES_TREE.map(([filepath]) => resolve(rootdir, filepath)),
      async (filepath) => {
        await writeFile(filepath, 'updated');
      }
    );

    await forEachFile(
      TEST_FILES_TREE.map(([filepath]) => resolve(rootdir, filepath)),
      async (filepath) => {
        const __content = await readFile(filepath);
        expect(__content.toString()).toEqual('updated');
      }
    );
  });
});
