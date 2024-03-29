import './App.css';
import { BrowserRouter, HashRouter, Link, Route, Routes, Switch } from 'react-router-dom';
import PageLogin from './Login/PageLogin';
import DesignPage from './Design/DesignPage';
import PageCategory from './PageCategory/PageCategory';
import PageProductDetail from './PageProductDetail/PageProductDetail';
import Register from './Register/Register';
import HomePage from './HomePage/HomePage';
import PageAdmin from './Admin/PageAdmin';
import PageRoom from './PageRoom/PageRoom';
import CheckOut from './PageCheckOut/CheckOut';
import PageInfoUser from './PageInfoUser/PageInfoUser';
import ForgotPasswordPage from './ForgotPasswordPage/ForgotPasswordPage';
import ProductAdmin from './Admin/Pages/ProductAdmin/ProductAdmin';
import UserAdmin from './Admin/Pages/UsersAdmin/UserAdmin';
import CategoryAdmin from './Admin/Pages/CategoryAdmin/CategoryAdmin';
import PageOrder from './PageOrder/PageOrder';
import UserDetail from './Admin/Pages/UsersAdmin/UserDetail';
import CreateProduct from './Admin/Pages/ProductAdmin/CreateProduct';
import NotFound from './NotFound/NotFound';
import ProductDetail from './Admin/Pages/ProductAdmin/ProductDetail';
import EditProduct from './Admin/Pages/ProductAdmin/EditProduct';
import CreateCategory from './Admin/Pages/CategoryAdmin/CreateCategory';
import EditCategory from './Admin/Pages/CategoryAdmin/EditCategory';
import CategoryDetail from './Admin/Pages/CategoryAdmin/CategoryDetail';
import OrderDetail from './Admin/Pages/OrderAdmin/OrderDetail';
import OrderAdmin from './Admin/Pages/OrderAdmin/OrderAdmin';
import DiscountAdmin from './Admin/Pages/DiscountAdmin.js/DiscountAdmin';
import CreateDiscount from './Admin/Pages/DiscountAdmin.js/CreateDiscount';
import EditDiscount from './Admin/Pages/DiscountAdmin.js/EditDiscount';
import DiscountDetail from './Admin/Pages/DiscountAdmin.js/DiscountDetail';
import CreateBanner from './Admin/Pages/BannerAdmin/CreateBanner';
import BannerAdmin from './Admin/Pages/BannerAdmin/BannerAdmin';
import EditBanner from './Admin/Pages/BannerAdmin/EditBanner';
import BannerDetail from './Admin/Pages/BannerAdmin/BannerDetail';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/checkout/:state" element={<CheckOut />}></Route>
                <Route path="/order/" element={<PageOrder />}></Route>
                <Route path="/infoUser" element={<PageInfoUser />}></Route>
                <Route path="/checkout" element={<CheckOut />}></Route>
                <Route path="/design" exact element={<DesignPage />}></Route>
                <Route path="/category/:categoryId" element={<PageCategory />}></Route>
                <Route path="/productdetail/:productId" element={<PageProductDetail />}></Route>
                <Route path="/room/:roomId" element={<PageRoom/>}></Route>
                <Route path="/login" element={<PageLogin />}></Route>
                <Route path="/ForgotPassword" element={<ForgotPasswordPage />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/admin" element={<PageAdmin />}></Route>
                <Route path="/admin/products" element={<ProductAdmin/>}></Route>
                <Route path="/admin/categories" element={<CategoryAdmin />}></Route>
                <Route path="/admin/users" element={<UserAdmin />}></Route>
                <Route path="/admin/users/detail/:id" element={<UserDetail />}></Route>
                <Route path="/admin/products/edit/:id" element={<EditProduct />}></Route>
                <Route path="/admin/products/create" element={<CreateProduct />}></Route>
                <Route path="/admin/products/detail/:id" element={<ProductDetail />}></Route>
                <Route path="/admin/categories/create" element={<CreateCategory />}></Route>
                <Route path="/admin/categories/edit/:id" element={<EditCategory />}></Route>
                <Route path="/admin/categories/detail/:id" element={<CategoryDetail />}></Route>
                <Route path="/admin/orders" element={<OrderAdmin />}></Route>
                <Route path="/admin/orders/detail/:id" element={<OrderDetail />}></Route>
                <Route path="/admin/discounts" element={<DiscountAdmin />}></Route>
                <Route path="/admin/discounts/create" element={<CreateDiscount />}></Route>
                <Route path="/admin/discounts/edit/:id" element={<EditDiscount />}></Route>
                <Route path="/admin/discounts/detail/:id" element={<DiscountDetail />}></Route>
                <Route path="/admin/banners" element={<BannerAdmin />}></Route>
                <Route path="/admin/banners/create" element={<CreateBanner />}></Route>
                <Route path="/admin/banners/edit/:id" element={<EditBanner />}></Route>
                <Route path="/admin/banners/detail/:id" element={<BannerDetail />}></Route>
                <Route path="/notfound" element={<NotFound />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;
