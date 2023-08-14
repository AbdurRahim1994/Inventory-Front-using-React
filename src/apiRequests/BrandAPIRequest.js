import { BaseURL } from '../../src/helpers/Config'
import axios from 'axios'
import { GetToken } from '../helpers/SessionHelper'
import { ErrorToast, SuccessToast } from '../helpers/FormHelper'
import store from '../redux/store/store'
import { ResetBrandFormValue, SetBrandFormValue, SetBrandList, SetTotalBrand } from '../redux/state-slice/brand-slice'
import { hideLoader, showLoader } from '../redux/state-slice/setting-slice'

const token = GetToken();
axios.defaults.headers.common['token'] = token;

export const BrandListRequest = async (pageNo, perPage, search) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/BrandList/' + pageNo + '/' + perPage + '/' + search)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                if (res?.data?.data[0]['Row'].length > 0) {
                    store.dispatch(SetBrandList(res?.data?.data[0]['Row']))
                    store.dispatch(SetTotalBrand(res?.data?.data[0]['Total'][0]['total']))
                    return true;
                }
                else {
                    store.dispatch(SetBrandList([]));
                    store.dispatch(SetTotalBrand(0));
                    ErrorToast("No data found");
                    return false
                }
            }
            else {
                store.dispatch(SetBrandList([]));
                store.dispatch(SetTotalBrand(0));
                ErrorToast("No data found");
                return false
            }
        }
        else {
            ErrorToast("Something went wrong");
            store.dispatch(hideLoader())
            return false
        }
    }
    catch (error) {
        ErrorToast("Something went wrong")
        return false;
    }
}

export const DeleteBrandRequest = async (brandId) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(BaseURL + '/DeleteBrand/' + brandId)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("Request Successful")
                return true
            }
            else if (res?.data?.status === 'associate') {
                ErrorToast(res?.data?.data)
                return false
            }
            else {
                ErrorToast("Request failed ! try again")
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

export const BrandDetailRequest = async (brandId) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/BrandDetailById/' + brandId)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetBrandFormValue({ Name: "name", Value: res?.data?.data[0]['name'] }))
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

export const BrandCreateRequest = async (postBody, brandId) => {
    try {
        let URL;
        if (!brandId) {
            URL = BaseURL + '/CreateBrand'
        }
        else {
            URL = BaseURL + '/UpdateBrand/' + brandId
        }

        store.dispatch(showLoader())
        const res = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("Request Successful")
                store.dispatch(ResetBrandFormValue())
                return true
            }
            else if (res?.data?.status === 'fail') {
                if (res?.data?.data?.keyPattern?.name === 1) {
                    ErrorToast("Brand name already exists")
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