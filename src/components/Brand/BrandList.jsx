import React, { useEffect, useState } from 'react';
import { BrandListRequest, DeleteBrandRequest } from '../../apiRequests/BrandAPIRequest';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { DeleteAlert } from '../../helpers/DeleteAlert'

const BrandList = () => {
    const [perPage, setPerPage] = useState(20)
    const [search, setSearch] = useState("0")

    useEffect(() => {
        BrandListRequest(1, perPage, search);
    }, [])

    const BrandList = useSelector((state) => state?.brand?.BrandList)
    const TotalBrand = useSelector((state) => state?.brand?.TotalBrand)

    const OnPageChangeClick = async (event) => {
        await BrandListRequest(event.selected + 1, perPage, search)
    }

    const OnPerPageChange = async (event) => {
        setPerPage(parseInt(event.target.value));
        await BrandListRequest(1, event.target.value, search)
    }

    const OnSearchKeywordChange = async (event) => {
        setSearch(event.target.value);
        if ((event.target.value).length === 0) {
            setSearch(() => "0")
            await BrandListRequest(1, perPage, "0")
        }
    }

    const OnSearchClick = async () => {
        await BrandListRequest(1, perPage, search);
    }

    const OnDeleteBrand = async (id) => {
        const res = await DeleteAlert()
        if (res.isConfirmed) {
            const deletedBrand = await DeleteBrandRequest(id);
            if (deletedBrand) {
                await BrandListRequest(1, perPage, search)
            }
        }
    }

    return (
        <div className='container-fluid my-5'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-lg-4'>
                                    <h4 className='font-weight-bolder'>Brand List</h4>
                                </div>
                                <div className='col-lg-2'>
                                    <input placeholder='Text Filter' className='form-control form-control-sm'></input>
                                </div>
                                <div className='col-lg-2'>
                                    <select onChange={OnPerPageChange} className='form-control form-control-sm form-select form-select-sm mx-2'>
                                        <option value="20">20 Per Page</option>
                                        <option value="30">30 Per Page</option>
                                        <option value="50">50 Per Page</option>
                                        <option value="100">100 Per Page</option>
                                        <option value="200">200 Per Page</option>
                                    </select>
                                </div>
                                <div className='col-lg-4 mb-3'>
                                    <div className='input-group'>
                                        <input onChange={OnSearchKeywordChange} type='text' className='form-control form-control-sm' placeholder='Search...' aria-label="Recipient's username" aria-describedby='button-addon2'></input>
                                        <button onClick={OnSearchClick} type='button' className='btn btn-success btn-sm mb-0'>Search</button>
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
                                                    BrandList.map((item, i) =>
                                                        <tr>
                                                            <td><p className='text-xs text-start'>{i + 1}</p></td>
                                                            <td><p className='text-xs text-start'>{item?.name}</p></td>
                                                            <td><p className='text-xs text-start'>{moment(item.createdDate).format('MMMM DD YYYY')}</p></td>
                                                            <td>
                                                                <NavLink to={`/BrandCreateUpdatePage?id=${item?._id}`} className='btn btn-outline-light btn-sm text-info p-2 mb-0'>
                                                                    <AiOutlineEdit size={15}></AiOutlineEdit>
                                                                </NavLink>
                                                                <button onClick={() => OnDeleteBrand(item?._id)} className='btn btn-outline-light btn-sm ms-2 p-2 mb-0 text-danger'>
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

                                <div className='col-lg-12 mt-5'>
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
                                            pageCount={TotalBrand / perPage}
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

export default BrandList;