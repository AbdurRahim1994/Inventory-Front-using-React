import { BaseURL } from '../../src/helpers/Config'
import axios from 'axios'
import { GetToken } from '../helpers/SessionHelper'
import { SuccessToast, ErrorToast } from '../helpers/FormHelper'
import store from '../redux/store/store'
import { ResetExpenseFormValue, SetExpenseFormValue, SetExpenseList, SetExpenseTypeDropDown, SetTotalExpense } from '../redux/state-slice/expense-slice'
import { hideLoader, showLoader } from '../redux/state-slice/setting-slice'

const token = GetToken();
axios.defaults.headers.common['token'] = token;

export const ExpenseListRequest = async (pageNo, perPage, search) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/ExpenseList/' + pageNo + '/' + perPage + '/' + search)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                if (res?.data?.data[0]['Row'].length > 0) {
                    store.dispatch(SetExpenseList(res?.data?.data[0]['Row']))
                    store.dispatch(SetTotalExpense(res?.data?.data[0]['Total'][0]['total']))
                    return true
                }
                else {
                    store.dispatch(SetExpenseList([]))
                    store.dispatch(SetTotalExpense(0))
                    ErrorToast("No data found");
                    return false
                }
            }
            else {
                store.dispatch(SetExpenseList([]))
                store.dispatch(SetTotalExpense(0))
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

export const DeleteExpenseRequest = async (expenseId) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(BaseURL + '/DeleteExpense/' + expenseId);
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
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

export const ExpenseTypeDropDownRequest = async () => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/ExpenseTypeDropDown')
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                if (res?.data?.data.length > 0) {
                    store.dispatch(SetExpenseTypeDropDown(res?.data?.data))
                    return true
                }
                else {
                    store.dispatch(SetExpenseTypeDropDown([]))
                    ErrorToast("No Expense Type Found")
                    return false
                }
            }
            else {
                store.dispatch(SetExpenseTypeDropDown([]));
                ErrorToast("No Expense Type Found")
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

export const ExpenseDetailRequest = async (expenseId) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/ExpenseDetailById/' + expenseId)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetExpenseFormValue({ Name: "typeId", Value: res?.data?.data[0]['typeId'] }))
                store.dispatch(SetExpenseFormValue({ Name: "amount", Value: res?.data?.data[0]['amount'] }))
                store.dispatch(SetExpenseFormValue({ Name: "note", Value: res?.data?.data[0]['note'] }))
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
        return false;
    }
}

export const ExpenseCreateRequest = async (postBody, expenseId) => {
    try {
        let URL;
        if (!expenseId) {
            URL = BaseURL + '/CreateExpense'
        }
        else {
            URL = BaseURL + '/UpdateExpense/' + expenseId
        }

        store.dispatch(showLoader())
        const res = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("Request Successful")
                store.dispatch(ResetExpenseFormValue())
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