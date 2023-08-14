import React from 'react';
import { useEffect } from 'react';
import { BrandDropDownRequest, CategoryDropDownRequest, ProductCreateRequest, ProductDetailRequest } from '../../apiRequests/ProductAPIRequest';
import { useSelector } from 'react-redux';
import store from '../../redux/store/store';
import { SetProductFormValue } from '../../redux/state-slice/product-slice';
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper';
import { useNavigate } from 'react-router-dom';

const ProductCreateUpdate = () => {
    const param = new URLSearchParams(window.location.search)
    const productId = param.get("id");
    const navigate = useNavigate()

    useEffect(() => {
        BrandDropDownRequest();
        CategoryDropDownRequest();
        if (productId) {
            ProductDetailRequest(productId)
        }
    }, [])

    const BrandDropDown = useSelector((state) => state?.product?.BrandDropDown)
    const CategoryDropDown = useSelector((state) => state?.product?.CategoryDropDown)
    const ProductFormValue = useSelector((state) => state?.product?.ProductFormValue)

    const OnProductSave = async () => {
        if (IsEmpty(ProductFormValue.name)) {
            ErrorToast("Product name is required")
        }
        else if (IsEmpty(ProductFormValue.categoryId)) {
            ErrorToast("Category is required")
        }
        else if (IsEmpty(ProductFormValue.brandId)) {
            ErrorToast("Brand is required")
        }
        else if (IsEmpty(ProductFormValue.unit)) {
            ErrorToast("Unit is required")
        }
        else {
            const res = await ProductCreateRequest(ProductFormValue, productId)
            if (res === true) {
                navigate("/ProductListPage")
            }
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4 className='font-weight-bolder'>Save Product</h4>
                            <hr className='bg-light'></hr>

                            <div className='row'>
                                <div className='col-lg-4 form-group'>
                                    <label className='form-label'>Product Name</label>
                                    <input onChange={(e) => store.dispatch(SetProductFormValue({ Name: "name", Value: e.target.value }))} value={ProductFormValue.name} type='text' placeholder='Enter product name' className='form-control form-control-sm'></input>
                                </div>
                                <div className='col-lg-4 form-group'>
                                    <label className='form-label'>Product Brand</label>
                                    <select onChange={(e) => store.dispatch(SetProductFormValue({ Name: "brandId", Value: e.target.value }))} value={ProductFormValue.brandId} className='form-control form-control-sm form-select form-select-sm'>
                                        <option value=''>Select Brand</option>
                                        {
                                            BrandDropDown.map((brand, i) =>
                                                <option value={brand?._id} key={i.toLocaleString()}>{brand?.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className='col-lg-4 form-group'>
                                    <label className='form-label'>Product Category</label>
                                    <select onChange={(e) => store.dispatch(SetProductFormValue({ Name: "categoryId", Value: e.target.value }))} value={ProductFormValue.categoryId} className='form-control form-control-sm form-select form-select-sm'>
                                        <option value=''>Select Category</option>
                                        {
                                            CategoryDropDown.map((cat, i) =>
                                                <option value={cat?._id} key={i.toLocaleString()}>{cat?.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className='col-lg-4 form-group'>
                                    <label className='form-label'>Product Unit</label>
                                    <input onChange={(e) => store.dispatch(SetProductFormValue({ Name: "unit", Value: e.target.value }))} value={ProductFormValue.unit} type='text' placeholder='Enter product unit' className='form-control form-control-sm'></input>
                                </div>
                                <div className='col-lg-4 form-group'>
                                    <label className='form-label'>Product Details</label>
                                    <input onChange={(e) => store.dispatch(SetProductFormValue({ Name: "details", Value: e.target.value }))} value={ProductFormValue.details} type='text' placeholder='Enter product details' className='form-control form-control-sm'></input>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-lg-4'>
                                    <button onClick={OnProductSave} className='btn btn-success w-100 btn-sm mt-2'>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCreateUpdate;