import { useCallback, useState } from "react";

import { BlockStack, DropZone, Thumbnail } from "@shopify/polaris";
import { NoteIcon } from "@shopify/polaris-icons";

export default function ImageUpload() {
  const [file, setFile] = useState();

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => setFile(acceptedFiles[0]),
    [],
  );

  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

  const fileUpload = !file && <DropZone.FileUpload />;
  const uploadedFile = file && (
    <BlockStack>
      <Thumbnail
        size="small"
        alt={file.name}
        source={
          validImageTypes.includes(file.type)
            ? window.URL.createObjectURL(file)
            : NoteIcon
        }
      />
      <div>
        {file.name}{" "}
        {/* <Text variant="bodySm" as="p">
          {file.size} bytes
        </Text> */}
      </div>
    </BlockStack>
  );

  return (
    <DropZone
      label="Media"
      type="image"
      allowMultiple={false}
      onDrop={handleDropZoneDrop}
    >
      {uploadedFile}
      {fileUpload}
    </DropZone>
  );
}
