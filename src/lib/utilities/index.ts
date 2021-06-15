export function parseDateFromString(value: string): Date {
  // FIXME: changing "map((stringValue) => parseInt(stringValue))" to the shorter form "map(parseInt)" will
  // cause malfunction: "2021 06 01" => [2021, NaN, 01]
  const [year, month, day] = value.split('-').map((stringValue) => parseInt(stringValue));
  
  return new Date(year, month, day);
}

export * from './types';
export * from './string';
export * from './date';
export {default as memo} from './memo';