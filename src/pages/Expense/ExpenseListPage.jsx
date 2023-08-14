import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout';
import LazyLoader from '../../components/MasterLayout/LazyLoader';
import { lazy } from 'react';
import { Suspense } from 'react';
const ExpenseList = lazy(() => import('../../components/Expense/ExpenseList'))

const ExpenseListPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <ExpenseList></ExpenseList>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default ExpenseListPage;