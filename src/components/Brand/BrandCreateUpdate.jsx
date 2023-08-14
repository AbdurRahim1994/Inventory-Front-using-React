import React from 'react';
import { useEffect } from 'react';
import { BrandCreateRequest, BrandDetailRequest } from '../../apiRequests/BrandAPIRequest';
import { useSelector } from 'react-redux';
import store from '../../redux/store/store';
import { SetBrandFormValue } from '../../redux/state-slice/brand-slice';
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper';
import { useNavigate } from 'react-router-dom';

const BrandCreateUpdate = () => {
    const param = new URLSearchParams(window.location.search)
    const brandId = param.get("id")
    const navigate = useNavigate()

    useEffect(() => {
        if (brandId) {
            BrandDetailRequest(brandId)
        }
    }, [])

    const BrandFormValue = useSelector((state) => state?.brand?.BrandFormValue);

    const OnBrandSave = async () => {
        if (IsEmpty(BrandFormValue.name)) {
            ErrorToast("Brand name is required")
        }
        else {
            const res = await BrandCreateRequest(BrandFormValue, brandId)
            if (res === true) {
                navigate("/BrandListPage")
            }
        }
    }
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4 className='font-weight-bolder'>Save Brand</h4>
                            <hr className='bg-light'></hr>
                            <div className='col-lg-4 form-group'>
                                <label className='form-label'>Brand Name</label>
                                <input onChange={(e) => store.dispatch(SetBrandFormValue({ Name: "name", Value: e.target.value }))} value={BrandFormValue.name} type='text' className='form-control form-control-sm'></input>
                            </div>
                            <div className='col-lg-4'>
                                <button onClick={OnBrandSave} className='btn btn-sm btn-success w-100'>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandCreateUpdate;