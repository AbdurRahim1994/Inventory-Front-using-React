import { createSlice } from '@reduxjs/toolkit'

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        CategoryList: [],
        TotalCategory: 0,
        CategoryFormValue: {
            name: ""
        }
    },
    reducers: {
        SetCategoryList: (state, action) => {
            state.CategoryList = action.payload;
        },
        SetTotalCatetory: (state, action) => {
            state.TotalCategory = action.payload
        },
        SetCategoryFormValue: (state, action) => {
            state.CategoryFormValue[`${action.payload.Name}`] = action.payload.Value;
        },
        ResetCategoryFormValue: (state) => {
            Object.keys(state.CategoryFormValue).forEach((i) => state.CategoryFormValue[i] = "")
        }
    }
})

export const { SetCategoryList, SetTotalCatetory, SetCategoryFormValue, ResetCategoryFormValue } = categorySlice.actions;
export default categorySlice.reducer;