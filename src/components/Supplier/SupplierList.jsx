import React, { useEffect, useState } from 'react';
import { SupplierListRequest, DeleteSupplierRequest } from '../../apiRequests/SupplierAPIRequest'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import ReactPaginate from 'react-paginate';
import { DeleteAlert } from '../../helpers/DeleteAlert'

const SupplierList = () => {
    const [search, setSearch] = useState("0");
    const [perPage, setPerPage] = useState(20)

    useEffect(() => {
        SupplierListRequest(1, perPage, search);
    }, [])

    const SupplierList = useSelector((state) => state?.supplier?.SupplierList)
    const TotalSupplier = useSelector((state) => state?.supplier?.TotalSupplier)

    const OnPageChangeClick = async (event) => {
        await SupplierListRequest(event.selected + 1, perPage, search)
    }

    const OnPerPageChange = async (event) => {
        setPerPage(event.target.value);
        await SupplierListRequest(1, event.target.value, search);
    }

    const OnSearchKeywordChange = async (event) => {
        setSearch(event.target.value);
        if ((event.target.value).length === 0) {
            setSearch("0")
            await SupplierListRequest(1, perPage, "0")
        }
    }

    const OnSearchClick = async () => {
        await SupplierListRequest(1, perPage, search)
    }

    const OnDeleteSupplier = async (supplierId) => {
        const res = await DeleteAlert();
        if (res.isConfirmed) {
            const deletedSupplier = await DeleteSupplierRequest(supplierId)
            if (deletedSupplier) {
                await SupplierListRequest(1, perPage, search)
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
                                <div className='col-lg-4'>
                                    <h4 className='font-weight-bolder'>Supplier List</h4>
                                </div>
                                <div className='col-lg-2'>
                                    <input type='text' placeholder='Text Filter' className='form-control form-control-sm'></input>
                                </div>
                                <div className='col-lg-2'>
                                    <select onChange={OnPerPageChange} className='form-control form-control-sm form-select form-select-sm'>
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
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Name</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Address</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Email</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Phone</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Action</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    SupplierList.map((item, i) =>
                                                        <tr>
                                                            <td><p className='text-start text-xs'>{i + 1}</p></td>
                                                            <td><p className='text-start text-xs'>{item?.name}</p></td>
                                                            <td><p className='text-start text-xs'>{item?.address}</p></td>
                                                            <td><p className='text-start text-xs'>{item?.email}</p></td>
                                                            <td><p className='text-start text-xs'>{item?.phone}</p></td>
                                                            <td>
                                                                <NavLink to={`/SupplierCreateUpdatePage?id=${item?._id}`} className='btn btn-outline-light btn-sm text-info mb-0 p-2'>
                                                                    <AiOutlineEdit size={15}></AiOutlineEdit>
                                                                </NavLink>
                                                                <button onClick={() => OnDeleteSupplier(item?._id)} className='btn btn-outline-light btn-sm text-danger mb-0 p-2 ms-2'>
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
                                            pageCount={TotalSupplier / perPage}
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

export default SupplierList;