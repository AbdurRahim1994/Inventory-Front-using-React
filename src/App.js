import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/Users/RegistrationPage";
import LoginPage from '../src/pages/Users/LoginPage'
import FullScreenLoader from "./components/MasterLayout/FullScreenLoader";
import DashboardPage from '../src/pages/Dashboard/DashboardPage'
import NotFoundPage from '../src/pages/NotFound/NotFoundPage'
import ProfilePage from '../src/pages/Users/ProfilePage'
import SendOTPPage from "./pages/Users/SendOTPPage";
import VerifyOTPPage from '../src/pages/Users/VerifyOTPPage'
import CreatePasswordPage from '../src/pages/Users/CreatePasswordPage'
import BrandListPage from '../src/pages/Brand/BrandListPage'
import BrandCreateUpdatePage from '../src/pages/Brand/BrandCreateUpdatePage'
import CategoryListPage from '../src/pages/Category/CategoryListPage'
import CategoryCreateUpdatePage from '../src/pages/Category/CategoryCreateUpdatePage'
import ExpenseTypeListPage from '../src/pages/ExpenseType/ExpenseTypeListPage'
import ExpenseTypeCreateUpdatePage from '../src/pages/ExpenseType/ExpenseTypeCreateUpdatePage'
import ExpenseListPage from '../src/pages/Expense/ExpenseListPage'
import ExpenseCreateUpdatePage from '../src/pages/Expense/ExpenseCreateUpdatePage'
import CustomerListPage from '../src/pages/Customer/CustomerListPage'
import CustomerCreateUpdatePage from '../src/pages/Customer/CustomerCreateUpdatePage'
import ProductListPage from '../src/pages/Product/ProductListPage'
import ProductCreateUpdatePage from '../src/pages/Product/ProductCreateUpdatePage'
import SupplierListPage from '../src/pages/Supplier/SupplierListPage'
import SupplierCreateUpdatePage from '../src/pages/Supplier/SupplierCreateUpdatePage'
import PurchaseListPage from '../src/pages/Purchase/PurchaseListPage'
import PurchaseCreateUpdatePage from '../src/pages/Purchase/PurchaseCreateUpdatePage'
import SalesListPage from '../src/pages/Sales/SalesListPage'
import SalesCreateUpdatePage from '../src/pages/Sales/SalesCreateUpdatePage'
import ReturnListPage from '../src/pages/Return/ReturnListPage'
import ReturnCreateUpdatePage from '../src/pages/Return/ReturnCreateUpdatePage'
import ExpenseReportPage from '../src/pages/Report/ExpenseReportPage'
import SalesReportPage from '../src/pages/Report/SalesReportPage'
import PurchaseReportPage from '../src/pages/Report/PurchaseReportPage'
import ReturnReportPage from '../src/pages/Report/ReturnReportPage'
import ProtectedRoute from '../src/components/ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage></LoginPage>}></Route>
          <Route path="/registration" element={<RegistrationPage></RegistrationPage>}></Route>
          <Route path="/SendOTP" element={<SendOTPPage></SendOTPPage>}></Route>
          <Route path="/VerifyOTP" element={<VerifyOTPPage></VerifyOTPPage>}></Route>
          <Route path="/CreatePassword" element={<CreatePasswordPage></CreatePasswordPage>}></Route>

          <Route element={<ProtectedRoute></ProtectedRoute>}>
            <Route path="/Dashboard" element={<DashboardPage></DashboardPage>}></Route>
            <Route path="/Profile" element={<ProfilePage></ProfilePage>}></Route>
            <Route path="/BrandListPage" element={<BrandListPage></BrandListPage>}></Route>
            <Route path="/BrandCreateUpdatePage" element={<BrandCreateUpdatePage></BrandCreateUpdatePage>}></Route>
            <Route path="/CategoryListPage" element={<CategoryListPage></CategoryListPage>}></Route>
            <Route path="/CategoryCreateUpdatePage" element={<CategoryCreateUpdatePage></CategoryCreateUpdatePage>}></Route>
            <Route path="/ExpenseTypeListPage" element={<ExpenseTypeListPage></ExpenseTypeListPage>}></Route>
            <Route path="/ExpenseTypeCreateUpdatePage" element={<ExpenseTypeCreateUpdatePage></ExpenseTypeCreateUpdatePage>}></Route>
            <Route path="/ExpenseListPage" element={<ExpenseListPage></ExpenseListPage>}></Route>
            <Route path="/ExpenseCreateUpdatePage" element={<ExpenseCreateUpdatePage></ExpenseCreateUpdatePage>}></Route>
            <Route path="/CustomerListPage" element={<CustomerListPage></CustomerListPage>}></Route>
            <Route path="/ProductListPage" element={<ProductListPage></ProductListPage>}></Route>
            <Route path="/CustomerCreateUpdatePage" element={<CustomerCreateUpdatePage></CustomerCreateUpdatePage>}></Route>
            <Route path="/ProductCreateUpdatePage" element={<ProductCreateUpdatePage></ProductCreateUpdatePage>}></Route>
            <Route path="/SupplierListPage" element={<SupplierListPage></SupplierListPage>}></Route>
            <Route path="/SupplierCreateUpdatePage" element={<SupplierCreateUpdatePage></SupplierCreateUpdatePage>}></Route>
            <Route path="/PurchaseListPage" element={<PurchaseListPage></PurchaseListPage>}></Route>
            <Route path="/PurchaseCreateUpdatePage" element={<PurchaseCreateUpdatePage></PurchaseCreateUpdatePage>}></Route>
            <Route path="/SalesListPage" element={<SalesListPage></SalesListPage>}></Route>
            <Route path="/SalesCreateUpdatePage" element={<SalesCreateUpdatePage></SalesCreateUpdatePage>}></Route>
            <Route path="/ReturnListPage" element={<ReturnListPage></ReturnListPage>}></Route>
            <Route path="/ReturnCreateUpdatePage" element={<ReturnCreateUpdatePage></ReturnCreateUpdatePage>}></Route>
            <Route path="/ExpenseReportPage" element={<ExpenseReportPage></ExpenseReportPage>}></Route>
            <Route path="/SalesReportPage" element={<SalesReportPage></SalesReportPage>}></Route>
            <Route path="/PurchaseReportPage" element={<PurchaseReportPage></PurchaseReportPage>}></Route>
            <Route path="/ReturnReportPage" element={<ReturnReportPage></ReturnReportPage>}></Route>
          </Route>

          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </BrowserRouter>
      <FullScreenLoader></FullScreenLoader>
    </div>
  );
}

export default App;
