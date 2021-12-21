/**
 * T use reverse
 * @template T
 * @param data
 * @returns
 */

export const useReverse = <T>(data: T[]) => {
  return data?.reverse()
}
