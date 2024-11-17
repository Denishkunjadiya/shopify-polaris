import { Button, ButtonGroup, Page } from "@shopify/polaris";
import React from "react";

const ProductPage = () => {
  return (
    <Page title="Example app">
      <ButtonGroup>
        <Button>Cancel</Button>
        <Button variant="primary">Save</Button>
      </ButtonGroup>
    </Page>
  );
};

export default ProductPage;
