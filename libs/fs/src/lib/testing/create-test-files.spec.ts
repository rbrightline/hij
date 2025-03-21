import { readdir, rm } from 'fs/promises';
import {
  createTestDirs,
  createTestFiles,
  TEST_DIRS_TREE,
  TEST_FILES_TREE,
} from './create-test-files.js';
import { scopeResolver } from '../scope-resolver.js';

describe('createTestFiles', () => {
  const rootDirectory = 'tmp/test';
  const resolve = scopeResolver(rootDirectory);

  beforeAll(async () => {
    await createTestDirs(resolve(rootDirectory), TEST_DIRS_TREE);
    await createTestFiles(resolve(rootDirectory), TEST_FILES_TREE);
  });

  afterAll(async () => {
    await rm(resolve(rootDirectory), { recursive: true });
  });

  it('should create test files', async () => {
    const result = await readdir(resolve(rootDirectory));
    expect(result.length).greaterThan(0);
  });
});
