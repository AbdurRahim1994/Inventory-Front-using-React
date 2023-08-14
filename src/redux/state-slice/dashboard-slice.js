import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        ExpenseChart: [],
        ExpenseTotal: 0,
        PurchaseChart: [],
        PurchaseTotal: 0,
        SalesChart: [],
        SalesTotal: 0,
        ReturnChart: [],
        ReturnTotal: 0
    },
    reducers: {
        SetExpenseChart: (state, action) => {
            state.ExpenseChart = action.payload
        },
        SetExpenseTotal: (state, action) => {
            state.ExpenseTotal = action.payload
        },
        SetPurchaseChart: (state, action) => {
            state.PurchaseChart = action.payload
        },
        SetPurchaseTotal: (state, action) => {
            state.PurchaseTotal = action.payload
        },
        SetSalesChart: (state, action) => {
            state.SalesChart = action.payload
        },
        SetSalesTotal: (state, action) => {
            state.SalesTotal = action.payload
        },
        SetReturnChart: (state, action) => {
            state.ReturnChart = action.payload
        },
        SetReturnTotal: (state, action) => {
            state.ReturnTotal = action.payload
        }
    }
})

export const { SetExpenseChart, SetExpenseTotal, SetPurchaseChart, SetPurchaseTotal, SetSalesChart, SetSalesTotal, SetReturnChart, SetReturnTotal } = dashboardSlice.actions
export default dashboardSlice.reducer