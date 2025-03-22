import { debug as __debug } from 'debug';
import { forEachFile } from './for-each-file.js';
import { isAbsolutePathOrThrow } from './assert/is-absolute-path-or-throw.js';

/**
 * Filter out the directory paths from the given `absolute` paths.
 * @param filePaths - An array of absolute file paths.
 * @returns A promise that resolves to an array of absolute file paths only (not directories).
 * @throws If any path in `filePaths` is not absolute
 */
export async function filterFilePaths(filePaths: string[]): Promise<string[]> {
  filePaths.forEach(isAbsolutePathOrThrow);

  const filesOnly = await forEachFile(filePaths, (filepath, fileStat) => {
    return fileStat.isFile() ? filepath : undefined;
  });

  const result = filesOnly.filter((filepath) => filepath !== undefined);

  return result;
}
