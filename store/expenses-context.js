import {createContext, useReducer} from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of book',
    amount: 49,
    date: new Date('2024-12-19'),
  },
  {
    id: 'e3',
    description: 'A pair of shoes',
    amount: 69,
    date: new Date('2023-12-19'),
  },
  {
    id: 'e4',
    description: 'A pair of book',
    amount: 79,
    date: new Date('2023-2-20'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpenses: ({description, amount, date}) => {},
  deleteExpenses: ({id}) => {},
  updateExpenses: (id, {description, amount, date}) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString();
      +Math.random().toString();
      return [{...action.payload, id: id}, ...state];
    case 'UPDATE':
      const updateExpenses = state.findIndex(
        expenses => expenses.id === action.payload.id,
      );
      const updatebleExpenses = state[updateExpenses];
      const updatebleItem = {...updatebleExpenses, ...action.payload.data};
      const updatedExpenses = {...state};
      updatedExpenses[updateExpenses] = updatebleItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({children}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpenses({expensesData}) {
    dispatch({type: 'ADD', payload: expensesData});
  }

  function deleteExpenses({id}) {
    dispatch({type: 'DELETE', payload: id});
  }

  function updateExpenses({id, expensesData}) {
    dispatch({type: 'UPDATE', payload: {id: id, data: expensesData}});
  }

  const values = {
    expenses: expensesState,
    addExpenses: addExpenses,
    deleteExpenses: deleteExpenses,
    updateExpenses: updateExpenses,
  };
  return (
    <ExpensesContext.Provider value={values}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
