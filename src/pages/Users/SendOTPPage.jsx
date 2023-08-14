import React, { Suspense, lazy } from 'react';
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const SendOTP = lazy(() => import('../../components/User/SendOTP'))

const SendOTPPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader></LazyLoader>}>
                <SendOTP></SendOTP>
            </Suspense>
        </div>
    );
};

export default SendOTPPage;