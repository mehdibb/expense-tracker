import {fireEvent, getNodeText, render, within} from '@testing-library/react'
import {MemoryRouter} from 'react-router'
import {LOCAL_STORAGE_INITIAL_BALANCE_KEY, LOCAL_STORAGE_TRANSACTIONS_KEY} from '_/store/store';
import {Application} from '../pages';
import faker from 'faker';
import {
  changeInput,
  currencyFormat,
  mockTransactionData,
  parseFloatWithTwoDecimal,
  transformTestDate,
} from '_/utilities';
import {Transaction} from '_/store';


let initialBalance: number;

beforeEach(() => {
  initialBalance = faker.datatype.float({});
  localStorage.setItem(LOCAL_STORAGE_INITIAL_BALANCE_KEY, initialBalance.toString());
  localStorage.setItem(LOCAL_STORAGE_TRANSACTIONS_KEY, JSON.stringify([]));
});

// test ids is used quite a few times in these tests. I personally am against using them frequently but the better
// option is to use RTL custom queries which is beyond the scope of this task.
describe('User Stories', () => {
  describe('Transaction Form', () => {
    it('cannot be submitted until all fields are validated.', () => {
      const transaction = mockTransactionData();
      
      const {getByText, getByLabelText} = render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>
      )
      
      fireEvent.click(getByText("Add Transaction"))
      
      expect(getByText("Save Transaction")).toHaveAttribute("disabled", "");

      // All fields are required and cannot be empty
      changeInput(getByLabelText("Enter amount"), transaction.amount);
      expect(getByText("Save Transaction")).toHaveAttribute("disabled", "");
      
      // Amount filed cannot have zero or negative value
      changeInput(getByLabelText("Enter amount"), 0);
      expect(getByLabelText("Enter amount")).toHaveValue(parseFloatWithTwoDecimal(transaction.amount));

      changeInput(getByLabelText("Enter amount"), -transaction.amount);
      expect(getByLabelText("Enter amount")).toHaveValue(parseFloatWithTwoDecimal(transaction.amount));
      
      changeInput(getByLabelText("Note"), transaction.description);
      expect(getByText("Save Transaction")).toHaveAttribute("disabled", "");
      
      changeInput(getByLabelText("Date"), transformTestDate(transaction.date));
      expect(getByText("Save Transaction")).toHaveAttribute("disabled", "");

      changeInput(getByLabelText("Category"), transaction.direction);

      expect(getByText("Save Transaction")).not.toHaveAttribute("disabled", "");
    });

    // The functionality of the form is tested in the above test to some extent but it is not the main purpose of it.
    // Having a separate test for this matter, will make it easier to check later on.
    // Also whether the newly created transaction is added to the transactions list is tested here which is a
    // functionality that is important to test. Also the transaction form is a reusable component which is 
    // crucial to be tested if it functions correctly in different situations.
    it("creates a transaction with the provided fields and is added to the transactions list", () => {
      const transactionData = mockTransactionData()
      
      const {getByText, getByLabelText, getByTestId} = render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>
      );
      
      fireEvent.click(getByText("Add Transaction"))

      changeInput(getByLabelText("Enter amount"), transactionData.amount);
      changeInput(getByLabelText("Note"), transactionData.description);
      changeInput(getByLabelText("Date"), transformTestDate(transactionData.date));
      changeInput(getByLabelText("Category"), transactionData.direction);

      fireEvent.click(getByText("Save Transaction"));

      expect(getByTestId("transactions-list"))
        .toContainElement(within(getByTestId("transactions-list")).queryByText(transactionData.description));
    });

    // The creation process of a transaction is tested, but it is important that a transaction can be updated.
    // The updated transaction should be shown in the transactions list with the new values and the previous
    // one should not exist there.
    it("updates the selected transaction with the new values", () => {
      const transactionsData = Array.from({length: faker.datatype.float({max: 10, min: 3})}, mockTransactionData);
      const transactionsList = transactionsData.map((transaction) => new Transaction(transaction));
      
      const chosenTransaction = faker.random.arrayElement(transactionsData);

      const newTransactionData = mockTransactionData();
      
      localStorage.setItem(
        LOCAL_STORAGE_TRANSACTIONS_KEY,
        JSON.stringify(transactionsList.map((transaction) => transaction.storingParams)),
      );
      
      const {getByTestId, getByLabelText, getByText} = render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>
      );

      fireEvent.click(
        // TODO: querying an element using dom properties like "parentElement" is generally bad practice, regarding the
        // accessibility reasons and is also considered implementation test as well which is bad practice too.
        // A good alternative would be using RTL custom queries which is beyond the scope of this assessment.
        within(getByTestId("transactions-list"))
          .getByText(chosenTransaction.description).parentElement as HTMLElement,
      );

      changeInput(getByLabelText("Enter amount"), newTransactionData.amount);
      changeInput(getByLabelText("Note"), newTransactionData.description);
      changeInput(getByLabelText("Date"), transformTestDate(newTransactionData.date));
      changeInput(getByLabelText("Category"), newTransactionData.direction);

      fireEvent.click(getByText("Save Transaction"));

      expect(getByTestId("transactions-list"))
        .toContainElement(within(getByTestId("transactions-list")).queryByText(newTransactionData.description));
      expect(getByTestId("transactions-list"))
        .not.toContainElement(within(getByTestId("transactions-list")).queryByText(chosenTransaction.description));
    });

    // Almost same as the update, it should be tested that the selected transaction is deleted from the transactions list
    it("deletes the selected transaction", () => {
      const transactionsData = Array.from({length: faker.datatype.float({max: 10, min: 3})}, mockTransactionData);
      const transactionsList = transactionsData.map((transaction) => new Transaction(transaction));
      
      const chosenTransaction = faker.random.arrayElement(transactionsData);

      localStorage.setItem(
        LOCAL_STORAGE_TRANSACTIONS_KEY,
        JSON.stringify(transactionsList.map((transaction) => transaction.storingParams)),
      );

      const {getByTestId, queryByTestId} = render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>
      );

      fireEvent.click(
        // TODO: querying an element using dom properties like "parentElement" is generally bad practice, regarding the
        // accessibility reasons and is also considered implementation test as well which is bad practice too.
        // A good alternative would be using RTL custom queries which is beyond the scope of this assessment.
        within(getByTestId("transactions-list"))
          .getByText(chosenTransaction.description).parentElement as HTMLElement,
      );

      fireEvent.click(within(getByTestId("transaction-form")).getByText("Delete"));

      expect(queryByTestId("transaction-form")).not.toBeInTheDocument();
      expect(getByTestId("transactions-list"))
        .not.toContainElement(within(getByTestId("transactions-list")).queryByText(chosenTransaction.description));
    });
  });

  describe("Transaction Filters", () => {
    it("filters the transactions based on their year", () => {
      const transactionsData = Array.from({length: faker.datatype.float({max: 10, min: 3})}, mockTransactionData);
      const transactionsList = transactionsData.map((transaction) => new Transaction(transaction));
      
      const chosenTransactionData = faker.random.arrayElement(transactionsData);
      const chosenTransaction = transactionsList.find(({id}) => id === chosenTransactionData.id) as Transaction;

      localStorage.setItem(
        LOCAL_STORAGE_TRANSACTIONS_KEY,
        JSON.stringify(transactionsList.map((transaction) => transaction.storingParams)),
      );

      const {getByTestId, getByLabelText} = render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>
      );

      changeInput(getByLabelText("Year"), chosenTransaction.date.dateValue.getFullYear());

      expect(getByTestId("transactions-list"))
        .toContainElement(within(getByTestId("transactions-list")).getByText(chosenTransactionData.description));
      transactionsList
        .forEach((transaction) => {
          if (transaction.date.dateValue.getFullYear() === chosenTransaction.date.dateValue.getFullYear()) {
            expect(getByTestId("transactions-list")).toContainElement(
              within(getByTestId("transactions-list")).queryByText(transaction.description.value)
            )
          }
          else {
            expect(getByTestId("transactions-list")).not.toContainElement(
              within(getByTestId("transactions-list")).queryByText(transaction.description.value)
            )
          }
        });
    });

    it("filters the transactions based on their month", () => {
      const transactionsData = Array.from({length: faker.datatype.float({max: 10, min: 3})}, mockTransactionData);
      const transactionsList = transactionsData.map((transaction) => new Transaction(transaction));
      
      const chosenTransactionData = faker.random.arrayElement(transactionsData);
      const chosenTransaction = transactionsList.find(({id}) => id === chosenTransactionData.id) as Transaction;

      localStorage.setItem(
        LOCAL_STORAGE_TRANSACTIONS_KEY,
        JSON.stringify(transactionsList.map((transaction) => transaction.storingParams)),
      );

      const {getByTestId, getByLabelText} = render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>
      );

      changeInput(getByLabelText("Month"), chosenTransaction.date.dateValue.getMonth());

      transactionsList
      .forEach((transaction) => {
        if (transaction.date.dateValue.getMonth() === chosenTransaction.date.dateValue.getMonth()) {
          expect(getByTestId("transactions-list")).toContainElement(
            within(getByTestId("transactions-list")).queryByText(transaction.description.value)
          )
        }
        else {
          expect(getByTestId("transactions-list")).not.toContainElement(
            within(getByTestId("transactions-list")).queryByText(transaction.description.value)
          )
        }
      });
    });

    it("filters the transactions based on their type", () => {
      const transactionsData = Array.from({length: faker.datatype.float({max: 10, min: 3})}, mockTransactionData);
      const transactionsList = transactionsData.map((transaction) => new Transaction(transaction));
      
      const chosenType = faker.random.arrayElement(['income', 'expense']);

      localStorage.setItem(
        LOCAL_STORAGE_TRANSACTIONS_KEY,
        JSON.stringify(transactionsList.map((transaction) => transaction.storingParams)),
      );

      const {getByTestId, getByLabelText} = render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>
      );

      changeInput(getByLabelText("Type"), chosenType);

      transactionsList
      .forEach((transaction) => {
        if (transaction.transactionDirection.storingParam === chosenType) {
          expect(getByTestId("transactions-list")).toContainElement(
            within(getByTestId("transactions-list")).queryByText(transaction.description.value)
          )
        }
        else {
          expect(getByTestId("transactions-list")).not.toContainElement(
            within(getByTestId("transactions-list")).queryByText(transaction.description.value)
          )
        }
      });
    });
  });

  describe('Initial Balance', () => {
    it('cannot have a value less than zero entered by user.', () => {
      const newInitialBalance = faker.datatype.float({min: 1});
      
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
        changeInput(getByLabelText("Date"), transformTestDate(date.dateValue));
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
    it('displays number currencies in the correct format.', () => {
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
          getNodeText(
            // TODO: querying an element using dom properties like "parentElement" is generally bad practice, regarding 
            // the accessibility reasons and is also considered implementation test as well which is bad practice too.
            // A good alternative would be using RTL custom queries which is beyond the scope of this assessment.
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
    it("are sorted by date descending", () => {
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
