import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
import { lazy } from 'react';
import { Suspense } from 'react';
const ReturnReport = lazy(() => import('../../components/Report/ReturnReport'))

const ReturnReportPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <ReturnReport></ReturnReport>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default ReturnReportPage;