import { createSlice } from '@reduxjs/toolkit'

export const purchaseSlice = createSlice({
    name: "purchase",
    initialState: {
        PurchaseList: [],
        TotalPurchase: 0,
        SupplierDropDown: [],
        ProductDropDown: [],
        PurchaseItemList: [],
        PurchaseFormValue: {
            supplierId: "",
            vatTax: "",
            discount: 0,
            otherCost: 0,
            shippingCost: 0,
            grandTotal: "",
            note: ""
        }
    },
    reducers: {
        SetPurchaseList: (state, action) => {
            state.PurchaseList = action.payload
        },

        SetTotalPurchase: (state, action) => {
            state.TotalPurchase = action.payload
        },

        SetSupplierDropDown: (state, action) => {
            state.SupplierDropDown = action.payload
        },

        SetProductDropDown: (state, action) => {
            state.ProductDropDown = action.payload
        },

        SetPurchaseItemList: (state, action) => {
            state.PurchaseItemList.push(action.payload)
        },

        ResetPurchaseItemList: (state) => {
            state.PurchaseItemList = []
        },

        RemovePurchaseItemList: (state, action) => {
            state.PurchaseItemList.splice(action.payload, 1)
        },

        SetPurchaseFormValue: (state, action) => {
            state.PurchaseFormValue[`${action.payload.Name}`] = action.payload.Value;
        }
    }
})

export const { SetPurchaseList, SetTotalPurchase, SetSupplierDropDown, SetProductDropDown, SetPurchaseItemList, ResetPurchaseItemList, RemovePurchaseItemList, SetPurchaseFormValue } = purchaseSlice.actions
export default purchaseSlice.reducer