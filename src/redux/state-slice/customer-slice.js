import { createSlice } from '@reduxjs/toolkit'

export const customerSlice = createSlice({
    name: "customer",
    initialState: {
        CustomerList: [],
        TotalCustomer: 0,
        FormValue: {
            name: "",
            phone: "",
            email: "",
            address: ""
        }
    },
    reducers: {
        SetCustomerList: (state, action) => {
            state.CustomerList = action.payload
        },

        SetTotalCustomer: (state, action) => {
            state.TotalCustomer = action.payload
        },

        SetFormValue: (state, action) => {
            state.FormValue[`${action.payload.Name}`] = action.payload.Value;
        },

        RemoveFormValue: (state) => {
            Object.keys(state.FormValue).forEach((i) => state.FormValue[i] = "")
        }
    }
})

export const { SetCustomerList, SetTotalCustomer, SetFormValue, RemoveFormValue } = customerSlice.actions
export default customerSlice.reducer;