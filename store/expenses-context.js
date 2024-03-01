import {createContext, useReducer} from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  addExpenses: ({description, amount, date}) => {},
  setExpenses: expenses => {},
  deleteExpenses: ({id}) => {},
  updateExpenses: (id, {description, amount, date}) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updateExpenses = state.findIndex(
        expenses => expenses.id === action.payload.id,
      );
      const updatebleExpenses = state[updateExpenses];
      const updatebleItem = {...updatebleExpenses, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[updateExpenses] = updatebleItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({children}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpenses(expensesData) {
    dispatch({type: 'ADD', payload: expensesData});
  }

  function setExpenses(expensesData) {
    dispatch({type: 'SET', payload: expensesData});
  }

  function deleteExpenses(id) {
    dispatch({type: 'DELETE', payload: id});
  }

  function updateExpenses(id, expensesData) {
    dispatch({type: 'UPDATE', payload: {id: id, data: expensesData}});
  }

  const values = {
    expenses: expensesState,
    addExpenses: addExpenses,
    setExpenses: setExpenses,
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
