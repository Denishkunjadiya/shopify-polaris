import React from "react";

import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import {
  Autocomplete,
  Badge,
  Bleed,
  // Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Combobox,
  Divider,
  FormLayout,
  Icon,
  InlineGrid,
  InlineStack,
  Label,
  Layout,
  LegacyStack,
  Page,
  Select,
  List as ShopifyList,
  Tag,
  Text,
  TextContainer,
  TextField,
} from "@shopify/polaris";
import { MenuHorizontalIcon } from "@shopify/polaris-icons";
import {
  Bold,
  ClassicEditor,
  Context,
  ContextWatchdog,
  Essentials,
  Italic,
  List,
  Paragraph,
} from "ckeditor5";
import { Form, useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import CommonAutocomplete from "./commonComponent/CommonAutocomplate";
import CommonCombobox from "./commonComponent/CommonCombobox";
import ImageUpload from "./commonComponent/ImageUpload";

import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import "ckeditor5/ckeditor5.css";

const AddProduct = () => {
  const navigate = useNavigate();

  const getStatus = (key) => {
    switch (key) {
      case "Active":
        return "success";
      case "Archived":
        return "complete";
      case "Draft":
        return "info";
      default:
        break;
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      console.log("Form submitted");
    },
  });
  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    resetForm,
  } = formik;

  console.log({ errors, touched, values });

  const handleFieldChange = (fieldName) => (value) => {
    setFieldValue(fieldName, value);
  };

  return (
    <Page
      title="Add product"
      titleMetadata={<Badge tone={getStatus("Active")}>Paid</Badge>}
      //  narrowWidth
      secondaryActions={[
        {
          content: "Duplicate",
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Duplicate action"),
        },
        {
          content: "Preview",
          onAction: () => alert("View on your store action"),
        },
      ]}
      actionGroups={[
        {
          title: "Share",
          actions: [
            {
              content: "Share on Facebook",
              accessibilityLabel: "Individual action label",
              onAction: () => alert("Share on Facebook action"),
            },
          ],
        },
        {
          title: "More actions",
          actions: [
            {
              content: "Share on Facebook",
              accessibilityLabel: "Individual action label",
              onAction: () => alert("Share on Facebook action"),
            },
          ],
        },
      ]}
      backAction={{ onAction: () => navigate("/") }}
    >
      <form onSubmit={handleSubmit}>
        <Layout>
          <Layout.Section>
            <Card>
              <Box style={{ marginBottom: "15px" }}>
                <FormLayout>
                  <TextField
                    label="Title"
                    name="title"
                    onChange={handleFieldChange("title")}
                    value={values?.title}
                    onBlur={handleBlur}
                    placeholder="Enter title"
                    autoComplete="off"
                    error={touched?.title && errors?.title}
                  />
                </FormLayout>
              </Box>
              <Box style={{ marginBottom: "15px" }}>
                <Label>Description</Label>
                <Box
                  style={{
                    border: "1px solid #999",
                    marginTop: "5px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <CKEditorContext
                    context={Context}
                    contextWatchdog={ContextWatchdog}
                    onChangeInitializedEditors={(editors) => {
                      // console.info(
                      //   editors.editor1?.instance,
                      //   editors.editor1?.yourAdditionalData,
                      // );
                    }}
                  >
                    <CKEditor
                      editor={ClassicEditor}
                      config={{
                        plugins: [Essentials, Bold, Italic, Paragraph, List],
                        toolbar: [
                          "undo",
                          "redo",
                          "|",
                          "bold",
                          "italic",
                          "bulletedList",
                          "numberedList",
                        ],
                      }}
                      data="<p>Hello from the first editor working with the context!</p>"
                      contextItemMetadata={{
                        name: "editor1",
                        yourAdditionalData: 2,
                      }}
                      onReady={(editor) => {
                        // console.log("Editor 1 is ready to use!", editor);
                      }}
                    />
                  </CKEditorContext>
                </Box>
              </Box>
              <Box style={{ marginBottom: "15px" }}>
                <FormLayout>
                  <ImageUpload />
                </FormLayout>
              </Box>
              <Box style={{ marginBottom: "15px" }}>
                <FormLayout>
                  <CommonAutocomplete />
                </FormLayout>
              </Box>
            </Card>

            <Box style={{ marginTop: "15px" }}>
              <Card>
                <Text as="h2" variant="headingSm">
                  Pricing
                </Text>
                <Box paddingBlockStart="200">
                  <InlineGrid gap="400" columns={{ xs: 1, md: 3 }}>
                    <TextField
                      label="Price"
                      type="number"
                      name="price"
                      onChange={handleFieldChange("price")}
                      value={values?.price}
                      onBlur={handleBlur}
                      error={touched?.price && errors?.price}
                      prefix="₹"
                      autoComplete="off"
                    />
                    <TextField
                      label="Compare-at price"
                      type="number"
                      name="compareAtPrice"
                      onChange={handleFieldChange("compareAtPrice")}
                      value={values?.compareAtPrice}
                      onBlur={handleBlur}
                      error={touched?.compareAtPrice && errors?.compareAtPrice}
                      prefix="₹"
                      autoComplete="off"
                    />
                  </InlineGrid>

                  <Box paddingBlock="200">
                    <Checkbox
                      label="Charge tax on this product"
                      name="chargeTaxOnThisProduct"
                      onChange={handleFieldChange("chargeTaxOnThisProduct")}
                      checked={values?.chargeTaxOnThisProduct}
                      error={
                        touched?.chargeTaxOnThisProduct &&
                        errors?.chargeTaxOnThisProduct
                      }
                    />
                  </Box>
                </Box>
                <Bleed marginInline="400">
                  <Divider borderColor="border" />
                </Bleed>
                <Box paddingBlockStart="200">
                  <InlineGrid gap="400" columns={{ xs: 1, md: 3 }}>
                    <TextField
                      label="Cost per item"
                      type="number"
                      name="costPerItem"
                      onChange={handleFieldChange("costPerItem")}
                      value={values?.costPerItem}
                      onBlur={handleBlur}
                      error={touched?.costPerItem && errors?.costPerItem}
                      prefix="₹"
                      autoComplete="off"
                    />
                    <TextField
                      label="Profit"
                      name="profit"
                      onChange={handleFieldChange("profit")}
                      value={values?.profit}
                      onBlur={handleBlur}
                      error={touched?.profit && errors?.profit}
                      prefix="₹"
                      autoComplete="off"
                    />
                    <TextField
                      suffix="%"
                      label="Margin"
                      name="profitInPercentage"
                      onChange={handleFieldChange("profitInPercentage")}
                      value={values?.profitInPercentage}
                      onBlur={handleBlur}
                      error={
                        touched?.profitInPercentage &&
                        errors?.profitInPercentage
                      }
                      autoComplete="off"
                    />
                  </InlineGrid>
                </Box>
              </Card>
            </Box>

            <Box style={{ marginTop: "15px" }}>
              <Card>
                <Text as="h2" variant="headingSm">
                  Inventory
                </Text>
                <Box paddingBlockStart="200">
                  <Checkbox
                    label="Track quantity"
                    name="trackQuantity"
                    onChange={handleFieldChange("trackQuantity")}
                    checked={values?.trackQuantity}
                    error={touched?.trackQuantity && errors?.trackQuantity}
                  />
                </Box>
                <Box paddingBlockStart="200">
                  <InlineGrid columns="1fr auto">
                    <Text as="h3" variant="headingSm" fontWeight="medium">
                      Quantity
                    </Text>
                    {/* <Button variant="plain">Edit locations</Button> */}
                  </InlineGrid>
                </Box>

                <Box paddingBlock="200">
                  <Bleed marginInline="400">
                    <Divider borderColor="border" />
                  </Bleed>
                </Box>

                <Box paddingBlock="200">
                  <InlineGrid columns="1fr auto">
                    <Text as="h3" variant="headingSm" fontWeight="medium">
                      My Custom Location
                    </Text>
                    <TextField
                      placeholder={0}
                      type="number"
                      min={0}
                      name="myCustomLocation"
                      onChange={handleFieldChange("myCustomLocation")}
                      value={values?.myCustomLocation}
                      onBlur={handleBlur}
                      error={
                        touched?.myCustomLocation && errors?.myCustomLocation
                      }
                    />
                  </InlineGrid>
                </Box>
                <Box paddingBlock="200">
                  <InlineGrid columns="1fr auto">
                    <Text as="h3" variant="headingSm" fontWeight="medium">
                      Shop location
                    </Text>
                    <TextField
                      placeholder={0}
                      type="number"
                      min={0}
                      name="shopLocation"
                      onChange={handleFieldChange("shopLocation")}
                      value={values?.shopLocation}
                      onBlur={handleBlur}
                      error={touched?.shopLocation && errors?.shopLocation}
                    />
                  </InlineGrid>
                </Box>

                <Box paddingBlock="200">
                  <Checkbox
                    label="Continue selling when out of stock"
                    helpText="This won't affect Shopify POS. Staff will see a warning, but can complete sales when available inventory reaches zero and below."
                    name="continueSellingWhenOutOfStock"
                    onChange={handleFieldChange(
                      "continueSellingWhenOutOfStock",
                    )}
                    checked={values?.continueSellingWhenOutOfStock}
                    error={
                      touched?.continueSellingWhenOutOfStock &&
                      errors?.continueSellingWhenOutOfStock
                    }
                  />
                </Box>

                <Box paddingBlock="200">
                  <InlineGrid gap="400" columns={{ xs: 1, md: 2 }}>
                    <TextField
                      label="SKU (Stock Keeping Unit)"
                      name="skuStockKeepingUnit"
                      onChange={handleFieldChange("skuStockKeepingUnit")}
                      value={values?.skuStockKeepingUnit}
                      onBlur={handleBlur}
                      error={
                        touched?.skuStockKeepingUnit &&
                        errors?.skuStockKeepingUnit
                      }
                    />
                    <TextField
                      label="Barcode (ISBN, UPC, GTIN, etc.)"
                      name="barcode"
                      onChange={handleFieldChange("barcode")}
                      value={values?.barcode}
                      onBlur={handleBlur}
                      error={touched?.barcode && errors?.barcode}
                    />
                  </InlineGrid>
                </Box>
              </Card>
            </Box>

            <Box style={{ marginTop: "15px" }}>
              <Card>
                <Text as="h2" variant="headingSm">
                  Shipping
                </Text>
                <Box paddingBlockStart="200">
                  <Checkbox
                    label="This is a physical product"
                    name="physicalProduct"
                    onChange={handleFieldChange("physicalProduct")}
                    checked={values?.physicalProduct}
                    error={touched?.physicalProduct && errors?.physicalProduct}
                  />
                </Box>
                <Box paddingBlockStart="200">
                  <InlineGrid gap="400" columns={{ xs: 2, md: 3 }}>
                    <TextField
                      label="Weight"
                      type="number"
                      name="weight"
                      onChange={handleFieldChange("weight")}
                      value={values?.weight}
                      onBlur={handleBlur}
                      error={touched?.weight && errors?.weight}
                      autoComplete="off"
                      connectedRight={
                        <Select
                          value={"kg"}
                          label="Weight unit"
                          // onChange={handleSelectChange}
                          labelHidden
                          options={["kg", "lb", "oz", "g"]}
                        />
                      }
                    />
                  </InlineGrid>
                </Box>

                {/* <Box paddingBlock="200">
                <Bleed marginInline="400">
                  <Divider borderColor="border" />
                </Bleed>
              </Box>
               <Box paddingBlock="200">
                <Select
                  // value="Azerbaijan"
                  label="Country/Region of origin"
                  // onChange={handleSelectChange}
                  options={["Azerbaijan", "Aurba", "Austria"]}
                />
              </Box>
              <Box paddingBlock="200">
                <TextField
                  prefix={<Icon source={SearchIcon} />}
                  // value="Azerbaijan"
                  label="Harmonized System (HS) code"
                  // onChange={handleSelectChange}
                />
              </Box> */}
              </Card>
            </Box>

            {/* <Box style={{ marginTop: "15px" }}>
            <Card>
              <Text as="h2" variant="headingSm">
                Variants
              </Text>
              <Box paddingBlockStart="200"></Box>
            </Card>
          </Box> */}

            <Box style={{ marginTop: "15px" }}>
              <Card>
                <Text as="h2" variant="headingSm">
                  Metafields
                </Text>
                <Box paddingBlockStart="200">
                  <InlineGrid columns="1fr auto">
                    <Text as="h3" variant="headingSm" fontWeight="medium">
                      Snowboard length
                    </Text>
                    <TextField
                      placeholder={0}
                      name="snowboardLength"
                      onChange={handleFieldChange("snowboardLength")}
                      value={values?.snowboardLength}
                      onBlur={handleBlur}
                      error={
                        touched?.snowboardLength && errors?.snowboardLength
                      }
                    />
                  </InlineGrid>
                </Box>

                <Box paddingBlockStart="200">
                  <InlineGrid columns="1fr auto">
                    <Text as="h3" variant="headingSm" fontWeight="medium">
                      Snowboard binding mount
                    </Text>
                    <TextField
                      placeholder={0}
                      name="snowboardBindingMount"
                      onChange={handleFieldChange("snowboardBindingMount")}
                      value={values?.snowboardBindingMount}
                      onBlur={handleBlur}
                      error={
                        touched?.snowboardBindingMount &&
                        errors?.snowboardBindingMount
                      }
                    />
                  </InlineGrid>
                </Box>
              </Card>
            </Box>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card title="Tags">
              <Select
                label="Status"
                options={["Active", "Draft"]}
                // onChange={handleSelectChange}
                // value={selected}
              />
            </Card>

            <Box paddingBlockStart="200">
              <Card title="Tags">
                <Box paddingBlockStart="200">
                  <InlineGrid columns="1fr auto">
                    <Text as="h2" variant="headingSm">
                      Publishing
                    </Text>
                    <Button
                      icon={<Icon source={MenuHorizontalIcon} />}
                      variant="plain"
                      onClick={() => {}}
                      accessibilityLabel="Preview"
                    />
                  </InlineGrid>
                </Box>
                <Box paddingBlockStart="200">
                  <ShopifyList type="bullet">
                    <ShopifyList.Item>Online Store</ShopifyList.Item>
                    <ShopifyList.Item>Point of Sale</ShopifyList.Item>
                    Point of Sale has not been set up. Finish the remaining
                    steps to start selling in person.
                  </ShopifyList>
                </Box>
              </Card>
            </Box>

            <Box paddingBlockStart="200">
              <Card title="Tags">
                <Text as="h2" variant="headingSm">
                  Product organization
                </Text>
                <Box paddingBlockStart="200">
                  <Select
                    label="Product organization"
                    options={["accessories", "giftcard", "snowboard"]}
                    // onChange={handleSelectChange}
                    // value={selected}
                  />
                </Box>
                <Box paddingBlockStart="200">
                  <Select
                    label="Vendor"
                    options={["Vendor 1", "Vendor 2", "Vendor 3"]}
                    // onChange={handleSelectChange}
                    // value={selected}
                  />
                </Box>
                <Box paddingBlockStart="200">
                  <CommonCombobox />
                  {/*  options={["Collection 1", "Collection 2", "Collection 3"]} */}
                </Box>
                <Box paddingBlockStart="200">
                  <CommonCombobox />
                </Box>
              </Card>
            </Box>
          </Layout.Section>
        </Layout>

        {/* Footer */}
        <InlineStack align="end">
          <ButtonGroup>
            <Button onClick={resetForm} accessibilityLabel="Cancel">
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              accessibilityLabel="Save"
            >
              Save
            </Button>
          </ButtonGroup>
        </InlineStack>
      </form>
    </Page>
  );
};

export default AddProduct;
