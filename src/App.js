import React from 'react'
import Home from './pages/Home'
import DefaultLayout from './layout/DefaultLayout'
import { Toaster } from 'react-hot-toast';
import store from './redux/store'
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>

      {/* For toast notification */}
      <Toaster />

      <DefaultLayout>
        <Home />
      </DefaultLayout>
    </Provider>
  )
}

export default App
