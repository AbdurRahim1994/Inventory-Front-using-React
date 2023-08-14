import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
import { lazy } from 'react';
import { Suspense } from 'react';
const ProductCreateUpdate = lazy(() => import('../../components/Product/ProductCreateUpdate'))

const ProductCreateUpdatePage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <ProductCreateUpdate></ProductCreateUpdate>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default ProductCreateUpdatePage;