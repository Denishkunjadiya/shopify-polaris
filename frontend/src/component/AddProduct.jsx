import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import {
  Bold,
  ClassicEditor,
  Context,
  ContextWatchdog,
  Essentials,
  Italic,
  Paragraph,
} from "ckeditor5";
import React from "react";

import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import "ckeditor5/ckeditor5.css";

const AddProduct = () => {
  return (
    <CKEditorContext
      context={Context}
      contextWatchdog={ContextWatchdog}
      onChangeInitializedEditors={(editors) => {
        console.info(
          editors.editor1?.instance,
          editors.editor1?.yourAdditionalData
        );
      }}
    >
      <CKEditor
        editor={ClassicEditor}
        config={{
          plugins: [Essentials, Bold, Italic, Paragraph],
          toolbar: ["undo", "redo", "|", "bold", "italic"],
        }}
        data="<p>Hello from the first editor working with the context!</p>"
        contextItemMetadata={{
          name: "editor1",
          yourAdditionalData: 2,
        }}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor 1 is ready to use!", editor);
        }}
      />
    </CKEditorContext>
  );
};

export default AddProduct;
