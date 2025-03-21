import type { Stats } from 'fs';

export type FileHandler<R> =
  | ((filepath: string, fileStat: Stats, index: number) => Promise<R>)
  | ((filepath: string, fileStat: Stats, index: number) => R);
