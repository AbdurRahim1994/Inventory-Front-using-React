import React, { useEffect } from 'react';
import { CategoryListRequest, DeleteCategoryRequest } from '../../apiRequests/CategoryRequest';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import ReactPaginate from 'react-paginate';
import { DeleteAlert } from '../../helpers/DeleteAlert'

const CategoryList = () => {
    const [perPage, setPerPage] = useState(20);
    const [search, setSearch] = useState("0");

    useEffect(() => {
        CategoryListRequest(1, perPage, search);
    }, [])

    const CategoryList = useSelector((state) => state?.category?.CategoryList)
    const TotalCategory = useSelector((state) => state?.category?.TotalCategory)

    const OnPageChangeClick = async (event) => {
        await CategoryListRequest(event.selected + 1, perPage, search)
    }

    const OnPerPageChange = async (event) => {
        setPerPage(parseInt(event.target.value));
        await CategoryListRequest(1, event.target.value, search)
    }

    const OnSearchKeywordChange = async (event) => {
        setSearch(event.target.value);
        if ((event.target.value).length === 0) {
            setSearch("0")
            await CategoryListRequest(1, perPage, "0")
        }
    }

    const OnSearchClick = async () => {
        await CategoryListRequest(1, perPage, search)
    }

    const OnDeleteCategory = async (categoryId) => {
        const res = await DeleteAlert()
        if (res.isConfirmed) {
            const deletedCategory = await DeleteCategoryRequest(categoryId)
            if (deletedCategory) {
                await CategoryListRequest(1, perPage, search)
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
                                    <h4 className='font-weight-bolder'>Category List</h4>
                                </div>
                                <div className='col-lg-2'>
                                    <input type='text' className='form-control form-control-sm' placeholder='Text Filter'></input>
                                </div>
                                <div className='col-lg-2'>
                                    <select onChange={OnPerPageChange} className='form-control form-control-sm form-select mx-2 form-select-sm'>
                                        <option value='20'>20 Per Page</option>
                                        <option value='30'>30 Per Page</option>
                                        <option value='50'>50 Per Page</option>
                                        <option value='100'>100 Per Page</option>
                                        <option value='200'>200 Per Page</option>
                                    </select>
                                </div>
                                <div className='col-lg-4'>
                                    <div className='input-group'>
                                        <input onChange={OnSearchKeywordChange} type='text' className='form-control form-control-sm' placeholder='Search...' aria-label="Recipient's username" aria-describedby='button-addon2'></input>
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
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>#No</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Name</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Created</td>
                                                    <td className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Action</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    CategoryList.map((item, i) =>
                                                        <tr>
                                                            <td><p className='text-xs text-start'>{i + 1}</p></td>
                                                            <td><p className='text-xs text-start'>{item?.name}</p></td>
                                                            <td><p className='text-xs text-start'>{moment(item?.createdDate).format("MMMM DD YYYY")}</p></td>
                                                            <td>
                                                                <NavLink to={`/CategoryCreateUpdatePage?id=${item?._id}`} className='btn btn-outline-light btn-sm text-info mb-0 p-2'>
                                                                    <AiOutlineEdit size={15}></AiOutlineEdit>
                                                                </NavLink>
                                                                <button onClick={() => OnDeleteCategory(item?._id)} className='btn btn-outline-light btn-sm text-danger mb-0 p-2 ms-2'>
                                                                    <AiOutlineDelete></AiOutlineDelete>
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
                                            pageCount={TotalCategory / perPage}
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

export default CategoryList;