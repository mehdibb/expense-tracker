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

export function currencyFormat(value_: number | string, alwaysShowSign = false): string {
  const value = typeof value_ === 'number' ? value_ : parseInt(value_);

  // TODO: find a native solution for +/- marker
  return `
    ${value > 0 && alwaysShowSign ? '+' : ''}\
${(new Intl.NumberFormat([], {style: 'currency', currency: 'USD'})).format(value)}
  `;
}