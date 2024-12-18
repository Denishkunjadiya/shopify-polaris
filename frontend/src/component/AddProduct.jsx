import React from "react";

import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import {
  // Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Card,
  FormLayout,
  InlineStack,
  Label,
  Layout,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
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
                <Text as="p" variant="bodyMd">
                  View a summary of your online store’s performance.
                </Text>
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
