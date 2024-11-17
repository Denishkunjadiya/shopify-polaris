import { DataTable, LegacyCard, Link, Page } from "@shopify/polaris";
import React, { useCallback, useState } from "react";

const ProductPage = () => {
  const [sortedRows, setSortedRows] = useState(null);

  const initiallySortedRows = [
    [
      <Link removeUnderline url="/add">
        Emerald Silk Gown
      </Link>,
      "$875.00",
      124689,
      140,
      "$122,500.00",
    ],
    ["Emerald Silk Gown", "$875.00", 124689, 140, "$122,500.00"],
    ["Mauve Cashmere Scarf", "$230.00", 124533, 83, "$19,090.00"],
    [
      "Navy Merino Wool Blazer with khaki chinos and yellow belt",
      "$445.00",
      124518,
      32,
      "$14,240.00",
    ],
  ];

  const rows = sortedRows ? sortedRows : initiallySortedRows;

  const sortArray = (rows, index, direction) => {
    return [...rows].sort((rowA, rowB) => {
      const amountA = (rowA[index] || "").toString();
      const amountB = (rowB[index] || "").toString();

      if (typeof amountA === "number") {
        return direction === "descending"
          ? amountB - amountA
          : amountA - amountB;
      } else if (typeof amountA === "string") {
        return direction === "descending"
          ? amountB.localeCompare(amountA)
          : amountA.localeCompare(amountB);
      }
    });
  };

  const handleSort = useCallback(
    (index, direction) => setSortedRows(sortArray(rows, index, direction)),
    [rows]
  );

  return (
    <Page title="Products">
      <LegacyCard>
        <DataTable
          columnContentTypes={[
            "text",
            "numeric",
            "numeric",
            "numeric",
            "numeric",
          ]}
          sortable={[true, false, false, false, false]}
          defaultSortDirection="descending"
          initialSortColumnIndex={4}
          headings={[
            "Product",
            "Price",
            "SKU Number",
            "Net quantity",
            "Net sales",
          ]}
          stickyHeader
          rows={rows}
          onSort={handleSort}
        />
      </LegacyCard>
    </Page>
  );
};

export default ProductPage;
