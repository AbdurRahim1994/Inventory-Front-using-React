import React, { useEffect, useRef } from 'react';
import { CustomerDropDownRequest, ProductDropDownRequest, ReturnCreateRequest } from '../../apiRequests/ReturnAPIRequest';
import { useSelector } from 'react-redux';
import { MdOutlineAddCircleOutline, MdOutlineDeleteOutline } from 'react-icons/md'
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper';
import store from '../../redux/store/store';
import { RemoveReturnItemList, SetReturnFormValue, SetReturnItemList } from '../../redux/state-slice/return-slice';
import { useNavigate } from 'react-router-dom';

const ReturnCreateUpdate = () => {
    let nameRef = useRef();
    let quantityRef = useRef();
    let unitPriceRef = useRef();
    const navigate = useNavigate()

    useEffect(() => {
        CustomerDropDownRequest();
        ProductDropDownRequest();
    }, [])

    const CustomerDropDown = useSelector((state) => state?.return?.CustomerDropDown)
    const ProductDropDown = useSelector((state) => state?.return?.ProductDropDown)

    const OnAddToCart = async () => {
        const id = nameRef.value;
        const name = nameRef.selectedOptions[0].text;
        const quantity = quantityRef.value;
        const unitPrice = unitPriceRef.value;
        const totalPrice = (parseInt(quantity)) * (parseInt(unitPrice))

        if (IsEmpty(id)) {
            ErrorToast("Product is required")
        }
        else if (IsEmpty(quantity)) {
            ErrorToast("Quantity is required")
        }
        else if (IsEmpty(unitPrice)) {
            ErrorToast("Unit price is required")
        }
        else {
            const listItem = {
                productId: id,
                productName: name,
                quantity: quantity,
                unitPrice: unitPrice,
                totalPrice: totalPrice
            }

            store.dispatch(SetReturnItemList(listItem))
        }
    }

    const ReturnItemList = useSelector((state) => state?.return?.ReturnItemList);

    const OnRemoveFromCart = async (i) => {
        store.dispatch(RemoveReturnItemList(i))
    }

    const ReturnFormValue = useSelector((state) => state?.return?.ReturnFormValue);

    const OnReturnCreate = async () => {
        if (IsEmpty(ReturnFormValue.customerId)) {
            ErrorToast("Customer is required")
        }
        else if (IsEmpty(ReturnFormValue.vatTax)) {
            ErrorToast("Vat Tax is required")
        }
        else if (IsEmpty(ReturnFormValue.grandTotal)) {
            ErrorToast("Grand total is required")
        }
        else if (ReturnItemList.length <= 0) {
            ErrorToast("Select at least one product")
        }
        else {
            const res = await ReturnCreateRequest(ReturnFormValue, ReturnItemList);
            if (res === true) {
                navigate("/ReturnListPage")
            }
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-4'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4 className='font-weight-bolder'>Create Return</h4>
                            <hr className='bg-light'></hr>

                            <div className='row'>
                                <div className='form-group'>
                                    <label className='form-label'>Customer Name</label>
                                    <select onChange={(e) => store.dispatch(SetReturnFormValue({ Name: "customerId", Value: e.target.value }))} className='form-control form-control-sm form-select form-select-sm animated fadeInUp'>
                                        <option value="">Select Customer</option>
                                        {
                                            CustomerDropDown.map((item, i) => {
                                                return (
                                                    <option value={item?._id}>{item?.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Vat Tax</label>
                                    <input onChange={(e) => store.dispatch(SetReturnFormValue({ Name: "vatTax", Value: e.target.value }))} type='number' className='form-control form-control-sm animated fadeInUp'></input>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Discount</label>
                                    <input onChange={(e) => store.dispatch(SetReturnFormValue({ Name: "discount", Value: e.target.value }))} type='number' className='form-control form-control-sm animated fadeInUp'></input>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Other Cost</label>
                                    <input onChange={(e) => store.dispatch(SetReturnFormValue({ Name: "otherCost", Value: e.target.value }))} type='number' className='form-control form-control-sm animated fadeInUp'></input>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Shipping Cost</label>
                                    <input onChange={(e) => store.dispatch(SetReturnFormValue({ Name: "shippingCost", Value: e.target.value }))} type='number' className='form-control form-control-sm animated fadeInUp'></input>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Grand Total</label>
                                    <input onChange={(e) => store.dispatch(SetReturnFormValue({ Name: "grandTotal", Value: e.target.value }))} type='number' className='form-control form-control-sm animated fadeInUp'></input>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Note</label>
                                    <input onChange={(e) => store.dispatch(SetReturnFormValue({ Name: "note", Value: e.target.value }))} type='text' className='form-control form-control-sm animated fadeInUp'></input>
                                </div>

                                <div className='form-group'>
                                    <button onClick={OnReturnCreate} className='btn btn-success btn-sm w-100 mt-3 animated fadeInUp'>Return</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-lg-8'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4 className='font-weight-bolder'>Product Details</h4>
                            <hr className='bg-light'></hr>

                            <div className='row'>
                                <div className='col-lg-4 form-group'>
                                    <label className='form-label'>Product Name</label>
                                    <select ref={(input) => nameRef = input} className='form-control form-control-sm form-select form-select-sm animated fadeInUp'>
                                        <option value="">Select Product</option>
                                        {
                                            ProductDropDown.map((item, i) => {
                                                return (
                                                    <option value={item?._id}>{item?.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className='col-lg-2 form-group'>
                                    <label className='form-label'>Quantity</label>
                                    <input ref={(input) => quantityRef = input} type='number' className='form-control form-control-sm animted fadeInUp'></input>
                                </div>

                                <div className='col-lg-2 form-group'>
                                    <label className='form-label'>Unit Price</label>
                                    <input ref={(input) => unitPriceRef = input} type='number' className='form-control form-control-sm animted fadeInUp'></input>
                                </div>

                                <div className='col-lg-2 form-group'>
                                    <label className='form-label'>Total Price</label>
                                    <input readOnly={true} type='number' className='form-control form-control-sm animted fadeInUp'></input>
                                </div>

                                <div className='col-lg-2 form-group'>
                                    <label className='form-label'>ADD</label>
                                    <button onClick={OnAddToCart} className='btn btn-success btn-sm'>
                                        <MdOutlineAddCircleOutline size={15}></MdOutlineAddCircleOutline>
                                    </button>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='table-responsive table-section'>
                                        <table className='table table-sm text-center'>
                                            <thead className='sticky-top bg-white'>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Quantity</th>
                                                    <th>Unit Price</th>
                                                    <th>Total</th>
                                                    <th>Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    ReturnItemList.map((item, i) => {
                                                        return (
                                                            <tr>
                                                                <td>{item.productName}</td>
                                                                <td>{item.quantity}</td>
                                                                <td>{item.unitPrice}</td>
                                                                <td>{item.totalPrice}</td>
                                                                <td>
                                                                    <button onClick={OnRemoveFromCart.bind(this, i)} className='btn btn-outline-light btn-sm text-danger mb-0 p-2'>
                                                                        <MdOutlineDeleteOutline size={15}></MdOutlineDeleteOutline>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnCreateUpdate;