import {fireEvent} from '@testing-library/react';
import faker from 'faker';
import {TransactionStoringParams} from '_/store';


export function changeInput(element: Parameters<typeof fireEvent.change>['0'], value: string | number): void {
  fireEvent.change(element, {target: {value}});
}

export function mockTransactionData(): TransactionStoringParams {
  return {
    amount: faker.datatype.float({min: 1}).toString(),
    date: faker.datatype.datetime().toString(),
    description: faker.random.words(faker.datatype.number({max: 10, min: 1})),
    direction: faker.random.arrayElement(['income', 'expense']),
    id: faker.datatype.uuid(),
  }
}

export function transformTestDate(value_: string | Date): string {
  const value = value_.constructor === Date ? value_ : new Date(value_);

  return value.toISOString().slice(0, 10);
}
