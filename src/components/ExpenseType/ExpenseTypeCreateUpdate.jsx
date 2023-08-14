import React from 'react';
import { useEffect } from 'react';
import { ExpenseTypeCreateRequest, ExpenseTypeDetailRequest } from '../../apiRequests/ExpenseTypeAPIRequest';
import { useSelector } from 'react-redux';
import store from '../../redux/store/store';
import { SetExpenseTypeFormValue } from '../../redux/state-slice/expenseType-slice';
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper';
import { useNavigate } from 'react-router-dom';

const ExpenseTypeCreateUpdate = () => {
    const param = new URLSearchParams(window.location.search)
    const expenseTypeId = param.get("id")
    console.log(expenseTypeId)
    const navigate = useNavigate()

    useEffect(() => {
        if (expenseTypeId) {
            ExpenseTypeDetailRequest(expenseTypeId)
        }
    }, [])

    const ExpenseTypeFormValue = useSelector((state) => state?.expenseType?.ExpenseTypeFormValue)

    const OnExpenseTypeSave = async () => {
        if (IsEmpty(ExpenseTypeFormValue.name)) {
            ErrorToast("Expense type is required")
        }
        else {
            const res = await ExpenseTypeCreateRequest(ExpenseTypeFormValue, expenseTypeId)
            if (res === true) {
                navigate('/ExpenseTypeListPage')
            }
        }
    }
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <div className='row'>
                                <h4 className='font-weight-bolder'>Save Expense Type</h4>
                                <hr className='bg-light'></hr>
                                <div className='col-lg-4'>
                                    <label className='form-label'>Expense Type Name</label>
                                    <input onChange={(e) => store.dispatch(SetExpenseTypeFormValue({ Name: "name", Value: e.target.value }))} value={ExpenseTypeFormValue.name} type='text' placeholder='Enter expense type' className='form-control form-control-sm'></input>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-lg-4 p-2'>
                                    <button onClick={OnExpenseTypeSave} className='btn btn-sm btn-success w-100 mt-3'>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseTypeCreateUpdate;