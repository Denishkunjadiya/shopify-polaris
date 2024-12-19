import React from "react";

import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import {
  Bleed,
  // Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Divider,
  FormLayout,
  InlineGrid,
  InlineStack,
  Label,
  Layout,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
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

import CommonAutocomplete from "./CommonAutocomplate";
import ImageUpload from "./ImageUpload";

import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import "ckeditor5/ckeditor5.css";

const AddProduct = () => {
  const navigate = useNavigate();

  return (
    <Page
      title="Add product"
      //  narrowWidth
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
                <InlineGrid
                  gap="400"
                  columns={{ xs: 1, md: 3 }}
                  // columns={3}
                >
                  <TextField
                    label="Cost per item"
                    type="number"
                    value={0.0}
                    // onChange={handleChange}
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
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <Card title="Tags">
            <p>Add tags to your order.</p>
          </Card>
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
