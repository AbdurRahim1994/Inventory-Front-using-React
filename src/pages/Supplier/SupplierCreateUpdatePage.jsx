import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
import { lazy } from 'react';
import { Suspense } from 'react';
const SupplierCreateUpdate = lazy(() => import('../../components/Supplier/SupplierCreateUpdate'))

const SupplierCreateUpdatePage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <SupplierCreateUpdate></SupplierCreateUpdate>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default SupplierCreateUpdatePage;