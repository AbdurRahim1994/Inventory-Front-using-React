import axios from 'axios';
import { BaseURL } from '../../src/helpers/Config'
import { SuccessToast, ErrorToast } from '../../src/helpers/FormHelper'
import { GetToken } from '../../src/helpers/SessionHelper'
import store from '../redux/store/store'
import { SetProductDropDown, SetReturnList, SetCustomerDropDown, SetTotalReturn, ResetReturnItemList } from '../redux/state-slice/return-slice';
import { hideLoader, showLoader } from '../redux/state-slice/setting-slice';

const token = GetToken();
axios.defaults.headers.common['token'] = token;

export const ReturnListRequest = async (pageNo, perPage, search) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/ReturnList/' + pageNo + '/' + perPage + '/' + search)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                if (res?.data?.data[0]['Row'].length > 0) {
                    store.dispatch(SetReturnList(res?.data?.data[0]['Row']))
                    store.dispatch(SetTotalReturn(res?.data?.data[0]['Total'][0]['total']))
                    return true
                }
                else {
                    store.dispatch(SetReturnList([]))
                    store.dispatch(SetTotalReturn(0))
                    ErrorToast("No data found")
                    return false
                }
            }
            else {
                store.dispatch(SetReturnList([]))
                store.dispatch(SetTotalReturn(0))
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

export const CustomerDropDownRequest = async () => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/CustomerDropDown')
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                if ((res?.data?.data).length > 0) {
                    store.dispatch(SetCustomerDropDown(res?.data?.data))
                    return true
                }
                else {
                    store.dispatch(SetCustomerDropDown([]))
                    ErrorToast("No data found")
                    return false
                }
            }
            else {
                store.dispatch(SetCustomerDropDown([]))
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

export const ProductDropDownRequest = async () => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/ProductDropDown')
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                if ((res?.data?.data).length > 0) {
                    store.dispatch(SetProductDropDown(res?.data?.data))
                    return true
                }
                else {
                    store.dispatch(SetProductDropDown([]))
                    ErrorToast("No data found")
                    return false
                }
            }
            else {
                store.dispatch(SetProductDropDown([]))
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

export const ReturnCreateRequest = async (parent, child) => {
    try {
        const postBody = {
            parent: parent,
            child: child
        }

        store.dispatch(showLoader())
        const res = await axios.post(BaseURL + '/CreateReturn', postBody)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("Request Successful")
                store.dispatch(ResetReturnItemList())
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