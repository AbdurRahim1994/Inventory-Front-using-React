import { BaseURL } from '../../src/helpers/Config'
import { GetToken } from '../../src/helpers/SessionHelper'
import axios from 'axios'
import { ErrorToast } from '../../src/helpers/FormHelper'
import store from '../redux/store/store'
import { SetExpenseByDateList, SetPurchaseByDateList, SetSalesByDateList, SetReturnByDateList } from '../../src/redux/state-slice/report-slice'
import { hideLoader, showLoader } from '../redux/state-slice/setting-slice'

const token = GetToken();
axios.defaults.headers.common['token'] = token;

export const ExpenseReportByDateRequest = async (fromDate, toDate) => {
    try {
        const postBody = {
            fromDate: fromDate + "T00:00:00.000+00:00",
            toDate: toDate + "T00:00:00.000+00:00"
        }

        store.dispatch(showLoader())
        const res = await axios.post(BaseURL + '/ExpenseByDate', postBody)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetExpenseByDateList(res?.data?.data))
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

export const SalesReportByDateRequest = async (fromDate, toDate) => {
    try {
        const postBody = {
            fromDate: fromDate + "T00:00:00.000+00:00",
            toDate: toDate + "T00:00:00.000+00:00"
        }

        const res = await axios.post(BaseURL + '/SalesByDate', postBody)
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetSalesByDateList(res?.data?.data))
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
        return false
    }
}
export const PurchaseReportByDateRequest = async (fromDate, toDate) => {
    try {
        const postBody = {
            fromDate: fromDate + "T00:00:00.000+00:00",
            toDate: toDate + "T00:00:00.000+00:00"
        }

        const res = await axios.post(BaseURL + '/PurchaseByDate', postBody)
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetPurchaseByDateList(res?.data?.data))
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
        return false
    }
}
export const ReturnReportByDateRequest = async (fromDate, toDate) => {
    try {
        const postBody = {
            fromDate: fromDate + "T00:00:00.000+00:00",
            toDate: toDate + "T00:00:00.000+00:00"
        }

        const res = await axios.post(BaseURL + '/ReturnByDate', postBody)
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetReturnByDateList(res?.data?.data))
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
        return false
    }
}

