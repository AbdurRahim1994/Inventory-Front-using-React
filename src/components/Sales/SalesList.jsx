import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { SalesListRequest } from '../../apiRequests/SalesAPIRequest'
import { useSelector } from 'react-redux';
//import CurrencyFormat from 'react-currency-format';
import moment from 'moment/moment';
import { AiOutlineEye } from 'react-icons/ai'
import ReactPaginate from 'react-paginate';

const SalesList = () => {
    const [search, setSearch] = useState("0");
    const [perPage, setPerPage] = useState(20);

    useEffect(() => {
        SalesListRequest(1, perPage, search)
    }, [])

    const SalesList = useSelector((state) => state?.sales?.SalesList)
    const TotalSales = useSelector((state) => state?.sales?.TotalSales)

    const OnPageChangeClick = async (event) => {
        await SalesListRequest(event.selected + 1, perPage, search)
    }

    const OnPerPageChange = async (event) => {
        setPerPage(event.target.value);
        await SalesListRequest(1, event.target.value, search)
    }

    const OnSearchKeywordChange = async (event) => {
        setSearch(event.target.value);
        if ((event.target.value).length === 0) {
            setSearch("0")
            await SalesListRequest(1, perPage, "0")
        }
    }

    const OnSearchClick = async () => {
        await SalesListRequest(1, perPage, search)
    }

    return (
        <div className='container-fluid my-5'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-lg-4'>
                                    <h4 className='font-weight-bolder'>Sales List</h4>
                                </div>
                                <div className='col-lg-2'>
                                    <input type='text' placeholder='Text Filter' className='form-control form-control-sm'></input>
                                </div>
                                <div className='col-lg-2'>
                                    <select onChange={OnPerPageChange} className='form-control form-control form-select form-select-sm'>
                                        <option value='20'>20 Per Page</option>
                                        <option value='30'>30 Per Page</option>
                                        <option value='50'>50 Per Page</option>
                                        <option value='100'>100 Per Page</option>
                                        <option value='200'>200 Per Page</option>
                                    </select>
                                </div>
                                <div className='col-lg-4'>
                                    <div className='input-group'>
                                        <input onChange={OnSearchKeywordChange} type='text' placeholder='Search...' className='form-control form-control-sm'></input>
                                        <button onClick={OnSearchClick} className='btn btn-success btn-sm mb-0'>Search</button>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='table-responsive table-section'>
                                        <table className='table'>
                                            <thead className='sticky-top bg-white'>
                                                <tr>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>#NO</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Customer</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Grand Total</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Shipping Cost</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Vat/Tax</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Other Cost</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Discount</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Date</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Action</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    SalesList.map((item, i) =>
                                                        <tr>
                                                            <td><p className='text-xs text-start'>{i + 1}</p></td>
                                                            <td>
                                                                {
                                                                    item?.Customer.map((cus, i) =>
                                                                        <p className='text-start text-xs'>{cus?.name}</p>
                                                                    )
                                                                }
                                                            </td>
                                                            {/* <td><p className='text-start text-xs'><CurrencyFormat value={item?.grandTotal} thousandSeparator={true} prefix='$' displayType='text'></CurrencyFormat></p></td>
                                                            <td><p className='text-start text-xs'><CurrencyFormat value={item?.shippingCost} displayType='text' thousandSeparator={true} prefix='$'></CurrencyFormat></p></td>
                                                            <td><p className='text-start text-xs'><CurrencyFormat value={item?.vatTax} displayType='text' thousandSeparator={true} prefix='$'></CurrencyFormat></p></td>
                                                            <td><p className='text-start text-xs'><CurrencyFormat value={item?.otherCost} displayType='text' thousandSeparator={true} prefix='$'></CurrencyFormat></p></td>
                                                            <td><p className='text-start text-xs'><CurrencyFormat value={item?.discount} displayType='text' thousandSeparator={true} prefix='$'></CurrencyFormat></p></td>
                                                            <td><p className='text-start text-xs'>{moment(item?.createdDate).format('MMMM DD YYYY')}</p></td> */}
                                                            <td><p className='text-start text-xs'>{item?.grandTotal}</p></td>
                                                            <td><p className='text-start text-xs'>{item?.shippingCost}</p></td>
                                                            <td><p className='text-start text-xs'>{item?.vatTax}</p></td>
                                                            <td><p className='text-start text-xs'>{item?.otherCost}</p></td>
                                                            <td><p className='text-start text-xs'>{item?.discount}</p></td>
                                                            <td><p className='text-start text-xs'>{moment(item?.createdDate).format('MMMM DD YYYY')}</p></td>
                                                            <td>
                                                                <button className='btn btn-outline-light btn-sm text-success mb-0 p-2 ms-2'>
                                                                    <AiOutlineEye size={15}></AiOutlineEye>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className='col-lg-12'>
                                    <nav aria-label="Page navigation example">
                                        <ReactPaginate
                                            previousLabel="<"
                                            nextLabel=">"
                                            pageClassName="page-item"
                                            pageLinkClassName="page-link"
                                            previousClassName="page-item"
                                            previousLinkClassName="page-link"
                                            nextClassName="page-item"
                                            nextLinkClassName="page-link"
                                            breakLabel="..."
                                            breakClassName="page-item"
                                            breakLinkClassName="page-link"
                                            pageCount={TotalSales / perPage}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={OnPageChangeClick}
                                            containerClassName="pagination"
                                            activeClassName="active"
                                        />
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesList;