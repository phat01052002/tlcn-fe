import logo from './logo.svg';
import './App.css';
import PageAdmin from './components/Admin/PageAdmin';
import { useState } from 'react';
import PageGuest from './components/Guest/PageGuest';
import PageUser from './components/User/PageUser';
import PageShipper from './components/Shipper/PageShipper';

function App() {
  const [roleUser,setRoleUser] = useState("admin");
  if(roleUser=="guest"){
    return (
      <PageGuest/>
    );
  }
  if(roleUser=="admin"){
    return (
      <PageAdmin/>
    );
  }
  if(roleUser=="user"){
    return (
      <PageUser/>
    );
  }
  if(roleUser=="shipper"){
    return (
      <PageShipper/>
    );
  }
}
export default App;
