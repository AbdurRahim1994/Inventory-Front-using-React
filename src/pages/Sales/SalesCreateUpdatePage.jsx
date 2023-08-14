import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
import { lazy } from 'react';
import { Suspense } from 'react';
const SalesCreateUpdate = lazy(() => import('../../components/Sales/SalesCreateUpdate'))

const SalesCreateUpdatePage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <SalesCreateUpdate></SalesCreateUpdate>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default SalesCreateUpdatePage;