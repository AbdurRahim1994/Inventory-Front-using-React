import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
import { lazy } from 'react';
import { Suspense } from 'react';
const PurchaseReport = lazy(() => import('../../components/Report/PurchaseReport'))

const PurchaseReportPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <PurchaseReport></PurchaseReport>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default PurchaseReportPage;