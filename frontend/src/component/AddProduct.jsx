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
      <Layout>
        <Layout.Section>
          <Card>
            <Box style={{ marginBottom: "15px" }}>
              <FormLayout>
                <TextField
                  label="Title"
                  placeholder="Enter title"
                  // onChange={() => {}}
                  autoComplete="off"
                  error="Store name is required"
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
                    console.info(
                      editors.editor1?.instance,
                      editors.editor1?.yourAdditionalData,
                    );
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
                      console.log("Editor 1 is ready to use!", editor);
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
                    value={0.0}
                    // onChange={handleChange}
                    prefix="₹"
                    autoComplete="off"
                  />
                  <TextField
                    label="Compare-at price"
                    type="number"
                    value={0.0}
                    // onChange={handleChange}
                    prefix="₹"
                    autoComplete="off"
                  />
                </InlineGrid>

                <Box paddingBlock="200">
                  <Checkbox
                    label="Charge tax on this product"
                    // checked={checked}
                    // onChange={handleChange}
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
                    value={0.0}
                    prefix="₹"
                    autoComplete="off"
                  />
                  <TextField
                    label="Profit"
                    value={"--"}
                    prefix="₹"
                    autoComplete="off"
                  />
                  <TextField
                    suffix="%"
                    label="Margin"
                    value={"--"}
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
                <Checkbox label="Track quantity" />
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
                    // onChange={() => {}}
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
                    // onChange={() => {}}
                  />
                </InlineGrid>
              </Box>

              <Box paddingBlock="200">
                <Checkbox
                  label="Continue selling when out of stock"
                  helpText="This won't affect Shopify POS. Staff will see a warning, but can complete sales when available inventory reaches zero and below."
                />
              </Box>

              <Box paddingBlock="200">
                <InlineGrid gap="400" columns={{ xs: 1, md: 2 }}>
                  <TextField label="SKU (Stock Keeping Unit)" />
                  <TextField label="Barcode (ISBN, UPC, GTIN, etc.)" />
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
                <Checkbox label="This is a physical product" />
              </Box>
              <Box paddingBlockStart="200">
                <InlineGrid gap="400" columns={{ xs: 2, md: 3 }}>
                  <TextField
                    label="Weight"
                    type="number"
                    value={0.0}
                    // onChange={handleTextFieldChange}
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
                    // onChange={() => {}}
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
                    // type="number"
                    // min={0}
                    // onChange={() => {}}
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
                  Point of Sale has not been set up. Finish the remaining steps
                  to start selling in person.
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
          <Button onClick={() => {}} accessibilityLabel="Cancel">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {}}
            accessibilityLabel="Save"
          >
            Save
          </Button>
        </ButtonGroup>
      </InlineStack>
    </Page>
  );
};

export default AddProduct;
