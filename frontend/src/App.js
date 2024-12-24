import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import AddProduct from "./component/AddProduct";
import ProductPage from "./component/ProductPage";

import "@shopify/polaris/build/esm/styles.css";

function App() {
  console.log(process.env.REACT_APP_BASE_URL);
  return (
    <BrowserRouter>
      <div style={{ paddingBottom: "20px" }}>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
