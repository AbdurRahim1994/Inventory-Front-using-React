import axios from 'axios';
import { BaseURL } from '../helpers/Config'
import { SuccessToast, ErrorToast } from '../helpers/FormHelper'
import { GetToken } from '../helpers/SessionHelper'
import store from '../redux/store/store'
import { SetSupplierList, SetTotalSupplier, SetSupplierFormValue, ResetSupplierFormValue } from '../redux/state-slice/supplier-slice';
import { hideLoader, showLoader } from '../redux/state-slice/setting-slice';

const token = GetToken();
axios.defaults.headers.common['token'] = token;

export const SupplierListRequest = async (pageNo, perPage, search) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/SupplierList/' + pageNo + '/' + perPage + '/' + search)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                if (res?.data?.data[0]['Row'].length > 0) {
                    store.dispatch(SetSupplierList(res?.data?.data[0]['Row']))
                    store.dispatch(SetTotalSupplier(res?.data?.data[0]['Total'][0]['total']))
                    return true
                }
                else {
                    store.dispatch(SetSupplierList([]))
                    store.dispatch(SetTotalSupplier(0))
                    ErrorToast("No data found")
                    return false
                }
            }
            else {
                store.dispatch(SetSupplierList([]))
                store.dispatch(SetTotalSupplier(0))
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

export const DeleteSupplierRequest = async (supplierId) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(BaseURL + '/DeleteSupplier/' + supplierId)
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
                ErrorToast("Request failed ! Please try again")
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

export const SupplierCreateRequest = async (postBody, supplierId) => {
    try {
        let URL;
        if (!supplierId) {
            URL = BaseURL + '/CreateSupplier'
        }
        else {
            URL = BaseURL + '/UpdateSupplier/' + supplierId
        }

        store.dispatch(showLoader())
        const res = await axios.post(URL, postBody)
        debugger
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("Request Successful")
                store.dispatch(ResetSupplierFormValue())
                return true
            }
            else if (res?.data?.status === 'fail') {
                if (res?.data?.data?.keyPattern?.phone === 1) {
                    ErrorToast("Mobile number already exists")
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

export const SupplierDetailRequest = async (supplierId) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/SupplierDetailById/' + supplierId)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetSupplierFormValue({ Name: "name", Value: res?.data?.data[0]['name'] }))
                store.dispatch(SetSupplierFormValue({ Name: "email", Value: res?.data?.data[0]['email'] }))
                store.dispatch(SetSupplierFormValue({ Name: "phone", Value: res?.data?.data[0]['phone'] }))
                store.dispatch(SetSupplierFormValue({ Name: "address", Value: res?.data?.data[0]['address'] }))
                return true
            }
            else {
                ErrorToast("No data found");
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