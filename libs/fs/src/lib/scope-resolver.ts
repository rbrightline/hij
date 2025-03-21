import { debug as __debug } from 'debug';
import { resolve } from 'path';

const debug = __debug('fs.scopeResolver');

/**
 * Creates a scoped path resolver function that ensures resolved paths are within a specified directory.
 *
 * @param filepath - The base directory path to scope the resolver to. All resolved paths must be inside this directory.
 * @returns A function that resolves paths relative to the scoped directory and throws an error if the resolved path is outside the scope.
 *
 * @example
 * ```typescript
 * const resolveInScope = scopeResolver('/projects/my-app');
 *
 * // Resolves to '/projects/my-app/src/index.ts'
 * const validPath = resolveInScope('src', 'index.ts');
 *
 * // Throws an error because the resolved path is outside the scoped directory
 * const invalidPath = resolveInScope('..', 'other-app', 'file.ts');
 * ```
 */
export function scopeResolver(filepath: string) {
  const scopedir = resolve(filepath);

  return (...pathSegments: string[]) => {
    const absolutePath = resolve(...pathSegments);
    if (!absolutePath.startsWith(scopedir))
      throw new Error(
        `Path "${absolutePath}" must be inside the scope "${scopedir}"`
      );

    debug('resolved path by scope resolver: ', absolutePath);
    return absolutePath;
  };
}
