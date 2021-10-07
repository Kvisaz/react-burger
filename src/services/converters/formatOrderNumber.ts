export function formatOrderNumber(number: number): string {
  return `${number}`.padStart(6, '0');
}