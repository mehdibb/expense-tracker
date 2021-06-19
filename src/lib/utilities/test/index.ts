import {fireEvent} from "@testing-library/react";


export function changeInput(element: Parameters<typeof fireEvent.change>['0'], value: string | number): void {
  fireEvent.change(element, {target: {value}});
}