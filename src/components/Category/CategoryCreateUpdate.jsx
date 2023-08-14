import React, { useEffect } from 'react';
import { CategoryCreateRequest, CategoryDetailRequest } from '../../apiRequests/CategoryRequest';
import { useSelector } from 'react-redux';
import store from '../../redux/store/store';
import { SetCategoryFormValue } from '../../redux/state-slice/category-slice';
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper';
import { useNavigate } from 'react-router-dom';

const CategoryCreateUpdate = () => {
    const param = new URLSearchParams(window.location.search)
    const categoryId = param.get("id")
    const navigate = useNavigate()

    useEffect(() => {
        if (categoryId) {
            CategoryDetailRequest(categoryId)
        }
    }, [])

    const CategoryFormValue = useSelector((state) => state?.category?.CategoryFormValue)

    const OnCategorySave = async () => {
        if (IsEmpty(CategoryFormValue.name)) {
            ErrorToast("Category name is required")
        }
        else {
            const res = await CategoryCreateRequest(CategoryFormValue, categoryId)
            if (res === true) {
                navigate("/CategoryListPage")
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
                                <h4 className='font-weight-bolder'>Save Category</h4>
                                <hr className='bg-light'></hr>
                                <div className='col-lg-4'>
                                    <label className='form-label'>Category Name</label>
                                    <input onChange={(e) => store.dispatch(SetCategoryFormValue({ Name: "name", Value: e.target.value }))} value={CategoryFormValue.name} type='text' className='form-control form-control-sm' placeholder='Enter Category Name'></input>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-lg-4'>
                                    <button onClick={OnCategorySave} className='btn btn-sm btn-success w-100 my-3'>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCreateUpdate;