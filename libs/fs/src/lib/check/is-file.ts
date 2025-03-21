import { stat } from 'fs/promises';

export async function isFile(filepath: string) {
  return (await stat(filepath)).isFile();
}
