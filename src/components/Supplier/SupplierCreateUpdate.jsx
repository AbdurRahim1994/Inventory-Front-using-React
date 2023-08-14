import React from 'react';
import { useEffect } from 'react';
import { SupplierCreateRequest, SupplierDetailRequest } from '../../apiRequests/SupplierAPIRequest';
import { useSelector } from 'react-redux';
import store from '../../redux/store/store';
import { SetSupplierFormValue } from '../../redux/state-slice/supplier-slice';
import { ErrorToast, IsEmail, IsEmpty, IsMobile } from '../../helpers/FormHelper';
import { useNavigate } from 'react-router-dom';

const SupplierCreateUpdate = () => {
    const param = new URLSearchParams(window.location.search);
    const supplierId = param.get("id")
    const navigate = useNavigate()

    useEffect(() => {
        if (supplierId) {
            SupplierDetailRequest(supplierId)
        }
    }, [])

    const SupplierFormValue = useSelector((state) => state?.supplier?.SupplierFormValue);

    const OnSupplierSave = async () => {
        if (IsEmpty(SupplierFormValue.name)) {
            ErrorToast("Name is required")
        }
        else if (IsEmpty(SupplierFormValue.phone)) {
            ErrorToast("Mobile number is required")
        }
        else if (IsEmpty(SupplierFormValue.address)) {
            ErrorToast("Address is required")
        }
        else if (IsMobile(SupplierFormValue.phone)) {
            ErrorToast("Invalid mobile number")
        }
        else if (IsEmail(SupplierFormValue.email)) {
            ErrorToast("Invalid email")
        }
        else {
            const res = await SupplierCreateRequest(SupplierFormValue, supplierId)
            if (res === true) {
                navigate('/SupplierListPage')
            }
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4 className='font-weight-bolder'>Save Supplier</h4>
                            <hr className='bg-light'></hr>

                            <div className='row'>
                                <div className='col-lg-4 form-group'>
                                    <label className='form-label'>Supplier Name</label>
                                    <input onChange={(e) => store.dispatch(SetSupplierFormValue({ Name: "name", Value: e.target.value }))} value={SupplierFormValue.name} type='text' placeholder='Enter supplier name' className='form-control form-control-sm'></input>
                                </div>

                                <div className='col-lg-4 form-group'>
                                    <label className='form-label'>Supplier Mobile</label>
                                    <input onChange={(e) => store.dispatch(SetSupplierFormValue({ Name: "phone", Value: e.target.value }))} value={SupplierFormValue.phone} type='number' placeholder='Enter mobile number' className='form-control form-control-sm'></input>
                                </div>

                                <div className='col-lg-4 form-group'>
                                    <label className='form-label'>Supplier Email</label>
                                    <input onChange={(e) => store.dispatch(SetSupplierFormValue({ Name: "email", Value: e.target.value }))} value={SupplierFormValue.email} type='email' placeholder='Enter supplier email' className='form-control form-control-sm'></input>
                                </div>

                                <div className='col-lg-12 form-group'>
                                    <label className='form-label'>Supplier Address</label>
                                    <textarea onChange={(e) => store.dispatch(SetSupplierFormValue({ Name: "address", Value: e.target.value }))} value={SupplierFormValue.address} type='text' placeholder='Enter supplier address' className='form-control form-control-sm' rows={5}></textarea>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-lg-4 mt-3'>
                                    <button onClick={OnSupplierSave} className='btn btn-success btn-sm w-100'>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierCreateUpdate;