import { BaseURL } from '../helpers/Config'
import axios from 'axios'
import { GetToken } from '../helpers/SessionHelper'
import { SuccessToast, ErrorToast } from '../helpers/FormHelper'
import store from '../redux/store/store';
import { ResetCategoryFormValue, SetCategoryFormValue, SetCategoryList, SetTotalCatetory } from '../redux/state-slice/category-slice';
import { hideLoader, showLoader } from '../redux/state-slice/setting-slice';

const token = GetToken();
axios.defaults.headers.common['token'] = token;

export const CategoryListRequest = async (pageNo, perPage, search) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/CategoryList/' + pageNo + '/' + perPage + '/' + search)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                if (res?.data?.data[0]['Row'].length > 0) {
                    store.dispatch(SetCategoryList(res?.data?.data[0]['Row']))
                    store.dispatch(SetTotalCatetory(res?.data?.data[0]['Total'][0]['total']))
                    return true
                }
                else {
                    store.dispatch(SetCategoryList([]))
                    store.dispatch(SetTotalCatetory(0))
                    ErrorToast("No data found")
                    return false
                }
            }
            else {
                store.dispatch(SetCategoryList([]))
                store.dispatch(SetTotalCatetory(0))
                ErrorToast("No data found")
                return false
            }
        }
        else {
            ErrorToast("Something went wrong")
            return false
        }
    }
    catch (error) {
        ErrorToast("Something went wrong")
        store.dispatch(hideLoader())
        return false
    }
}

export const DeleteCategoryRequest = async (categoryId) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(BaseURL + '/DeleteCategory/' + categoryId);
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'associate') {
                ErrorToast(res?.data?.data)
                return false
            }
            else if (res?.data?.status === 'success') {
                SuccessToast("Request Successful")
                return true
            }
            else {
                ErrorToast("Request failed ! please try again")
                return false
            }
        }
        else {
            ErrorToast("Something went wrong")
            return false
        }
    }
    catch (error) {
        ErrorToast("Something went wrong")
        store.dispatch(hideLoader())
        return false
    }
}

export const CategoryDetailRequest = async (categoryId) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/CategoryDetailById/' + categoryId)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetCategoryFormValue({ Name: "name", Value: res?.data?.data[0]['name'] }))
                return true
            }
            else {
                ErrorToast("No data found")
                return false
            }
        }
        else {
            ErrorToast("Something went wrong")
            return false
        }
    }
    catch (error) {
        ErrorToast("Something went wrong")
        store.dispatch(hideLoader())
        return false
    }
}

export const CategoryCreateRequest = async (postBody, categoryId) => {
    try {
        let URL;
        if (!categoryId) {
            URL = BaseURL + '/CreateCategory'
        }
        else {
            URL = BaseURL + '/UpdateCategory/' + categoryId
        }

        store.dispatch(showLoader())
        const res = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("Request Successful")
                store.dispatch(ResetCategoryFormValue())
                return true
            }
            else if (res?.data?.status === 'fail') {
                if (res?.data?.data?.keyPattern?.name === 1) {
                    ErrorToast("Category name already exists")
                    return false
                }
            }
            else {
                ErrorToast("Request failed ! please try again")
                return false
            }
        }
        else {
            ErrorToast("Something went wrong")
            return false
        }
    }
    catch (error) {
        ErrorToast("Something went wrong")
        store.dispatch(hideLoader())
        return false
    }
}