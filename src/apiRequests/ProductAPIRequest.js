import axios from 'axios';
import { BaseURL } from '../../src/helpers/Config'
import { SuccessToast, ErrorToast } from '../helpers/FormHelper'
import { GetToken } from '../helpers/SessionHelper'
import { ResetProductFormValue, SetBrandDropDown, SetCategoryDropDown, SetProductFormValue, SetProductList, SetTotalProduct } from '../redux/state-slice/product-slice'
import store from '../redux/store/store';
import { hideLoader, showLoader } from '../redux/state-slice/setting-slice';

const token = GetToken();
axios.defaults.headers.common['token'] = token;

export const ProductListRequest = async (pageNo, perPage, search) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/ProductList/' + pageNo + '/' + perPage + '/' + search)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                if (res?.data?.data[0]['Row'].length > 0) {
                    store.dispatch(SetProductList(res?.data?.data[0]['Row']))
                    store.dispatch(SetTotalProduct(res?.data?.data[0]['Total'][0]['total']))
                    return true
                }
                else {
                    store.dispatch(SetProductList([]))
                    store.dispatch(SetTotalProduct(0))
                    ErrorToast("No data found")
                    return false
                }
            }
            else {
                store.dispatch(SetProductList([]))
                store.dispatch(SetTotalProduct(0))
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
        ErrorToast("Something went wrong");
        store.dispatch(hideLoader())
        return false;
    }
}

export const ProductDeleteRequest = async (productId) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(BaseURL + '/DeleteProduct/' + productId)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("Request Successful")
                return true
            }
            else if (res?.data?.status === 'associate') {
                ErrorToast(res?.data?.data);
                return false
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

export const BrandDropDownRequest = async () => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/BrandDropDown')
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                if (res?.data?.data.length > 0) {
                    store.dispatch(SetBrandDropDown(res?.data?.data))
                    return true
                }
                else {
                    store.dispatch(SetBrandDropDown([]))
                    ErrorToast("No Brand Found")
                    return false
                }
            }
            else {
                store.dispatch(SetBrandDropDown([]))
                ErrorToast("No Brand Found")
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
export const CategoryDropDownRequest = async () => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/CategoryDropDown')
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                if (res?.data?.data.length > 0) {
                    store.dispatch(SetCategoryDropDown(res?.data?.data))
                    return true
                }
                else {
                    store.dispatch(SetCategoryDropDown([]))
                    ErrorToast("No Category Found")
                    return false
                }
            }
            else {
                store.dispatch(SetCategoryDropDown([]))
                ErrorToast("No Category Found")
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

export const ProductDetailRequest = async (productId) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/ProductDetailById/' + productId)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetProductFormValue({ Name: "name", Value: res?.data?.data[0]['name'] }))
                store.dispatch(SetProductFormValue({ Name: "categoryId", Value: res?.data?.data[0]['categoryId'] }))
                store.dispatch(SetProductFormValue({ Name: "brandId", Value: res?.data?.data[0]['brandId'] }))
                store.dispatch(SetProductFormValue({ Name: "unit", Value: res?.data?.data[0]['unit'] }))
                store.dispatch(SetProductFormValue({ Name: "details", Value: res?.data?.data[0]['details'] }))
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

export const ProductCreateRequest = async (postBody, productId) => {
    try {
        let URL;
        if (!productId) {
            URL = BaseURL + '/CreateProduct'
        }
        else {
            URL = BaseURL + '/UpdateProduct/' + productId
        }

        store.dispatch(showLoader())
        const res = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("Request Successful")
                store.dispatch(ResetProductFormValue())
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
