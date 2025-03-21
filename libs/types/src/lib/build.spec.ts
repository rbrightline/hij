import { readFile } from 'fs/promises';
import { join } from 'path';

describe('build', () => {
  it('types library should be built correctly', async () => {
    expect(
      await readFile(join(__dirname, '../../dist', 'index.d.ts'))
    ).toBeTruthy();
  });
});
