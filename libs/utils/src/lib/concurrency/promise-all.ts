/**
 * Processes an array of promise-returning functions in batches, limiting concurrent execution.
 * Resolve promises using Promise.all
 * @param promises list of function that return promise
 * @param batchSize number of function to execute at a time
 * @returns an array of results or undefined for failed promises.
 */
export async function promiseAll<T>(
  promises: (() => Promise<T | undefined>)[],
  batchSize = 20
) {
  const length = promises.length;
  const response: (T | undefined)[] = [];
  for (let start = 0; start < length; start = start + batchSize) {
    const currentResponse = await Promise.all(
      promises.slice(start, start + batchSize).map(async (startPromise) => {
        try {
          return await startPromise();
        } catch (error) {
          return undefined;
        }
      })
    );
    response.push(...currentResponse);
  }
  return response;
}
