import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
import { lazy } from 'react';
import { Suspense } from 'react';
const BrandCreateUpdate = lazy(() => import('../../components/Brand/BrandCreateUpdate'))

const BrandCreateUpdatePage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <BrandCreateUpdate></BrandCreateUpdate>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default BrandCreateUpdatePage;