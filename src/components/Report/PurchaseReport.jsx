import React from 'react';
import { useRef } from 'react';
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper'
import { PurchaseReportByDateRequest } from '../../apiRequests/ReportAPIRequest';
import { useSelector } from 'react-redux';
import moment from 'moment';
import exportFromJSON from 'export-from-json';
import CurrencyFormat from 'react-currency-format';

const PurchaseReport = () => {
    let fromDateRef = useRef()
    let toDateRef = useRef()

    const OnCreateReport = async () => {
        const fromDate = fromDateRef.value;
        const toDate = toDateRef.value;

        if (IsEmpty(fromDate)) {
            ErrorToast("From Date is required")
        }
        else if (IsEmpty(toDate)) {
            ErrorToast("To Date is required")
        }
        else {
            const res = await PurchaseReportByDateRequest(fromDate, toDate);
        }
    }

    const PurchaseByDateList = useSelector((state) => state?.report?.PurchaseByDateList)

    const OnExport = async (exportType) => {
        const data = PurchaseByDateList[0]['Rows']
        const reportData = []
        data.map((item) => {
            const listItem = {
                "Product": item.Product ? item.Product[0]['name'] : "",
                "Unit": item.Product ? item.Product[0]['unit'] : "",
                "Details": item.Product ? item.Product[0]['details'] : "",
                "Brand": item.Brand ? item.Brand[0]['name'] : "",
                "Category": item.Category ? item.Category[0]['name'] : "",
                "UnitCost": item.unitPrice,
                "Quantity": item.quantity,
                "TotalCost": item.totalPrice,
                "Date": moment(item.createdDate).format("MMMM DD YYYY")
            }

            reportData.push(listItem)
        })

        exportFromJSON({ data: reportData, fileName: "Purchase Report", exportType })
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4 className='font-weight-bolder'>Purchase Report</h4>
                            <hr className='bg-light'></hr>

                            <div className='row'>
                                <div className='col-lg-4 form-group'>
                                    <label className='form-label'>From Date</label>
                                    <input ref={(input) => fromDateRef = input} type='date' className='form-control form-control-sm'></input>
                                </div>

                                <div className='col-lg-4 form-group'>
                                    <label className='form-label'>To Date</label>
                                    <input ref={(input) => toDateRef = input} type='date' className='form-control form-control-sm'></input>
                                </div>

                                <div className='row'>
                                    <div className='col-lg-4'>
                                        <button onClick={OnCreateReport} className='btn btn-success btn-sm w-100'>Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    PurchaseByDateList.length > 0 ?
                        <div className='col-lg-12 mt-3'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h4>Total : <CurrencyFormat value={PurchaseByDateList[0]['TotalAmount'][0]['TotalAmount']} thousandSeparator={true} prefix='$' displayType='text'></CurrencyFormat></h4>
                                    <div className='row'>
                                        <div className='col-lg-3'>
                                            <button onClick={OnExport.bind(this, 'csv')} className='btn btn-success btn-sm'>Download CSV</button>
                                        </div>

                                        <div className='col-lg-3'>
                                            <button onClick={OnExport.bind(this, 'xls')} className='btn btn-success btn-sm'>Download XLS</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div></div>
                }
            </div>
        </div>
    );
};

export default PurchaseReport;