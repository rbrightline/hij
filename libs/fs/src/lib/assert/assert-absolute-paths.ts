import { isAbsolute } from 'path';
import { debug as __debug } from 'debug';
const debug = __debug('fs.assertAbsolutePaths');

export function assertAbsolutePath(filepath: string, index = -1) {
  if (!isAbsolute(filepath))
    throw new Error(
      `File path "${filepath}" at index ${index} is not absolute path`
    );
}

export function assertAbsolutePaths(filepaths: string[]) {
  debug('filepaths: ', filepaths);
  filepaths.forEach((filepath, index) => assertAbsolutePath(filepath, index));
}
