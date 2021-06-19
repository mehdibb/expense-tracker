import {fireEvent, getNodeText, render, within} from '@testing-library/react'
import {MemoryRouter} from 'react-router'
import {LOCAL_STORAGE_INITIAL_BALANCE_KEY, LOCAL_STORAGE_TRANSACTIONS_KEY} from '_/store/store';
import {Application} from '../pages';
import faker from 'faker';
import {changeInput, currencyFormat} from '_/utilities';
import {Transaction, TransactionStoringParams} from '_/store';


function mockTransactionData(): TransactionStoringParams {
  return {
    amount: faker.datatype.float({min: 1}).toString(),
    date: faker.datatype.datetime().toString(),
    description: faker.random.words(faker.datatype.number({max: 10, min: 1})),
    direction: faker.random.arrayElement(['income', 'expense']),
    id: faker.datatype.uuid(),
  }
}

let initialBalance: number;

beforeEach(() => {
  initialBalance = faker.datatype.float({});
  localStorage.setItem(LOCAL_STORAGE_INITIAL_BALANCE_KEY, initialBalance.toString());
});

describe('User Stories', () => {
  describe('Transaction Form', () => {
    it('cannot be submitter unless all fields are validated.', () => {
      const amount = faker.datatype.number({min: 1});
      const note = faker.random.words(5);
      const date = faker.datatype.datetime().toISOString().slice(0, 10);
      const direction = faker.random.arrayElement(['income', 'expense']);
      
      const {getByText, getByLabelText} = render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>
      )
      
      fireEvent.click(getByText("Add Transaction"))
      
      expect(getByText("Save Transaction")).toHaveAttribute("disabled", "");

      // All fields are required and cannot be empty
      changeInput(getByLabelText("Enter amount"), amount);
      expect(getByText("Save Transaction")).toHaveAttribute("disabled", "");
      
      // Amount filed cannot have zero or negative value
      changeInput(getByLabelText("Enter amount"), 0);
      expect(getByLabelText("Enter amount")).toHaveValue(amount);

      changeInput(getByLabelText("Enter amount"), -amount);
      expect(getByLabelText("Enter amount")).toHaveValue(amount);
      
      changeInput(getByLabelText("Note"), note);
      expect(getByText("Save Transaction")).toHaveAttribute("disabled", "");
      
      changeInput(getByLabelText("Date"), date);
      expect(getByText("Save Transaction")).toHaveAttribute("disabled", "");

      changeInput(getByLabelText("Category"), direction);

      expect(getByText("Save Transaction")).not.toHaveAttribute("disabled", "");
    });
  });

  describe('Initial Balance', () => {
    it('cannot have a value less than zero entered by user.', () => {
      const newInitialBalance = faker.datatype.number({min: 1});
      
      const {getByLabelText, getByTestId} = render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>
      );
      
      fireEvent.click(within(getByTestId("application-header")).getByTitle("Edit"));

      // Does not accept negative values
      changeInput(getByLabelText("Initial balance:"), -newInitialBalance);

      expect(within(getByTestId("application-header")).getByTitle("Save")).toHaveAttribute("disabled", "");
      
      // Does accept zero
      changeInput(getByLabelText("Initial balance:"), 0);

      expect(getByLabelText("Initial balance:")).toHaveValue("0");

      fireEvent.click(within(getByTestId("application-header")).getByTitle("Save"));

      expect(getByTestId("application-header")).toHaveTextContent("$0.00");
    });
  });

  describe('Wallet Balance', () => {
    it('shows the sum of initial balance and the transactions.', () => {
      const transactionsData = Array.from({length: faker.datatype.float({max: 10, min: 3})}, mockTransactionData);
      const transactionsList = transactionsData.map((transaction) => new Transaction(transaction));
      
      const {getByLabelText, getByTitle, getByText} = render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>
      );

      transactionsList.forEach(({amount, date, description, transactionDirection}) => {
        fireEvent.click(getByText("Add Transaction"));
        
        changeInput(getByLabelText("Enter amount"), amount.value)
        changeInput(getByLabelText("Note"), description.value);
        changeInput(getByLabelText("Date"), date.dateValue.toISOString().slice(0, 10));
        changeInput(getByLabelText("Category"), transactionDirection.storingParam);

        fireEvent.click(getByText("Save Transaction"));
      });
      
      expect(getNodeText(getByTitle("total balance"))).toBe(currencyFormat(
        (
          initialBalance +
          [...transactionsList]
            .reduce((accumulator, {signedAmount}) => accumulator + signedAmount, 0)
        )
      ));
    });
  });

  describe('Currency Formats', () => {
    it('displays number currencies in a correct format.', () => {
      const transactionsData = Array.from({length: faker.datatype.float({max: 10, min: 3})}, mockTransactionData);
      const transactionsList = transactionsData.map((transaction) => new Transaction(transaction));
      
      localStorage.setItem(
        LOCAL_STORAGE_TRANSACTIONS_KEY,
        JSON.stringify(transactionsList.map((transaction) => transaction.storingParams)),
      );
      
      const {getByTestId} = render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>
      );

      transactionsList.forEach(({displayAmount, description}) => {
        expect(
            getNodeText(// querying an element using dom properties like "parentElement" is generally bad practice, regarding the
            // accessibility reasons and is also considered implementation test as well which is bad practice too.
            // A good alternative would be using RTL custom queries which is out of the scope of this assessment.
            within(within(getByTestId("transactions-list")).getByText(description.value).parentElement as HTMLElement)
              .getByTestId("transaction-amount")
          )
        ).toBe(displayAmount)
      })
      
      expect(getNodeText(within(getByTestId("application-header")).getByTitle("total balance")))
        .toBe(
          currencyFormat(
            (
              initialBalance +
              [...transactionsList]
                .reduce((accumulator, {signedAmount}) => accumulator + signedAmount, 0)
            )
          )
        );
    });
  });

  describe("Transactions", () => {
    it("are sorted by date based on their date descending", () => {
      const transactionsData = Array.from({length: faker.datatype.float({max: 10, min: 3})}, mockTransactionData);
      transactionsData.sort(
        ({date: firstDate}, {date: secondDate}) => (new Date(secondDate)).getTime() - (new Date(firstDate)).getTime(),
      );
      const transactionsList = transactionsData.map((transaction) => new Transaction(transaction));
      
      localStorage.setItem(
        LOCAL_STORAGE_TRANSACTIONS_KEY,
        JSON.stringify(transactionsList.map((transaction) => transaction.storingParams)),
      );
      
      const {getByTestId} = render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>
      );
      
      // This is another implementation test, but since there isn't any reasonable way to test the sort of rendering
      // the elements in RTL it was somewhat unavoidable.
      [...getByTestId("transactions-list").firstChild?.childNodes as unknown as HTMLElement[]]
      .filter((element) => element.nodeName === "LI")
      .forEach((element, index) => {
        expect(element).toHaveTextContent(transactionsData[index].description);
      })
    });
  });
});
