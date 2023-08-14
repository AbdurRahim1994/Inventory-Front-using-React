import { BaseURL } from '../helpers/Config'
import axios from 'axios'
import { GetToken } from '../helpers/SessionHelper'
import { SuccessToast, ErrorToast } from '../helpers/FormHelper'
import store from '../redux/store/store';
import { ResetExpenseTypeFormValue, SetExpenseTypeFormValue, SetExpenseTypeList, SetTotalExpenseType } from '../redux/state-slice/expenseType-slice';
import { hideLoader, showLoader } from '../redux/state-slice/setting-slice';

const token = GetToken();
axios.defaults.headers.common['token'] = token;

export const ExpenseTypeListRequest = async (pageNo, perPage, search) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/ExpenseTypeList/' + pageNo + '/' + perPage + '/' + search);
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                if (res?.data?.data[0]['Row'].length > 0) {
                    store.dispatch(SetExpenseTypeList(res?.data?.data[0]['Row']))
                    store.dispatch(SetTotalExpenseType(res?.data?.data[0]['Total'][0]['total']))
                    return true;
                }
                else {
                    store.dispatch(SetExpenseTypeList([]))
                    store.dispatch(SetTotalExpenseType(0))
                    ErrorToast("No data found");
                    return false;
                }
            }
            else {
                store.dispatch(SetExpenseTypeList([]))
                store.dispatch(SetTotalExpenseType(0))
                ErrorToast("No data found");
                return false;
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

export const DeleteExpenseTypeRequest = async (expenseTypeId) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(BaseURL + '/DeleteExpenseType/' + expenseTypeId)
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

export const ExpenseTypeDetailRequest = async (expenseTypeId) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/ExpenseTypeDetailById/' + expenseTypeId)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetExpenseTypeFormValue({ Name: "name", Value: res?.data?.data[0]['name'] }))
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

export const ExpenseTypeCreateRequest = async (postBody, expenseTypeId) => {
    try {
        let URL;
        if (!expenseTypeId) {
            URL = BaseURL + '/CreateExpenseType'
        }
        else {
            URL = BaseURL + '/UpdateExpenseType/' + expenseTypeId
        }

        store.dispatch(showLoader())
        const res = await axios.post(URL, postBody)
        debugger
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("Request Successful")
                store.dispatch(ResetExpenseTypeFormValue())
                return true
            }
            else if (res?.data?.status === 'fail') {
                if (res?.data?.data?.keyPattern?.name === 1) {
                    ErrorToast("Expense type already exists")
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