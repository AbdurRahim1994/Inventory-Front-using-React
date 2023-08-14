import { createSlice } from '@reduxjs/toolkit'

export const supplierSlice = createSlice({
    name: "supplier",
    initialState: {
        SupplierList: [],
        TotalSupplier: 0,
        SupplierFormValue: {
            name: "",
            email: "",
            phone: "",
            address: ""
        },
    },
    reducers: {
        SetSupplierList: (state, action) => {
            state.SupplierList = action.payload
        },

        SetTotalSupplier: (state, action) => {
            state.TotalSupplier = action.payload
        },

        SetSupplierFormValue: (state, action) => {
            state.SupplierFormValue[`${action.payload.Name}`] = action.payload.Value;
        },

        ResetSupplierFormValue: (state) => {
            Object.keys(state.SupplierFormValue).forEach((i) => state.SupplierFormValue[i] = "")
        }
    }
})

export const { SetSupplierList, SetTotalSupplier, SetSupplierFormValue, ResetSupplierFormValue } = supplierSlice.actions
export default supplierSlice.reducer