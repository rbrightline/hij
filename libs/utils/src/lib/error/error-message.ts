export function errorMessge(message: string, args?: Record<string, any>) {
  const __args = Object.entries(args ?? {}).map(([key, value]) => {
    return `${key} -> value`;
  });
  return `${message}\n`;
}
