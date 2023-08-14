import React, { Suspense, lazy } from 'react';
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const NotFound = lazy(()=>import('../../components/NotFound/NotFound'))

const NotFoundPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader></LazyLoader>}>
                <NotFound></NotFound>
            </Suspense>
        </div>
    );
};

export default NotFoundPage;