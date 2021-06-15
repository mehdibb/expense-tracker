export function currencyFormat(value_: number | string, alwaysShowSign = false): string {
  const value = typeof value_ === 'number' ? value_ : parseInt(value_);

  // TODO: find a native solution for +/- marker
  return `
    ${value > 0 && alwaysShowSign ? '+' : ''}\
${(new Intl.NumberFormat([], {style: 'currency', currency: 'USD'})).format(value)}
  `;
}