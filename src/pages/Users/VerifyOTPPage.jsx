import React, { Suspense, lazy } from 'react';
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const VerifyOTP = lazy(() => import('../../components/User/VerifyOTP'))

const VerifyOTPPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader></LazyLoader>}>
                <VerifyOTP></VerifyOTP>
            </Suspense>
        </div>
    );
};

export default VerifyOTPPage;