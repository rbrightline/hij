import { stat } from 'fs/promises';

export async function isDirectory(filepath: string) {
  return (await stat(filepath)).isDirectory();
}
