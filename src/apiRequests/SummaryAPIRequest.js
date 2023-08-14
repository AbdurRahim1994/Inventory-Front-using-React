import axios from 'axios';
import { BaseURL } from '../../src/helpers/Config'
import { ErrorToast } from '../../src/helpers/FormHelper'
import { GetToken } from '../../src/helpers/SessionHelper'
import store from '../redux/store/store';
import { SetExpenseChart, SetExpenseTotal, SetPurchaseChart, SetPurchaseTotal, SetReturnChart, SetReturnTotal, SetSalesChart, SetSalesTotal } from '../redux/state-slice/dashboard-slice';
import { hideLoader, showLoader } from '../redux/state-slice/setting-slice';

const token = GetToken();
axios.defaults.headers.common['token'] = token

export const ExpenseSummaryRequest = async () => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/ExpenseSummary')
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetExpenseChart(res?.data?.data[0]['Last30Days']))
                store.dispatch(SetExpenseTotal(res?.data?.data[0]['TotalAmount'][0]['total']))
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

export const PurchaseSummaryRequest = async () => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/PurchaseSummary')
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetPurchaseChart(res?.data?.data[0]['Last30Days']))
                store.dispatch(SetPurchaseTotal(res?.data?.data[0]['TotalAmount'][0]['total']))
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

export const SalesSummaryRequest = async () => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/SalesSummary')
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetSalesChart(res?.data?.data[0]['Last30Days']))
                store.dispatch(SetSalesTotal(res?.data?.data[0]['TotalAmount'][0]['total']))
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

export const ReturnSummaryRequest = async () => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/ReturnSummary')
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetReturnChart(res?.data?.data[0]['Last30Days']))
                store.dispatch(SetReturnTotal(res?.data?.data[0]['TotalAmount'][0]['total']))
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