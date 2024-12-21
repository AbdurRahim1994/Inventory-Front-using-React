import React, { useEffect, useState } from 'react';
import {DeleteExpenseRequest, ExpenseListRequest} from '../../apiRequests/ExpenseAPIRequest'
import { useSelector } from 'react-redux';
//import CurrencyFormat from 'react-currency-format';
import { NavLink } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import ReactPaginate from 'react-paginate';
import{DeleteAlert} from '../../helpers/DeleteAlert'

const ExpenseList = () => {
    const[search, setSearch]=useState("0")
    const[perPage, setPerPage]=useState(20)

    useEffect(()=>{
        ExpenseListRequest(1, perPage, search);
    },[])

    const ExpenseList=useSelector((state)=>state?.expense?.ExpenseList);
    const TotalExpense=useSelector((state)=>state?.expense?.TotalExpense)

    const OnPageChangeClick=async(event)=>{
        await ExpenseListRequest(event.selected+1, perPage, search)
    }

    const OnPerPageChange=async(event)=>{
        setPerPage(parseInt(event.target.value))
        await ExpenseListRequest(1, event.target.value, search)
    }

    const OnSearchKeywordChange=async(event)=>{
        setSearch(event.target.value);
        if((event.target.value).length===0){
            setSearch("0")
            await ExpenseListRequest(1, perPage, "0")
        }
    }

    const OnSearchClick=async()=>{
        await ExpenseListRequest(1, perPage, search);
    }

    const OnDeleteExpense=async(expenseId)=>{
        const res=await DeleteAlert()
        if(res.isConfirmed){
            const deletedExpense=await DeleteExpenseRequest(expenseId)
            if(deletedExpense){
                await ExpenseListRequest(1, perPage, search)
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
                                    <h5 className='font-weight-bolder'>Expense List</h5>
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
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Type</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Amount</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Note</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Action</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    ExpenseList.map((item, i)=>
                                                    <tr>
                                                        <td><p className='text-xs text-start'>{i+1}</p></td>
                                                        {
                                                            item?.Type.map((type, j)=>
                                                            <td><p className='text-xs text-start'>{type?.name}</p></td>
                                                            )
                                                        }
                                                        {/* <td><p className='text-xs text-start'>{<CurrencyFormat value={item?.amount} displayType='text' thousandSeparator={true} prefix='$'></CurrencyFormat>}</p></td> */}
                                                        <td><p className='text-xs text-start'>{item?.amount}</p></td>
                                                        <td><p className='text-xs text-start'>{item?.note}</p></td>
                                                        <td>
                                                            <NavLink to={`/ExpenseCreateUpdatePage?id=${item?._id}`} className='btn btn-outline-light btn-sm text-info mb-0 p-2'>
                                                                <AiOutlineEdit size={15}></AiOutlineEdit>
                                                            </NavLink>
                                                            <button onClick={OnDeleteExpense.bind(this, item?._id)} className='btn btn-outline-light btn-sm mb-0 ms-2 text-danger p-2'>
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
                                            pageCount={TotalExpense / perPage}
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

export default ExpenseList;