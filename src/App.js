import './App.css';
import { BrowserRouter, Route,Routes,Switch } from 'react-router-dom';
import PageLogin from './Login/PageLogin';
import PageCategory from './components/Category/PageCategory';
import PageProductDetail from './components/Product/PageProductDetail';
import DesignPage from './Design/DesignPage';
import PageUser from './User/PageUser';
import PageGuest from './Guest/PageGuest';
function App() {
  return(
    <BrowserRouter> 
      <Routes>
        <Route path="/guest"  element={<PageGuest/>}> </Route>
      </Routes>
      <Routes>
        <Route path="/user"  element={<PageUser/>}> </Route>
      </Routes>
      <Routes>
        <Route path="/login"  element={<PageLogin/>}> </Route>
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
