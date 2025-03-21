export async function resolveAll<T>(promises: Promise<T>[], size = 20) {
  const length = promises.length;
  const response: T[] = [];
  for (let start = 0; start < length; start = start + size) {
    const currentResponse = await Promise.all(promises.slice(start, size - 1));

    response.push(...currentResponse);
  }
  return response;
}
