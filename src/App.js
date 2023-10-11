import './App.css';
import { BrowserRouter, Route,Routes,Switch } from 'react-router-dom';
import PageLogin from './components/PageLogin';
import PageGuest from './components/Guest/PageGuest';
import PageCategory from './components/Category/PageCategory';
import PageProductDetail from './components/Product/PageProductDetail';
import DesignPage from './components/DesignPage';
import PageUser from './components/User/PageUser';
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
