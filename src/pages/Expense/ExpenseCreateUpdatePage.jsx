import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout';
import LazyLoader from '../../components/MasterLayout/LazyLoader';
import { lazy } from 'react';
import { Suspense } from 'react';
const ExpenseCreateUpdate = lazy(() => import('../../components/Expense/ExpenseCreateUpdate'))

const ExpenseCreateUpdatePage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <ExpenseCreateUpdate></ExpenseCreateUpdate>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default ExpenseCreateUpdatePage;