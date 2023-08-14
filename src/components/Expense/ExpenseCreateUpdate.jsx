import React from 'react';
import { useEffect } from 'react';
import { ExpenseCreateRequest, ExpenseDetailRequest, ExpenseTypeDropDownRequest } from '../../apiRequests/ExpenseAPIRequest';
import { useSelector } from 'react-redux';
import store from '../../redux/store/store';
import { SetExpenseFormValue } from '../../redux/state-slice/expense-slice';
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper';
import { useNavigate } from 'react-router-dom';

const ExpenseCreateUpdate = () => {
    const param = new URLSearchParams(window.location.search)
    const expenseId = param.get("id")
    const navigate = useNavigate()

    useEffect(() => {
        ExpenseTypeDropDownRequest();

        if (expenseId) {
            ExpenseDetailRequest(expenseId)
        }
    }, [])

    const ExpenseTypeDropDown = useSelector((state) => state?.expense?.ExpenseTypeDropDown)
    const ExpenseFormValue = useSelector((state) => state?.expense?.ExpenseFormValue);

    const OnExpenseSave = async () => {
        if (IsEmpty(ExpenseFormValue.typeId)) {
            ErrorToast("Expense type is required")
        }
        else if (IsEmpty(ExpenseFormValue.amount)) {
            ErrorToast("Amount is required")
        }
        else {
            const res = await ExpenseCreateRequest(ExpenseFormValue, expenseId)
            if (res === true) {
                navigate("/ExpenseListPage")
            }
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4 className='font-weight-bolder'>Save Expense</h4>
                            <hr className='bg-light'></hr>
                            <div className='row'>
                                <div className='col-lg-4 p-2'>
                                    <label className='form-label'>Expense Type</label>
                                    <select onChange={(e) => store.dispatch(SetExpenseFormValue({ Name: "typeId", Value: e.target.value }))} value={ExpenseFormValue.typeId} className='form-control form-control-sm form-select form-select-sm'>
                                        <option value="">Select Type</option>
                                        {
                                            ExpenseTypeDropDown.map((item, i) =>
                                                <option value={item?._id}>{item?.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className='col-lg-4 p-2'>
                                    <label className='form-label'>Expense Amount</label>
                                    <input onChange={(e) => store.dispatch(SetExpenseFormValue({ Name: "amount", Value: e.target.value }))} value={ExpenseFormValue.amount} type='number' placeholder='Enter expense amount' className='form-control form-control-sm'></input>
                                </div>
                                <div className='col-lg-4 p-2'>
                                    <label className='form-label'>Expense Note</label>
                                    <input onChange={(e) => store.dispatch(SetExpenseFormValue({ Name: "note", Value: e.target.value }))} value={ExpenseFormValue.note} type='text' placeholder='Enter expense note' className='form-control form-control-sm'></input>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-lg-4'>
                                    <button onClick={OnExpenseSave} className='btn btn-sm btn-success w-100 mt-3'>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseCreateUpdate;