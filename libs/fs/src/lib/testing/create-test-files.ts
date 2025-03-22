import { mkdir, writeFile } from 'fs/promises';
import { scopeResolver } from '../scope-resolver.js';

export const TEST_DIRS_TREE: string[] = [
  'first',
  'first/second',
  'first/second/third',
  'first/second/third/forth',
  'second',
  'second/third',
  'second/third/forth',
];

export const TEST_FILES_TREE: [string, string][] = [
  'first/file.txt',
  'first/second/file.txt',
  'second/third/file.txt',
  'first/second/third/forth/file.txt',
].map((filepath) => {
  return [filepath, filepath];
});

/**
 * Create test directories to help testing
 * @param rootDirectory
 * @param testDirs
 * @returns absolute paths of created directories
 */
export async function createTestDirs(
  rootDirectory: string,
  testDirs: string[]
): Promise<string[]> {
  const resolve = scopeResolver('tmp');
  return Promise.all(
    testDirs.map(async (filepath) => {
      filepath = resolve(rootDirectory, filepath);
      await mkdir(filepath, { recursive: true });
      return filepath;
    })
  );
}
/**
 * Create test files to help testing
 * @param rootDirectory
 * @param testFiles
 * @returns absolute paths of created files
 */
export async function createTestFiles(
  rootDirectory: string,
  testFiles: [string, string][]
): Promise<[string, string][]> {
  const resolve = scopeResolver('tmp');
  return await Promise.all(
    testFiles.map(async ([filepath, content]) => {
      await mkdir(resolve(rootDirectory, filepath, '..'), { recursive: true });
      await writeFile(resolve(rootDirectory, filepath), content);
      return [resolve(rootDirectory, filepath), content];
    })
  );
}
