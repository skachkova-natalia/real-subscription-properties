export function bindAllMethods<T extends object>(obj: T): T {
  const bindObj = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const bindValue = value instanceof Function ? value.bind(obj) : value;
      return [key, bindValue];
    }),
  );
  return bindObj as T;
}
