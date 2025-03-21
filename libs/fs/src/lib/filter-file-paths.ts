import { assertAbsolutePaths } from './assert/assert-absolute-paths.js';
import { debug as __debug } from 'debug';
import { forEachFile } from './for-each-file.js';

const debug = __debug('fs.filterFilePaths');

/**
 * Filter out the directory paths from the given `absolute` paths.
 * @param filePaths - An array of absolute file paths.
 * @returns A promise that resolves to an array of absolute file paths only (not directories).
 * @throws If any path in `filePaths` is not absolute
 */
export async function filterFilePaths(filePaths: string[]): Promise<string[]> {
  debug('filePaths: ', filePaths);
  assertAbsolutePaths(filePaths);

  const filesOnly = await forEachFile(filePaths, (filepath, fileStat) => {
    return fileStat.isFile() ? filepath : undefined;
  });

  debug('filesOnly: ', filePaths);

  const result = filesOnly.filter((filepath) => filepath !== undefined);

  debug('result: ', result);

  return result;
}
