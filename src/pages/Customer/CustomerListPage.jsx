import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
import { lazy } from 'react';
import { Suspense } from 'react';
const CustomerList = lazy(() => import('../../components/Customer/CustomerList'))

const CustomerListPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <CustomerList></CustomerList>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default CustomerListPage;