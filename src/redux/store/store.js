import { configureStore } from '@reduxjs/toolkit'
import settingReducer from '../state-slice/setting-slice'
import profileReducer from '../state-slice/profile-slice'
import brandReducer from '../state-slice/brand-slice'
import categoryReducer from '../state-slice/category-slice'
import expenseTypeReducer from '../state-slice/expenseType-slice'
import expenseReducer from '../state-slice/expense-slice'
import customerReducer from '../state-slice/customer-slice'
import productReducer from '../state-slice/product-slice'
import supplierReducer from '../state-slice/supplier-slice'
import purchaseReducer from '../state-slice/purchase-slice'
import salesReducer from '../state-slice/sales-slice'
import returnReducer from '../state-slice/return-slice'
import reportReducer from '../state-slice/report-slice'
import dashboardReducer from '../state-slice/dashboard-slice'

export default configureStore({
    reducer: {
        setting: settingReducer,
        profile: profileReducer,
        brand: brandReducer,
        category: categoryReducer,
        expenseType: expenseTypeReducer,
        expense: expenseReducer,
        customer: customerReducer,
        product: productReducer,
        supplier: supplierReducer,
        purchase: purchaseReducer,
        sales: salesReducer,
        return: returnReducer,
        report: reportReducer,
        dashboard: dashboardReducer
    }
})