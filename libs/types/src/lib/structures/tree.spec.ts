// export interface Tree<T> {
//   value: T;
//   parent: Tree<T>;
//   left: Tree<T>;
//   right: Tree<T>;
//   children: Tree<T>;
// }

export class FileTree<T extends string> {
  value: string;
  parent: FileTree<string>;
  left?: FileTree<string>;
  right?: FileTree<string>;
  children: FileTree<string>;
  constructor(value: string) {
    this.value = value;
  }

  valueOf() {
    return this.value;
  }

  [Symbol.toPrimitive]() {
    return this.value;
  }

  *[Symbol.iterator](): Iterator<string> {
    let current: FileTree<T> | undefined = this;
    while (current) {
      yield current.value;
      if (current.left) {
        for (const e of current.left) {
          yield e;
        }
      }

      if (current.right) {
        for (const e of current.right) {
          yield e;
        }
      }

      current = current.children;
    }
  }
}

const a = new FileTree('some');
const b = new FileTree('some');

describe('Some data structures', () => {
  it('should allow using operators', () => {
    expect(a > b).toEqual(false);
    expect(a < b).toEqual(false);
    expect(a >= b).toEqual(true);
    expect(a <= b).toEqual(true);

    const tree = new FileTree('First');

    tree.left = new FileTree('Second');
    tree.left.children = new FileTree('Second - child 1');
    tree.left.children.left = new FileTree('Second - child 2');
    tree.left.children.right = new FileTree('Second - child 3');

    tree.right = new FileTree('Third');

    tree.children = new FileTree('Child 1');

    tree.children.right = new FileTree('Child 2');

    for (const t of tree) {
      console.log(t);
    }
  });
});
