import React from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
import { lazy } from 'react';
import { Suspense } from 'react';
const ProductList = lazy(() => import('../../components/Product/ProductList'))

const ProductListPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <ProductList></ProductList>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default ProductListPage;