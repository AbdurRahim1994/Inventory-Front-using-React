import React, { Suspense, lazy } from 'react';
import LazyLoader from '../../components/MasterLayout/LazyLoader';
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const Dashboard = lazy(() => import('../../components/Dashboard/Dashboard'))

const DashboardPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <Dashboard></Dashboard>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default DashboardPage;