import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: "product",
    initialState: {
        ProductList: [],
        TotalProduct: 0,
        BrandDropDown: [],
        CategoryDropDown: [],
        ProductFormValue: {
            name: "",
            categoryId: "",
            brandId: "",
            unit: "",
            details: ""
        }
    },
    reducers: {
        SetProductList: (state, action) => {
            state.ProductList = action.payload
        },

        SetTotalProduct: (state, action) => {
            state.TotalProduct = action.payload
        },

        SetBrandDropDown: (state, action) => {
            state.BrandDropDown = action.payload
        },

        SetCategoryDropDown: (state, action) => {
            state.CategoryDropDown = action.payload
        },

        SetProductFormValue: (state, action) => {
            state.ProductFormValue[`${action.payload.Name}`] = action.payload.Value;
        },

        ResetProductFormValue: (state) => {
            Object.keys(state.ProductFormValue).forEach((i) => state.ProductFormValue[i] = "")
        }
    }
})

export const { SetProductList, SetTotalProduct, SetBrandDropDown, SetCategoryDropDown, SetProductFormValue, ResetProductFormValue } = productSlice.actions;
export default productSlice.reducer;