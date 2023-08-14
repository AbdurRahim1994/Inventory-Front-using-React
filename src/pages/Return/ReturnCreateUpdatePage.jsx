import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
import { lazy } from 'react';
import { Suspense } from 'react';
const ReturnCreateUpdate = lazy(() => import('../../components/Return/ReturnCreateUpdate'))

const ReturnCreateUpdatePage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <ReturnCreateUpdate></ReturnCreateUpdate>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default ReturnCreateUpdatePage;