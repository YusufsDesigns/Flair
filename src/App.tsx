import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Root from "./Root"
import { Cart, Home, ProductInfo } from "./pages"
import { ProductInfoLoader } from "./pages/ProductInfo/ProductInfo"

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/product">
          <Route path=":id" element={<ProductInfo />} loader={ProductInfoLoader} />
        </Route>
        <Route path="/cart" element={<Cart />} />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
