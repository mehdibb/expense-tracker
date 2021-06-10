export function dateFormat(value: Date): string {
  const abbreviatedMonth = value.toString().split(" ")[1];
  const day = value.getDate();
  const year = value.getFullYear();
  
  return `${abbreviatedMonth} ${day}, ${year}`;
}