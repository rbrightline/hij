import { rm } from 'fs/promises';
import {
  createTestDirs,
  createTestFiles,
  TEST_DIRS_TREE,
  TEST_FILES_TREE,
} from './testing/create-test-files.js';
import { scopeResolver } from './scope-resolver.js';
import { debug as __debug } from 'debug';
import { filterFilePaths } from './filter-file-paths.js';

describe('filterFilePaths: filter out the directories from the given list', () => {
  const rootdir = 'tmp/filterFilePaths';
  const resolve = scopeResolver(rootdir);

  beforeAll(async () => {
    await createTestDirs(rootdir, TEST_DIRS_TREE);
    await createTestFiles(rootdir, TEST_FILES_TREE);
  });

  afterAll(async () => {
    await rm(rootdir, { recursive: true });
  });

  it('should filter out directories from the list of absolute paths', async () => {
    const result = await filterFilePaths([
      ...TEST_DIRS_TREE.map((filepath) => resolve(rootdir, filepath)),
      ...TEST_FILES_TREE.map(([filepath]) => resolve(rootdir, filepath)),
    ]);
    expect(result).toEqual(
      TEST_FILES_TREE.map(([filepath]) => resolve(rootdir, filepath))
    );
  });
});
