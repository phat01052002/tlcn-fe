import './App.css';
import { BrowserRouter, Route,Routes,Switch } from 'react-router-dom';
import PageLogin from './Login/PageLogin';
import DesignPage from './Design/DesignPage';
import PageCategory from './PageCategory/PageCategory';
import PageProductDetail from './PageProductDetail/PageProductDetail';
import Register from './Register/Register';
import HomePage from './HomePage/HomePage';
import PageAdmin from './Admin/PageAdmin';
function App() {
  return(
    <BrowserRouter> 
      <Routes>
        <Route path="/"  element={<HomePage/>}> </Route>
      </Routes>
      <Routes>
        <Route path="/admin"  element={<PageAdmin/>}> </Route>
      </Routes>
      <Routes>
        <Route path="/login"  element={<PageLogin/>}> </Route>
      </Routes>
      <Routes>
        <Route path="/register"  element={<Register/>}> </Route>
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
    </BrowserRouter>
    
  )
}
export default App;
