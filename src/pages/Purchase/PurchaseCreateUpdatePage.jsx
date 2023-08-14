import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
import { lazy } from 'react';
import { Suspense } from 'react';
const PurchaseCreateUpdate = lazy(() => import('../../components/Purchase/PurchaseCreateUpdate'))

const PurchaseCreateUpdatePage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <PurchaseCreateUpdate></PurchaseCreateUpdate>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default PurchaseCreateUpdatePage;