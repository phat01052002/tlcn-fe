import './App.css';
import { BrowserRouter, Route,Routes,Switch } from 'react-router-dom';
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
import Dashboard from './Admin/Scenes/Dashboard';
import ProductAdmin from './Admin/Pages/ProductAdmin/ProductAdmin';
import UserAdmin from './Admin/Pages/UsersAdmin/UserAdmin';
import CategoryAdmin from './Admin/Pages/CategoryAdmin/CategoryAdmin';
import EditProduct from './Admin/Pages/ProductAdmin/EditProduct';
function App() {
  return(
    <BrowserRouter> 
      <Routes>
        <Route path="/"  element={<HomePage/>}> </Route>
      </Routes>
      <Routes>
        <Route path="/admin"  element={<PageAdmin/>}> </Route>
        <Route path="/admin/products"  element={<ProductAdmin/>}> </Route>
        <Route path="/admin/categories"  element={<CategoryAdmin/>}> </Route>
        <Route path="/admin/users"  element={<UserAdmin/>}> </Route>
        <Route path="/admin/users/edit/:id"  element={<EditProduct/>}> </Route>
      </Routes>
      <Routes>
        <Route path="/login"  element={<PageLogin/>}> </Route>
      </Routes>
      <Routes>
        <Route path="/checkout/:state"  element={<CheckOut/>}> </Route>
      </Routes>
      <Routes>
        <Route path="/register"  element={<Register/>}> </Route>
      </Routes>
      <Routes>
        <Route path="/ForgotPassword"  element={<ForgotPasswordPage/>}> </Route>
      </Routes>
      <Routes>
        <Route path="/infoUser"  element={<PageInfoUser/>}> </Route>
      </Routes>
      <Routes>
        <Route path="/checkout"  element={<CheckOut/>}> </Route>
      </Routes>
      <Routes>
        <Route path="/design" exact element={<DesignPage/>}></Route>
      </Routes>
      <Routes>
        <Route path="/category/:categoryId" element={<PageCategory/>}></Route>
      </Routes>
      <Routes>
        <Route path="/productdetail/:productId" exact element={<PageProductDetail/>}></Route>
      </Routes>
      <Routes>
        <Route path="/room/:roomId" exact element={<PageRoom/>}></Route>
      </Routes>
    </BrowserRouter>
    
  )
}
export default App;
