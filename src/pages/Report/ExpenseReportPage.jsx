import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
import { lazy } from 'react';
import { Suspense } from 'react';
const ExpenseReport = lazy(() => import('../../components/Report/ExpenseReport'))

const ExpenseReportPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <ExpenseReport></ExpenseReport>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default ExpenseReportPage;