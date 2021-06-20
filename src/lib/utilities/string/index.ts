import {parseFloatWithTwoDecimal} from '../number';


export function currencyFormat(value_: number, alwaysShowSign = false): string {
  const value = typeof value_ === 'number' ? value_ : parseFloatWithTwoDecimal(value_);

  // TODO: find a native solution for +/- marker
  return `
${value > 0 && alwaysShowSign ? '+' : ''}\
${(new Intl.NumberFormat([], {style: 'currency', currency: 'USD'})).format(value)}
  `;
}
