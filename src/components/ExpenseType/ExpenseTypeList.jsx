import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { DeleteExpenseTypeRequest, ExpenseTypeListRequest } from '../../apiRequests/ExpenseTypeAPIRequest';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import { NavLink } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import ReactPaginate from 'react-paginate';
import { DeleteAlert } from '../../helpers/DeleteAlert'
const ExpenseTypeList = () => {
    const [search, setSearch] = useState("0")
    const [perPage, setPerPage] = useState(20)

    useEffect(() => {
        ExpenseTypeListRequest(1, perPage, search);
    }, [])

    const ExpenseTypeList = useSelector((state) => state?.expenseType?.ExpenseTypeList);
    const TotalExpenseType = useSelector((state) => state?.expenseType?.TotalExpenseType)

    const OnPageChangeClick = async (event) => {
        await ExpenseTypeListRequest(event.selected + 1, perPage, search)
    }

    const OnPerPageChange = async (event) => {
        setPerPage(parseInt(event.target.value));
        await ExpenseTypeListRequest(1, event.target.value, search);
    }

    const OnSearchKeywordChange = async (event) => {
        setSearch(event.target.value);
        if ((event.target.value).length === 0) {
            setSearch("0")
            await ExpenseTypeListRequest(1, perPage, "0")
        }
    }

    const OnSearchClick = async () => {
        await ExpenseTypeListRequest(1, perPage, search)
    }

    const OnDeleteExpenseType = async (expenseTypeId) => {
        const res = await DeleteAlert();
        if (res.isConfirmed) {
            const deletedExpenseType = await DeleteExpenseTypeRequest(expenseTypeId);
            if (deletedExpenseType) {
                await ExpenseTypeListRequest(1, perPage, search)
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
                                    <h4 className='font-weight-bolder'>Expense Type List</h4>
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
                                    <div className='input-group mb-3'>
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
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Created</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Action</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    ExpenseTypeList.map((item, i) =>
                                                        <tr>
                                                            <td>{i + 1}</td>
                                                            <td>{item?.name}</td>
                                                            <td>{moment(item?.createdDate).format('MMMM DD YYYY')}</td>
                                                            <td>
                                                                <NavLink to={`/ExpenseTypeCreateUpdatePage?id=${item?._id}`} className='btn btn-outline-light btn-sm mb-0 text-info p-2'>
                                                                    <AiOutlineEdit size={15}></AiOutlineEdit>
                                                                </NavLink>
                                                                <button onClick={() => OnDeleteExpenseType(item?._id)} className='btn btn-outline-light btn-sm ms-2 mb-0 p-2 text-danger'>
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
                                            pageCount={TotalExpenseType / perPage}
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

export default ExpenseTypeList;