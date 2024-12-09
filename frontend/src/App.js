import "@shopify/polaris/build/esm/styles.css";
import "./App.css";
import ProductPage from "./component/ProductPage";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddProduct from "./component/AddProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
