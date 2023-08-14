import React, { Suspense } from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
import { lazy } from 'react';
const CategoryCreateUpdate = lazy(() => import('../../components/Category/CategoryCreateUpdate'))

const CategoryCreateUpdatePage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <CategoryCreateUpdate></CategoryCreateUpdate>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default CategoryCreateUpdatePage;