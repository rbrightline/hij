import { debug as __debug } from 'debug';
import { resolve } from 'path';

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
    if (!absolutePath.startsWith(scopedir)) {
      const errorMessage = `
      The path is out of the defined scope!
        Scope -> ${scopedir}
        Path  -> ${absolutePath}
        `;
      throw new Error(errorMessage);
    }

    return absolutePath;
  };
}
