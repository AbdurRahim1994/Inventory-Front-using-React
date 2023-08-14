import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout';
import LazyLoader from '../../components/MasterLayout/LazyLoader';
import { lazy } from 'react';
import { Suspense } from 'react';
const ExpenseTypeCreateUpdate = lazy(() => import('../../components/ExpenseType/ExpenseTypeCreateUpdate'))

const ExpenseTypeCreateUpdatePage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <ExpenseTypeCreateUpdate></ExpenseTypeCreateUpdate>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default ExpenseTypeCreateUpdatePage;