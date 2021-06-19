export function parseFloatWithTwoDecimal(value: string): number {
  return Number(parseFloat(value).toFixed(2));
}