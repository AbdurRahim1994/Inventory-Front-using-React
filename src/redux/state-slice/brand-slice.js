import { createSlice } from '@reduxjs/toolkit'

export const brandSlice = createSlice({
    name: "brand",
    initialState: {
        BrandList: [],
        TotalBrand: 0,
        BrandFormValue: {
            name: ""
        }
    },
    reducers: {
        SetBrandList: (state, action) => {
            state.BrandList = action.payload;
        },
        SetTotalBrand: (state, action) => {
            state.TotalBrand = action.payload;
        },
        SetBrandFormValue: (state, action) => {
            state.BrandFormValue[`${action.payload.Name}`] = action.payload.Value;
        },
        ResetBrandFormValue: (state) => {
            Object.keys(state.BrandFormValue).forEach((i) => state.BrandFormValue[i] = "")
        }
    }
})

export const { SetBrandList, SetTotalBrand, SetBrandFormValue, ResetBrandFormValue } = brandSlice.actions;
export default brandSlice.reducer;