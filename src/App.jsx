import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router'
import { Auth } from './pages/auth/auth';
import { MainScreen } from './pages/main/main';
import { CheckAuth } from './components/chechAuth';
import { CheckAuthLogin } from './components/checkAuthLogin';
import { CustomerMain } from './pages/customer/customerMain';
import { InventoryComponent } from './pages/Inventory/InventoryMain';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={
          <CheckAuthLogin>
            <Auth />
          </CheckAuthLogin>}
        />

        <Route path='/FerrePal' element={
          <CheckAuth>
            <MainScreen />
          </CheckAuth>}
        />

        <Route path='/FerrePal/cliente/:id' element={
          <CheckAuth>
            <CustomerMain />
          </CheckAuth>}
        />

        <Route path='/Inventario' element={
          <CheckAuth>
            <InventoryComponent />
          </CheckAuth>
        }/>

      </Routes>

    </>
  )
}

export default App
