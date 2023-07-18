import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ProductProvider from './context/ProductProvider.tsx'
import CartProvider from './context/CartProvider.tsx'
import AlertProvider from './context/AlertProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>,
)
