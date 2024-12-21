import React, { useRef } from 'react';
import { ExpenseReportByDateRequest } from '../../apiRequests/ReportAPIRequest';
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import exportFromJSON from 'export-from-json';
//import CurrencyFormat from 'react-currency-format';

const ExpenseReport = () => {
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
            const res = await ExpenseReportByDateRequest(fromDate, toDate)
        }
    }

    const ExpenseByDateList = useSelector((state) => state?.report?.ExpenseByDateList);

    const OnExport = async (exportType) => {
        const data = ExpenseByDateList[0]['Rows']
        const fileName = "Expense Report"
        const reportData = []
        data.map((item, i) => {
            let listItem = {
                "Amount": item.amount,
                "Category": item.Type ? item.Type[0]['name'] : "",
                "Note": item.note,
                "Date": moment(item.createdDate).format('MMMM DD YYYY')
            }
            reportData.push(listItem)
        })

        exportFromJSON({ data: reportData, fileName: fileName, exportType: exportType })
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4 className='font-weight-bolder'>Expense Report</h4>
                            <hr className='bg-white'></hr>

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
                                    <div className='col-lg-4 form-group'>
                                        <button onClick={OnCreateReport} className='btn btn-success btn-sm w-100'>Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    ExpenseByDateList.length > 0 ?
                        <div className='col-lg-12 mt-3'>
                            <div className='card'>
                                <div className='card-body'>
                                    {/* <h4>Total : <CurrencyFormat value={ExpenseByDateList[0]['TotalAmount'][0]['TotalAmount']} thousandSeparator={true} prefix='$' displayType='text'></CurrencyFormat></h4> */}
                                    <h4>Total : {ExpenseByDateList[0]['TotalAmount'][0]['TotalAmount']}</h4>
                                    <div className='row'>
                                        <div className='col-lg-3'>
                                            <button onClick={() => OnExport('csv')} className='btn btn-success btn-sm'>Download CSV</button>
                                        </div>

                                        <div className='col-lg-3'>
                                            <button onClick={OnExport.bind(this, 'xls')} className='btn btn-success btn-sm'>Download XLS</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div>

                        </div>
                }
            </div>
        </div>
    );
};

export default ExpenseReport;