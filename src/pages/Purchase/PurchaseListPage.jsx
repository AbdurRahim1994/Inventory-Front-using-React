import React, { Suspense, lazy } from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout';
import LazyLoader from '../../components/MasterLayout/LazyLoader';
const PurchaseList = lazy(() => import('../../components/Purchase/PurchaseList'))

const PurchaseListPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <PurchaseList></PurchaseList>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default PurchaseListPage;