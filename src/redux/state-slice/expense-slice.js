import { createSlice } from '@reduxjs/toolkit'

export const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        ExpenseList: [],
        TotalExpense: 0,
        ExpenseTypeDropDown: [],
        ExpenseFormValue: {
            typeId: "",
            amount: 0,
            note: ""
        }
    },
    reducers: {
        SetExpenseList: (state, action) => {
            state.ExpenseList = action.payload
        },

        SetTotalExpense: (state, action) => {
            state.TotalExpense = action.payload
        },

        SetExpenseTypeDropDown: (state, action) => {
            state.ExpenseTypeDropDown = action.payload
        },

        SetExpenseFormValue: (state, action) => {
            state.ExpenseFormValue[`${action.payload.Name}`] = action.payload.Value;
        },

        ResetExpenseFormValue: (state) => {
            Object.keys(state.ExpenseFormValue).forEach((i) => state.ExpenseFormValue[i] = "")
        }
    }
})

export const { SetExpenseList, SetTotalExpense, SetExpenseTypeDropDown, SetExpenseFormValue, ResetExpenseFormValue } = expenseSlice.actions
export default expenseSlice.reducer;