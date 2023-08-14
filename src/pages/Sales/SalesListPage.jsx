import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout';
import LazyLoader from '../../components/MasterLayout/LazyLoader';
import { Suspense, lazy } from 'react';
const SalesList = lazy(() => import('../../components/Sales/SalesList'))

const SalesListPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <SalesList></SalesList>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default SalesListPage;