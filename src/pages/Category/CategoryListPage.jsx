import React from 'react';
import { Suspense } from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout';
import { lazy } from 'react';
import LazyLoader from '../../components/MasterLayout/LazyLoader';
const CategoryList = lazy(() => import('../../components/Category/CategoryList'))

const CategoryListPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <CategoryList></CategoryList>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default CategoryListPage;