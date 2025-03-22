import { stat } from 'fs/promises';

/**
 * Check the filepath points out to a directory or not
 * @param filepath file/directory path
 * @returns boolean `true` if the filepath points out to an directory else `false`
 */
export async function isDirectory(filepath: string) {
  return (await stat(filepath)).isDirectory();
}
