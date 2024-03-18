import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PDF from './pages/PDF'
import DefaultLayout from './layout/DefaultLayout'
import { Toaster } from 'react-hot-toast';
import store from './redux/store'
import { Provider } from "react-redux";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Toaster />

        <DefaultLayout>
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/pdf' element={<PDF />} />

          </Routes>
        </DefaultLayout>
      </Provider>
    </BrowserRouter>
  )
}

export default App
