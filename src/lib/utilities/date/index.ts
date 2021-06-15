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

export const monthMap: Record<string, string> = {
  "1": "Jan",
  "2": "Feb",
  "3": "March",
  "4": "Apr",
  "5": "May",
  "6": "Jun",
  "7": "Jul",
  "8": "Aug",
  "9": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dev",
}