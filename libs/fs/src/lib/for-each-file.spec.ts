import { rm } from 'fs/promises';
import { forEachFile } from './for-each-file.js';
import { scopeResolver } from './scope-resolver.js';
import {
  createTestDirs,
  createTestFiles,
  TEST_DIRS_TREE,
  TEST_FILES_TREE,
} from './testing/create-test-files.js';
import { Stats } from 'fs';

describe('forEachFile: go through for each file', () => {
  const rootdir = 'tmp/for-each-file-stat';
  const resolve = scopeResolver(rootdir);
  beforeAll(async () => {
    await createTestFiles(resolve(rootdir), TEST_FILES_TREE);
    await createTestDirs(resolve(rootdir), TEST_DIRS_TREE);
  });

  afterAll(async () => {
    await rm(resolve(rootdir), { recursive: true });
  });

  it('should forEachFile hander return handler params', async () => {
    await Promise.all(
      await forEachFile(
        TEST_FILES_TREE.map(([filepath]) => resolve(rootdir, filepath)),
        (_, stat) => {
          expect(_).toBeTypeOf('string');
          expect(stat).instanceOf(Stats);
        }
      )
    );
  });
});
