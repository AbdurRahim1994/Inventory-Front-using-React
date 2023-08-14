import React, { useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ExpenseSummaryRequest, PurchaseSummaryRequest, ReturnSummaryRequest, SalesSummaryRequest } from '../../apiRequests/SummaryAPIRequest'
import { useSelector } from 'react-redux';

const Dashboard = () => {
    useEffect(() => {
        ExpenseSummaryRequest();
        PurchaseSummaryRequest();
        SalesSummaryRequest();
        ReturnSummaryRequest();
    }, [])

    const ExpenseChart = useSelector((state) => state?.dashboard?.ExpenseChart)
    const ExpenseTotal = useSelector((state) => state?.dashboard?.ExpenseTotal)

    const PurchaseChart = useSelector((state) => state?.dashboard?.PurchaseChart)
    const PurchaseTotal = useSelector((state) => state?.dashboard?.PurchaseTotal)
    console.log(PurchaseChart)

    const SalesChart = useSelector((state) => state?.dashboard?.SalesChart)
    const SalesTotal = useSelector((state) => state?.dashboard?.SalesTotal)

    const ReturnChart = useSelector((state) => state?.dashboard?.ReturnChart)
    const ReturnTotal = useSelector((state) => state?.dashboard?.ReturnTotal)

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-3 p-2'>
                    <div className='card'>
                        <div className='card-body'>
                            <span className='h5'>
                                <CurrencyFormat value={ExpenseTotal} displayType='text' thousandSeparator={true} prefix='$'></CurrencyFormat>
                            </span>
                            <p className='font-weight-bolder'>Total Expense</p>
                        </div>
                    </div>
                </div>

                <div className='col-lg-3 p-2'>
                    <div className='card'>
                        <div className='card-body'>
                            <span className='h5'>
                                <CurrencyFormat value={SalesTotal} displayType='text' thousandSeparator={true} prefix='$'></CurrencyFormat>
                            </span>
                            <p className='font-weight-bolder'>Total Sales</p>
                        </div>
                    </div>
                </div>

                <div className='col-lg-3 p-2'>
                    <div className='card'>
                        <div className='card-body'>
                            <span className='h5'>
                                <CurrencyFormat value={PurchaseTotal} displayType='text' thousandSeparator={true} prefix='$'></CurrencyFormat>
                            </span>
                            <p className='font-weight-bolder'>Total Purchase</p>
                        </div>
                    </div>
                </div>

                <div className='col-lg-3 p-2'>
                    <div className='card'>
                        <div className='card-body'>
                            <span className='h5'>
                                <CurrencyFormat value={ReturnTotal} displayType='text' thousandSeparator={true} prefix='$'></CurrencyFormat>
                            </span>
                            <p className='font-weight-bolder'>Total Return</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-lg-6 p-2'>
                    <div className='card'>
                        <div className='card-body'>
                            <span className='h6'>Expense Last 30 Days</span>
                            <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                <AreaChart width={500} height={200} data={ExpenseChart} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
                                    <XAxis dataKey="_id"></XAxis>
                                    <YAxis></YAxis>
                                    <Tooltip></Tooltip>
                                    <Area type="monotone" dataKey="total" stroke='#00A884' fill='#00A884'></Area>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className='col-lg-6 p-2'>
                    <div className='card'>
                        <div className='card-body'>
                            <span className='h6'>Sales Last 30 Days</span>
                            <ResponsiveContainer className='mt-4' width="100%" height={200}>
                                <AreaChart data={SalesChart} width={500} height={200} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
                                    <XAxis dataKey="_id"></XAxis>
                                    <YAxis></YAxis>
                                    <Tooltip></Tooltip>
                                    <Area type="monotone" dataKey="total" stroke='#00A884' fill='#00A884'></Area>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className='col-lg-6 p-2'>
                    <div className='card'>
                        <div className='card-body'>
                            <span className='h6'>Purchase Last 30 Days</span>
                            <ResponsiveContainer className='mt-4' width="100%" height={200}>
                                <AreaChart data={PurchaseChart} width={500} height={200} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
                                    <XAxis dataKey="_id"></XAxis>
                                    <YAxis></YAxis>
                                    <Tooltip></Tooltip>
                                    <Area type="monotone" dataKey="total" stroke='#00A884' fill='#00A884'></Area>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className='col-lg-6 p-2'>
                    <div className='card'>
                        <div className='card-body'>
                            <span className='h6'>Return Last 30 Days</span>
                            <ResponsiveContainer className='mt-4' width="100%" height={200}>
                                <AreaChart data={ReturnChart} width={500} height={200} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
                                    <XAxis dataKey="_id"></XAxis>
                                    <YAxis></YAxis>
                                    <Tooltip></Tooltip>
                                    <Area type="monotone" dataKey="total" stroke='#00A884' fill='#00A884'></Area>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;