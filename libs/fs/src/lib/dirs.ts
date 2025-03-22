import { readdir } from 'fs/promises';
import { isDirectory } from './check/is-directory.js';
import type { FileOptions } from './types/file-options.js';
import { scopeResolver } from './scope-resolver.js';

/**
 * Finds all files and directories under the provided directory, optionally recursively.
 * The function ensures secure path resolution and handles edge cases gracefully.
 * @param directory The root directory to search for files and directories.
 * @param options Configuration options for the search.
 * @returns An array of resolved paths for all files and directories found under the provided directory.
 *  If recursive is true, the array includes paths from subdirectories as well.
 */
export async function dirs(
  directory: string,
  options?: FileOptions
): Promise<string[]> {
  // Uses scopeResolver to ensure paths are resolved securely within the provided directory,
  // preventing directory traversal attacks.
  const resolve = scopeResolver(directory);

  const root = resolve(directory);

  // Get all dirs and resolve them
  const entries = await readdir(root);
  const entiryPaths = entries.map((filepath) => resolve(root, filepath));

  edgeOperation: {
    // If there is not directory/file under the root, then return empty array
    if (entiryPaths.length === 0) return [];
  }

  noneRecursiveOperation: {
    // If options.recursive is not true, then return the found directories/files
    if (options?.recursive !== true) return entiryPaths;
  }

  recursiveOperation: {
    // files does not have sub files/directories so we need only directories for recursive operation
    // So filtering directories of the current roots
    const filteredDirs = await Promise.all(entiryPaths.filter(isDirectory));

    // If there is not directory under the current root directories, then return empty array
    if (filteredDirs.length === 0) return [];

    // Apply the recursive dirs function for filtered directories
    // and merge the result with the current current root and return
    const subDirsToResolve = filteredDirs.map(async (filepath, index) => {
      const subdirs = await dirs(filepath, options);
      return [filepath, ...subdirs];
    });

    // Resolve the recurive operation
    const result = await Promise.all(subDirsToResolve);

    // As each recursive operation return an array, we have a list of arrays in hand.
    // Flat the array and return
    return result.flat();
  }
}
