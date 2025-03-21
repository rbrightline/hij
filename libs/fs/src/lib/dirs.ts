import { readdir } from 'fs/promises';
import { join, resolve } from 'path';
import { isDirectory } from './check/is-directory.js';
import type { FileOptions } from './types/file-options.js';

export async function dirs(
  directory: string,
  options?: FileOptions
): Promise<string[]> {
  const foundDirs = (await readdir(directory)).map((filepath) =>
    resolve(join(directory, filepath))
  );

  if (options?.recursive) {
    const subDirsToResolve = foundDirs.map(
      async (filepath): Promise<string[]> => {
        if (await isDirectory(filepath)) {
          const subDirs = await dirs(filepath, options);
          return [filepath, ...subDirs];
        }
        return [filepath];
      }
    );
    const subDirs = await Promise.all(subDirsToResolve);

    return subDirs.flat();
  }

  return foundDirs;
}
