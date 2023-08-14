import { createSlice } from '@reduxjs/toolkit'

export const returnSlice = createSlice({
    name: "return",
    initialState: {
        ReturnList: [],
        TotalReturn: 0,
        CustomerDropDown: [],
        ProductDropDown: [],
        ReturnItemList: [],
        ReturnFormValue: {
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
        SetReturnList: (state, action) => {
            state.ReturnList = action.payload
        },

        SetTotalReturn: (state, action) => {
            state.TotalReturn = action.payload
        },

        SetCustomerDropDown: (state, action) => {
            state.CustomerDropDown = action.payload
        },

        SetProductDropDown: (state, action) => {
            state.ProductDropDown = action.payload
        },

        SetReturnItemList: (state, action) => {
            state.ReturnItemList.push(action.payload)
        },

        RemoveReturnItemList: (state, action) => {
            state.ReturnItemList.splice(action.payload, 1)
        },

        ResetReturnItemList: (state) => {
            state.ReturnItemList = []
        },

        SetReturnFormValue: (state, action) => {
            state.ReturnFormValue[`${action.payload.Name}`] = action.payload.Value;
        }
    }
})

export const { SetReturnList, SetTotalReturn, SetCustomerDropDown, SetProductDropDown, SetReturnItemList, RemoveReturnItemList, ResetReturnItemList, SetReturnFormValue } = returnSlice.actions
export default returnSlice.reducer