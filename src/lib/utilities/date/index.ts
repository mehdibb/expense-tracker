export function dateFormat(
  value: Date,
  options?: {
    day?: boolean;
    twoDigitDay?: boolean;
    month?: boolean;
    year?: boolean;
  }): string {
  const abbreviatedMonth = value.toString().split(" ")[1];
  const day = value.getDate();
  const twoDigitDay = day < 10 ? `0${day}` : day;
  const year = value.getFullYear();
  
  if (!options) {
    return `${abbreviatedMonth} ${day}, ${year}`;
  }
  
  return `
    ${options.day && options.twoDigitDay
      ? twoDigitDay + ' '
      : options.day
        ? day
        : ''}
    ${options.month ? abbreviatedMonth + ' ' : ''}
    ${options.year ? year + ' ' : ''}`.trim();
}

export function parseDateFromString(value: string): Date {
  // FIXME: changing "map((stringValue) => parseInt(stringValue))" to the shorter form "map(parseInt)" will
  // cause malfunction: "2021 06 01" => [2021, NaN, 01]
  const [year, month, day] = value.split('-').map((stringValue) => parseInt(stringValue));
  
  return new Date(year, month, day);
}

export const monthMap: Record<string, string> = {
  "0": "Jan",
  "1": "Feb",
  "2": "Mar",
  "3": "Apr",
  "4": "May",
  "5": "Jun",
  "6": "Jul",
  "7": "Aug",
  "8": "Sep",
  "9": "Oct",
  "10": "Nov",
  "11": "Dec",
}