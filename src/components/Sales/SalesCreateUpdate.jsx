import React, { useRef } from 'react';
import { useEffect } from 'react';
import { CustomerDropDownRequest, ProductDropDownRequest, SalesCreateRequest } from '../../apiRequests/SalesAPIRequest'
import { useSelector } from 'react-redux';
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper';
import store from '../../redux/store/store';
import { RemoveSalesItemList, SetSalesFormValue, SetSalesItemList } from '../../redux/state-slice/sales-slice';
import { AiOutlineDelete } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const SalesCreateUpdate = () => {
    let nameRef = useRef();
    let quantityRef = useRef();
    let unitPriceRef = useRef();
    const navigate = useNavigate()

    useEffect(() => {
        CustomerDropDownRequest();
        ProductDropDownRequest();
    }, [])

    const CustomerDropDown = useSelector((state) => state?.sales?.CustomerDropDown)
    const ProductDropDown = useSelector((state) => state?.sales?.ProductDropDown)

    const OnAddToCart = async () => {
        const id = nameRef.value;
        const name = nameRef.selectedOptions[0].text;
        const quantity = quantityRef.value;
        const unitPrice = unitPriceRef.value;

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
                totalPrice: (parseInt(quantity)) * (parseInt(unitPrice))
            }

            store.dispatch(SetSalesItemList(listItem))
        }
    }

    const SalesItemList = useSelector((state) => state?.sales?.SalesItemList)

    const OnRemoveFromCart = async (i) => {
        store.dispatch(RemoveSalesItemList(i))
    }

    const SalesFormValue = useSelector((state) => state?.sales?.SalesFormValue)

    const OnSalesCreate = async () => {
        if (IsEmpty(SalesFormValue.customerId)) {
            ErrorToast("Customer is required")
        }
        else if (IsEmpty(SalesFormValue.vatTax)) {
            ErrorToast("Vat Tax is required")
        }
        else if (IsEmpty(SalesFormValue.grandTotal)) {
            ErrorToast("Grand total is required")
        }
        else if (SalesItemList.length <= 0) {
            ErrorToast("Select at least one product")
        }
        else {
            const res = await SalesCreateRequest(SalesFormValue, SalesItemList)
            if (res === true) {
                navigate("/SalesListPage")
            }
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-4'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4 className='font-weight-bolder'>Create Sales</h4>
                            <hr className='bg-light'></hr>

                            <div className='row'>
                                <div className='form-group'>
                                    <label className='form-label'>Customer Name</label>
                                    <select onChange={(e) => store.dispatch(SetSalesFormValue({ Name: "customerId", Value: e.target.value }))} className='form-control form-control-sm form-select form-select-sm animated fadeInUp'>
                                        <option value="">Select Customer</option>
                                        {
                                            CustomerDropDown.map((item, i) =>
                                                <option value={item?._id} key={i.toLocaleString()}>{item?.name}</option>
                                            )
                                        }
                                    </select>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Vat Tax</label>
                                    <input onChange={(e) => store.dispatch(SetSalesFormValue({ Name: "vatTax", Value: e.target.value }))} type='number' className='form-control form-control-sm animated fadeInUp'></input>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Discount</label>
                                    <input onChange={(e) => store.dispatch(SetSalesFormValue({ Name: "discount", Value: e.target.value }))} type='number' className='form-control form-control-sm animated fadeInUp'></input>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Other Cost</label>
                                    <input onChange={(e) => store.dispatch(SetSalesFormValue({ Name: "otherCost", Value: e.target.value }))} type='number' className='form-control form-control-sm animated fadeInUp'></input>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Shipping Cost</label>
                                    <input onChange={(e) => store.dispatch(SetSalesFormValue({ Name: "shippingCost", Value: e.target.value }))} type='number' className='form-control form-control-sm animated fadeInUp'></input>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Grand Total</label>
                                    <input onChange={(e) => store.dispatch(SetSalesFormValue({ Name: "grandTotal", Value: e.target.value }))} type='number' className='form-control form-control-sm animated fadeInUp'></input>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Note</label>
                                    <input onChange={(e) => store.dispatch(SetSalesFormValue({ Name: "note", Value: e.target.value }))} type='text' className='form-control form-control-sm animated fadeInUp'></input>
                                </div>

                                <div className='form-group mt-3'>
                                    <button onClick={OnSalesCreate} className='btn btn-success btn-sm w-100 animated fadeInUp'>Sales</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-lg-8'>
                    <div className='row'>
                        <div className='card'>
                            <div className='card-body'>
                                <h4 className='font-weight-bolder'>Product Details</h4>
                                <hr className='bg-light'></hr>

                                <div className='row'>
                                    <div className='col-lg-4 form-group'>
                                        <label className='form-label'>Product Name</label>
                                        <select ref={(input) => nameRef = input} className='form-control form-control-sm form-select form-select-sm animated fadeIdUp'>
                                            <option value="">Select Product</option>
                                            {
                                                ProductDropDown.map((item, i) =>
                                                    <option value={item?._id} key={i.toLocaleString()}>{item?.name}</option>
                                                )
                                            }
                                        </select>
                                    </div>

                                    <div className='col-lg-2 form-group'>
                                        <label className='form-label'>Quantity</label>
                                        <input ref={(input) => quantityRef = input} type='number' className='form-control form-control-sm animated fadeInUp'></input>
                                    </div>

                                    <div className='col-lg-2 form-group'>
                                        <label className='form-label'>Unit Price</label>
                                        <input ref={(input) => unitPriceRef = input} type='number' className='form-control form-control-sm animated fadeInUp'></input>
                                    </div>

                                    <div className='col-lg-2 form-group'>
                                        <label className='form-label'>Total Price</label>
                                        <input readOnly={true} type='number' className='form-control form-control-sm animated fadeInUp'></input>
                                    </div>

                                    <div className='col-lg-2 form-group'>
                                        <label className='form-label'>ADD</label>
                                        <button onClick={OnAddToCart} className='btn btn-success btn-sm w-100'>
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
                                                        SalesItemList.map((item, i) =>
                                                            <tr>
                                                                <td>{item.productName}</td>
                                                                <td>{item.quantity}</td>
                                                                <td>{item.unitPrice}</td>
                                                                <td>{item.totalPrice}</td>
                                                                <td>
                                                                    <button onClick={OnRemoveFromCart.bind(i)} className='btn btn-outline-light btn-sm text-danger mb-0 p-2'>
                                                                        <AiOutlineDelete size={15}></AiOutlineDelete>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
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
        </div>
    );
};

export default SalesCreateUpdate;