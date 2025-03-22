import { scopeResolver } from './scope-resolver.js';
import {
  createTestDirs,
  createTestFiles,
  TEST_DIRS_TREE,
  TEST_FILES_TREE,
} from './testing/create-test-files.js';
import { FileTree } from './file-tree.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { rm } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('FileTree', () => {
  const rootdir = join(__dirname, 'tmp/file-tree');
  const resolve = scopeResolver(rootdir);

  beforeAll(async () => {
    await createTestDirs(resolve(rootdir), TEST_DIRS_TREE);
    await createTestFiles(resolve(rootdir), TEST_FILES_TREE);
  });

  afterAll(async () => {
    await rm(resolve(rootdir), { recursive: true });
  });

  it('should create file tree', async () => {
    const tree = await new FileTree('tmp/file-tree').init();

    expect(tree.path).toEqual(resolve('tmp/file-tree'));
    expect(tree.children).toBeDefined();
    expect(tree.children?.path).toEqual(resolve('tmp/file-tree/first'));
    expect(tree.children?.rightSibling?.path).toEqual(
      resolve('tmp/file-tree/second')
    );

    expect(tree.children?.rightSibling?.children?.path).toEqual(
      resolve('tmp/file-tree/second/third')
    );
    expect(tree.children?.rightSibling?.children?.children?.path).toEqual(
      resolve('tmp/file-tree/second/third/file.txt')
    );
    expect(
      tree.children?.rightSibling?.children?.children?.rightSibling?.path
    ).toEqual(resolve('tmp/file-tree/second/third/forth'));
    expect(
      tree.children?.rightSibling?.children?.children?.rightSibling?.leftSibling
        ?.path
    ).toEqual(resolve('tmp/file-tree/second/third/file.txt'));
    expect(
      tree.children?.rightSibling?.children?.children?.rightSibling?.leftSibling
        ?.parent?.path
    ).toEqual(resolve('tmp/file-tree/second/third'));
  });
});
