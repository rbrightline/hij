import type { Stats } from 'fs';
import { stat } from 'fs/promises';
import { debug as __debug } from 'debug';
import type { FileHandler } from './types/file-handler.js';
import { isAbsolutePathOrThrow } from './assert/is-absolute-path-or-throw.js';

const debug = __debug('fs.forEachFile');

/**
 * Iterates over a list of file paths, retrieves their file stats, and applies a handler function to each file.
 *
 * @param filePaths - An array of absolute file paths to process.
 * @param handler - A function that processes each file. It receives the file path, its stats, and the index as arguments.
 * @returns A promise that resolves to an array of results returned by the handler function.
 *
 * @example
 * ```typescript
 * const filePaths = ['/path/to/file1.txt', '/path/to/file2.txt'];
 *
 * const results = await forEachFile(filePaths, async (filepath, stats, index) => {
 *   console.log(`Processing file ${filepath} (size: ${stats.size})`);
 *   return stats.size; // Return the file size as the result
 * });
 *
 * console.log(results); // Output: [1024, 2048] (example file sizes)
 * ```
 */
export async function forEachFile<R>(
  filePaths: string[],
  handler: FileHandler<R>
): Promise<R[]> {
  filePaths.forEach(isAbsolutePathOrThrow);

  const fileStatMapPromises = filePaths.map<
    Promise<[string, Stats] | undefined>
  >(async (filepath) => {
    try {
      const stats = await stat(filepath);
      const result = [filepath, stats] as [string, Stats];
      return result;
    } catch (error) {
      debug('Stat error: ', filepath, error);
    }
    return undefined;
  });

  const fileStatMap = await Promise.all(fileStatMapPromises);

  const resultToResolve = fileStatMap
    .filter((args) => args !== undefined)
    .map(async ([filepath, stat], index) => {
      return await handler(filepath, stat, index);
    });

  const result = await Promise.all(resultToResolve);

  return result;
}
