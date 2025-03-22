import { isAbsolute } from 'path';

/**
 * Assert that the filepath is absolute path
 * @param filepath absolute file/directory path
 * @param index optional index number which is useful when dealing with array of paths
 * @thorws when filepath is not absolute path
 */
export function isAbsolutePathOrThrow(filepath: string, index = -1) {
  if (!isAbsolute(filepath))
    throw new Error(
      `File path "${filepath}" at index ${index} is not absolute path`
    );
}
