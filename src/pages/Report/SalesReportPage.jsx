import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
import { lazy } from 'react';
import { Suspense } from 'react';
const SalesReport = lazy(() => import('../../components/Report/SalesReport'))

const SalesReportPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <SalesReport></SalesReport>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default SalesReportPage;