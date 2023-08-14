import { createSlice } from '@reduxjs/toolkit'

export const expenseTypeSlice = createSlice({
    name: "expenseType",
    initialState: {
        ExpenseTypeList: [],
        TotalExpenseType: 0,
        ExpenseTypeFormValue: {
            name: ""
        }
    },
    reducers: {
        SetExpenseTypeList: (state, action) => {
            state.ExpenseTypeList = action.payload
        },

        SetTotalExpenseType: (state, action) => {
            state.TotalExpenseType = action.payload
        },

        SetExpenseTypeFormValue: (state, action) => {
            state.ExpenseTypeFormValue[`${action.payload.Name}`] = action.payload.Value;
        },

        ResetExpenseTypeFormValue: (state) => {
            Object.keys(state.ExpenseTypeFormValue).forEach((i) => state.ExpenseTypeFormValue[i] = "")
        }
    }
})

export const { SetExpenseTypeList, SetTotalExpenseType, SetExpenseTypeFormValue, ResetExpenseTypeFormValue } = expenseTypeSlice.actions;
export default expenseTypeSlice.reducer;