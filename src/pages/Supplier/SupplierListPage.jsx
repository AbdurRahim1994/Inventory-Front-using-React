import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
import { lazy } from 'react';
import { Suspense } from 'react';
const SupplierList = lazy(() => import('../../components/Supplier/SupplierList'))

const SupplierListPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <SupplierList></SupplierList>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default SupplierListPage;