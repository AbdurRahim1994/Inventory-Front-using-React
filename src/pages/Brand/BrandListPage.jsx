import React, { Suspense, lazy } from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout';
import LazyLoader from '../../components/MasterLayout/LazyLoader';
const BrandList = lazy(() => import('../../components/Brand/BrandList'))

const BrandListPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <BrandList></BrandList>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default BrandListPage;