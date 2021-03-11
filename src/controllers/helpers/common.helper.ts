export function like(key: string, val: string): object {
  return {
    [key]: {
      like: `%${val}%`,
    },
  };
}
