import axios from 'axios';
import { BaseURL } from '../../src/helpers/Config'
import { SuccessToast, ErrorToast } from '../../src/helpers/FormHelper'
import { GetToken } from '../../src/helpers/SessionHelper'
import store from '../redux/store/store'
import { SetProductDropDown, SetSalesList, SetCustomerDropDown, SetTotalSales, ResetSalesItemList } from '../redux/state-slice/sales-slice';
import { hideLoader, showLoader } from '../redux/state-slice/setting-slice';

const token = GetToken();
axios.defaults.headers.common['token'] = token;

export const SalesListRequest = async (pageNo, perPage, search) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/SalesList/' + pageNo + '/' + perPage + '/' + search)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                if (res?.data?.data[0]['Row'].length > 0) {
                    store.dispatch(SetSalesList(res?.data?.data[0]['Row']))
                    store.dispatch(SetTotalSales(res?.data?.data[0]['Total'][0]['total']))
                    return true
                }
                else {
                    store.dispatch(SetSalesList([]))
                    store.dispatch(SetTotalSales(0))
                    ErrorToast("No data found")
                    return false
                }
            }
            else {
                store.dispatch(SetSalesList([]))
                store.dispatch(SetTotalSales(0))
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

export const SalesCreateRequest = async (parent, child) => {
    try {
        const postBody = {
            parent: parent,
            child: child
        }

        store.dispatch(showLoader())
        const res = await axios.post(BaseURL + '/CreateSales', postBody)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("Request Successful")
                store.dispatch(ResetSalesItemList())
                return true
            }
            else {
                ErrorToast("Request failed ! please try again")
                return false
            }
        }
        else {
            ErrorToast("Somethig went wrong")
            return false
        }
    }
    catch (error) {
        ErrorToast("Somethig went wrong")
        store.dispatch(hideLoader())
        return false
    }
}