import './App.css';
import { BrowserRouter, Route,Routes,Switch } from 'react-router-dom';
import PageLogin from './components/PageLogin';
import PageGuest from './components/Guest/PageGuest';
import PageCart from './components/PageCart'
import PageCategory from './components/Category/PageCategory';
import PageProductDetail from './components/Product/PageProductDetail';
function App() {
  return(
    <BrowserRouter> 
      <Routes>
        <Route path="/guest"  element={<PageGuest/>}> </Route>
      </Routes>
      <Routes>
        <Route path="/login"  element={<PageLogin/>}> </Route>
      </Routes>
      <Routes>
        <Route path="/cart"  element={<PageCart/>}> </Route>
      </Routes>
      <Routes>
        <Route path="/category/:categoryId" element={<PageCategory/>}></Route>
      </Routes>
      <Routes>
        <Route path="/productdetail/:productId" element={<PageProductDetail/>}></Route>
      </Routes>
    </BrowserRouter>
    
  )
}
export default App;
