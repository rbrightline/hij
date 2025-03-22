import { stat } from 'fs/promises';

/**
 * Check the filepath points out to a file or not
 * @param filepath file/directory path
 * @returns boolean `true` if the filepath points out to a file else `false`
 */
export async function isFile(filepath: string) {
  return (await stat(filepath)).isFile();
}
