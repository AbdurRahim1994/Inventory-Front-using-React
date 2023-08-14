import React, { useEffect, useState } from 'react';
import store from '../../redux/store/store';
import { SetFormValue } from '../../redux/state-slice/customer-slice';
import { useSelector } from 'react-redux';
import { CustomerCreateRequest, CustomerDetailRequest } from '../../apiRequests/CustomerAPIRequest';
import { ErrorToast, IsEmail, IsEmpty, IsMobile } from '../../helpers/FormHelper';
import { useNavigate } from 'react-router-dom';

const CustomerCreateUpdate = () => {
    const FormValue = useSelector((state) => state?.customer?.FormValue)
    const navigate = useNavigate()
    const params = new URLSearchParams(window.location.search)
    const customerId = params.get('id')

    useEffect(() => {
        if(customerId){
            CustomerDetailRequest(customerId)
        }
    }, [])

    const OnCustomerSave = async () => {
        if (IsEmpty(FormValue.name)) {
            ErrorToast("Customer name is required")
        }
        else if (IsEmpty(FormValue.phone)) {
            ErrorToast("Customer mobile number is required")
        }
        else if (IsEmpty(FormValue.address)) {
            ErrorToast("Customer address is required")
        }
        else if (IsEmail(FormValue.email)) {
            ErrorToast("Invalid email")
        }
        else if (IsMobile(FormValue.phone)) {
            ErrorToast("Invalid mobile number")
        }
        else {
            const res = await CustomerCreateRequest(FormValue, customerId)
            if (res === true) {
                navigate('/CustomerListPage')
            }
        }
    }
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4 className='font-weight-bolder'>Save Customer</h4>
                            <hr className='bg-light'></hr>
                            <div className='row'>
                                <div className='col-lg-4 p-2'>
                                    <label className='form-label'>Customer Name</label>
                                    <input onChange={(e) => { store.dispatch(SetFormValue({ Name: "name", Value: e.target.value })) }} value={FormValue.name} type='text' placeholder='Enter name' className='form-control form-control-sm'></input>
                                </div>

                                <div className='col-lg-4 p-2'>
                                    <label className='form-label'>Customer Email</label>
                                    <input onChange={(e) => { store.dispatch(SetFormValue({ Name: "email", Value: e.target.value })) }} value={FormValue.email} type='email' placeholder='Enter email' className='form-control form-control-sm'></input>
                                </div>

                                <div className='col-lg-4 p-2'>
                                    <label className='form-label'>Customer Phone</label>
                                    <input onChange={(e) => { store.dispatch(SetFormValue({ Name: "phone", Value: e.target.value })) }} value={FormValue.phone} type='number' placeholder='Enter mobile number' className='form-control form-control-sm'></input>
                                </div>

                                <div>
                                    <label className='form-label'>Customer Address</label>
                                    <textarea onChange={(e) => { store.dispatch(SetFormValue({ Name: "address", Value: e.target.value })) }} value={FormValue.address} rows={4} placeholder='Enter address' className='form-control form-control-sm'></textarea>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-lg-4'>
                                    <button onClick={OnCustomerSave} className='btn btn-success mt-3 w-100'>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerCreateUpdate;