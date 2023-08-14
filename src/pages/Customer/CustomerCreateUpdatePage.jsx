import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
import { lazy } from 'react';
import { Suspense } from 'react';
const CustomerCreateUpdate = lazy(() => import('../../components/Customer/CustomerCreateUpdate'))

const CustomerCreateUpdatePage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <CustomerCreateUpdate></CustomerCreateUpdate>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default CustomerCreateUpdatePage;