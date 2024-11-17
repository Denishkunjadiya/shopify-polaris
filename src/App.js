import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import "./App.css";
import ProductPage from "./component/ProductPage";

import { AppProvider } from "@shopify/polaris";

function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <ProductPage />
    </AppProvider>
  );
}

export default App;
