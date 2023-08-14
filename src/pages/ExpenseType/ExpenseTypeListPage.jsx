import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
import { lazy } from 'react';
import { Suspense } from 'react';
const ExpenseType = lazy(() => import('../../components/ExpenseType/ExpenseTypeList'))

const ExpenseTypeListPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <ExpenseType></ExpenseType>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default ExpenseTypeListPage;