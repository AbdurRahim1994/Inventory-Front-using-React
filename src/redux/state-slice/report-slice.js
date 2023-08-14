import { createSlice } from "@reduxjs/toolkit"

export const reportSlice = createSlice({
    name: "report",
    initialState: {
        SalesByDateList: [],
        ExpenseByDateList: [],
        PurchaseByDateList: [],
        ReturnByDateList: []
    },
    reducers: {
        SetSalesByDateList: (state, action) => {
            state.SalesByDateList = action.payload
        },
        SetExpenseByDateList: (state, action) => {
            state.ExpenseByDateList = action.payload
        },
        SetPurchaseByDateList: (state, action) => {
            state.PurchaseByDateList = action.payload
        },
        SetReturnByDateList: (state, action) => {
            state.ReturnByDateList = action.payload
        }
    }
})

export const { SetSalesByDateList, SetExpenseByDateList, SetPurchaseByDateList, SetReturnByDateList } = reportSlice.actions
export default reportSlice.reducer;