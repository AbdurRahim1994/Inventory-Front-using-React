import React, { Suspense, lazy } from 'react';
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const CreatePassword = lazy(() => import('../../components/User/CreatePassword'))

const CreatePasswordPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader></LazyLoader>}>
                <CreatePassword></CreatePassword>
            </Suspense>
        </div>
    );
};

export default CreatePasswordPage;