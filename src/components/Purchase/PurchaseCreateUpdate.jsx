import React, { useEffect } from 'react';
import { ProductDropDownRequest, PurchaseCreateRequest, SupplierDropDownRequest } from '../../apiRequests/PurchaseAPIRequest';
import { useSelector } from 'react-redux';
import { MdDeleteOutline, MdOutlineAddCircleOutline } from 'react-icons/md'
import { useRef } from 'react';
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper';
import store from '../../redux/store/store';
import { RemovePurchaseItemList, SetPurchaseFormValue, SetPurchaseItemList } from '../../redux/state-slice/purchase-slice';
import { useNavigate } from 'react-router-dom';

const PurchaseCreateUpdate = () => {
    let nameRef = useRef();
    let quantityRef = useRef();
    let unitPriceRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        SupplierDropDownRequest();
        ProductDropDownRequest();
    }, [])

    const SupplierDropDown = useSelector((state) => state?.purchase?.SupplierDropDown)
    const ProductDropDown = useSelector((state) => state?.purchase?.ProductDropDown);

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
                quantity: quantity,
                productName: name,
                unitPrice: unitPrice,
                totalPrice: (parseInt(unitPrice)) * (parseInt(quantity))
            }

            store.dispatch(SetPurchaseItemList(listItem))
        }
    }

    const PurchaseItemList = useSelector((state) => state?.purchase?.PurchaseItemList);

    const OnRemoveFromCart = async (i) => {
        store.dispatch(RemovePurchaseItemList(i))
    }

    const PurchaseFormValue = useSelector((state) => state?.purchase?.PurchaseFormValue);

    const OnPurchaseCreate = async () => {
        if (IsEmpty(PurchaseFormValue.supplierId)) {
            ErrorToast("Supplier is required")
        }
        else if (IsEmpty(PurchaseFormValue.vatTax)) {
            ErrorToast("Vat Tax is required")
        }
        else if (IsEmpty(PurchaseFormValue.grandTotal)) {
            ErrorToast("Grand total is required")
        }
        else if (PurchaseItemList.length <= 0) {
            ErrorToast("Select at least one product")
        }
        else {
            const res = await PurchaseCreateRequest(PurchaseFormValue, PurchaseItemList)
            if (res === true) {
                navigate("/PurchaseListPage")
            }
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-4'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4 className='font-weight-bolder'>Create Purchase</h4>
                            <hr className='bg-light'></hr>

                            <div className='row'>
                                <div className='form-group'>
                                    <label className='form-label'>Supplier Name</label>
                                    <select onChange={(e) => store.dispatch(SetPurchaseFormValue({ Name: "supplierId", Value: e.target.value }))} className='form-control form-control-sm form-select form-select-sm animated fadeInUp'>
                                        <option value="">Select Supplier</option>
                                        {
                                            SupplierDropDown.map((item, i) =>
                                                <option value={item?._id}>{item?.name}</option>
                                            )
                                        }
                                    </select>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Vat Tax</label>
                                    <input onChange={(e) => store.dispatch(SetPurchaseFormValue({ Name: "vatTax", Value: e.target.value }))} type='text' className='form-control form-control-sm animated fadeInUp'></input>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Discount</label>
                                    <input onChange={(e) => store.dispatch(SetPurchaseFormValue({ Name: "discount", Value: e.target.value }))} type='number' className='form-control form-control-sm animated fadeInUp'></input>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Other COst</label>
                                    <input onChange={(e) => store.dispatch(SetPurchaseFormValue({ Name: "otherCost", Value: e.target.value }))} type='number' className='form-control form-control-sm animated fadeInUp'></input>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Shipping Cost</label>
                                    <input onChange={(e) => store.dispatch(SetPurchaseFormValue({ Name: "shippingCost", Value: e.target.value }))} type='number' className='form-control form-control-sm animated fadeInUp'></input>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Grand Total</label>
                                    <input onChange={(e) => store.dispatch(SetPurchaseFormValue({ Name: "grandTotal", Value: e.target.value }))} type='number' className='form-control form-control-sm animated fadeInUp'></input>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Note</label>
                                    <input onChange={(e) => store.dispatch(SetPurchaseFormValue({ Name: "note", Value: e.target.value }))} type='text' className='form-control form-control-sm animated fadeInUp'></input>
                                </div>

                                <div className='form-group'>
                                    <button onClick={OnPurchaseCreate} className='btn btn-success btn-sm w-100 mt-3 animated fadeInUp'>Purchase</button>
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
                                            ProductDropDown.map((item, i) =>
                                                <option key={i.toLocaleString()} value={item?._id}>{item?.name}</option>
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
                                                    PurchaseItemList.map((item, i) =>
                                                        <tr>
                                                            <td>{item.productName}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.unitPrice}</td>
                                                            <td>{item.totalPrice}</td>
                                                            <td>
                                                                <button onClick={() => OnRemoveFromCart(i)} className='btn btn-outline-light btn-sm text-danger mb-0 p-2'>
                                                                    <MdDeleteOutline size={15}></MdDeleteOutline>
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
    );
};

export default PurchaseCreateUpdate;