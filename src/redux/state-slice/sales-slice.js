import { createSlice } from '@reduxjs/toolkit'

export const salesSlice = createSlice({
    name: "sales",
    initialState: {
        SalesList: [],
        TotalSales: 0,
        CustomerDropDown: [],
        ProductDropDown: [],
        SalesItemList: [],
        SalesFormValue: {
            customerId: "",
            vatTax: "",
            discount: 0,
            otherCost: 0,
            shippingCost: 0,
            grandTotal: "",
            note: ""
        }
    },
    reducers: {
        SetSalesList: (state, action) => {
            state.SalesList = action.payload
        },

        SetTotalSales: (state, action) => {
            state.TotalSales = action.payload
        },

        SetCustomerDropDown: (state, action) => {
            state.CustomerDropDown = action.payload
        },

        SetProductDropDown: (state, action) => {
            state.ProductDropDown = action.payload
        },

        SetSalesItemList: (state, action) => {
            state.SalesItemList.push(action.payload)
        },

        RemoveSalesItemList: (state, action) => {
            state.SalesItemList.splice(action.payload, 1)
        },

        SetSalesFormValue: (state, action) => {
            state.SalesFormValue[`${action.payload.Name}`] = action.payload.Value;
        },

        ResetSalesItemList: (state) => {
            state.SalesItemList = []
        }
    }
})

export const { SetSalesList, SetTotalSales, SetCustomerDropDown, SetProductDropDown, SetSalesItemList, RemoveSalesItemList, SetSalesFormValue, ResetSalesItemList } = salesSlice.actions
export default salesSlice.reducer