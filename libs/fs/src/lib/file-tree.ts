import { readFile, rename, rm, writeFile } from 'fs/promises';
import { isDirectory } from './check/is-directory.js';
import { dirs } from './dirs.js';
import { scopeResolver } from './scope-resolver.js';

export class FileTree {
  readonly path: string;
  leftSibling?: FileTree;
  rightSibling?: FileTree;
  children?: FileTree;
  parent?: FileTree;
  readonly isFile: () => Promise<boolean>;
  readonly isDirectory: () => Promise<boolean>;
  readonly resolve: ReturnType<typeof scopeResolver>;

  constructor(filepath: string, parent?: FileTree) {
    this.parent = parent;
    // resolver should allow operation in the same directory such as renaming
    // to accoplish this, scope path is set to the parent directory of the filepath
    this.resolve = scopeResolver(`${filepath}/..`);

    this.path = this.resolve(filepath);

    this.isDirectory = async () => await isDirectory(this.path);
  }

  async init(): Promise<FileTree> {
    if (!(await this.isDirectory())) return this;

    const subdirs = await dirs(this.path);

    if (subdirs.length === 0) return this;

    const subTrees = await Promise.all(
      subdirs.map(async (filepath) => new FileTree(filepath, this).init())
    );

    subTrees.forEach((tree, index, array) => {
      this.addSibling(tree, array[index + 1]);
    });

    this.children = subTrees[0];

    return this;
  }

  protected addSibling(left?: FileTree, right?: FileTree) {
    if (left && right) {
      left.rightSibling = right;
      right.leftSibling = left;
    }
  }

  /**
   * Read file
   * @returns
   */
  async read() {
    return await readFile(this.path);
  }

  /**
   * Write file
   * @param content
   * @returns
   */
  async write(content: string) {
    return await writeFile(this.path, content);
  }

  /**
   * Rename the file/directory. It does not move the file/directory. It only renames.
   * @param newName new file/directory name
   */
  async rename(newName: string) {
    await rename(this.path, this.resolve(this.path, '..', newName));
  }

  /**
   * Replace file content
   * @param from
   * @param to
   * @returns
   */
  async replace(from: RegExp[], to: string[]) {
    let content = (await this.read()).toString();

    from.forEach((exp, index) => {
      content = content.replace(exp, to[index] ?? to[0]);
    });

    return await this.write(content);
  }

  /**
   * Delete the file and references
   */
  async delete() {
    this.parent = undefined;
    this.children = undefined;

    if (this.rightSibling && this.leftSibling) {
      this.rightSibling.leftSibling = this.leftSibling;
      this.leftSibling.rightSibling = this.rightSibling;
    } else if (this.leftSibling) {
      this.leftSibling.rightSibling = undefined;
    } else if (this.rightSibling) {
      this.rightSibling.leftSibling = undefined;
    }

    await rm(this.path, { recursive: true });
  }
}
