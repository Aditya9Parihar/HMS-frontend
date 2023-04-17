import React from 'react';
import { Route, Routes } from "react-router-dom";
import FrontPage from "./FrontPage";
import Customer from './Customer';
import Authorizer from './Authorizer';

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<FrontPage />}/>
        <Route path="/customer" element={<Customer />}/>
        <Route path="/authorizer" element={<Authorizer />}/>
      </Routes>
    </>
  )
}

export default App;