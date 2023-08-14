import { BaseURL } from '../helpers/Config'
import axios from 'axios'
import { GetToken } from '../helpers/SessionHelper'
import { SuccessToast, ErrorToast } from '../helpers/FormHelper'
import store from '../redux/store/store'
import { RemoveFormValue, SetCustomerList, SetFormValue, SetTotalCustomer } from '../redux/state-slice/customer-slice'
import { hideLoader, showLoader } from '../redux/state-slice/setting-slice'

const token = GetToken();
axios.defaults.headers.common['token'] = token;

export const CustomerListRequest = async (pageNo, perPage, search) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/CustomerList/' + pageNo + '/' + perPage + '/' + search)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                if (res?.data?.data[0]['Row'].length > 0) {
                    store.dispatch(SetCustomerList(res?.data?.data[0]['Row']))
                    store.dispatch(SetTotalCustomer(res?.data?.data[0]['Total'][0]['total']))
                    return true
                }
                else {
                    store.dispatch(SetCustomerList([]))
                    store.dispatch(SetTotalCustomer(0))
                    ErrorToast("No data found");
                    return false
                }
            }
            else {
                store.dispatch(SetCustomerList([]))
                store.dispatch(SetTotalCustomer(0))
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

export const CustomerDeleteRequest = async (customerId) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(BaseURL + '/DeleteCustomer/' + customerId)
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
                ErrorToast("Request failed ! please try again");
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

export const CustomerCreateRequest = async (postBody, customerId) => {
    try {
        store.dispatch(showLoader())
        let url;
        if (!customerId) {
            url = BaseURL + '/CreateCustomer'
        }
        else {
            url = BaseURL + '/UpdateCustomer/' + customerId
        }
        const res = await axios.post(url, postBody)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("Request Successful")
                store.dispatch(RemoveFormValue())
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

export const CustomerDetailRequest = async (customerId) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/CustomerDetailById/' + customerId)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetFormValue({ Name: "name", Value: res?.data?.data[0]['name'] }))
                store.dispatch(SetFormValue({ Name: "email", Value: res?.data?.data[0]['email'] }))
                store.dispatch(SetFormValue({ Name: "phone", Value: res?.data?.data[0]['phone'] }))
                store.dispatch(SetFormValue({ Name: "address", Value: res?.data?.data[0]['address'] }))
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