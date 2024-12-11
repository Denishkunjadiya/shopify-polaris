import {
  TextField,
  IndexTable,
  LegacyCard,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Text,
  ChoiceList,
  RangeSlider,
  Badge,
  useBreakpoints,
  Link,
  Page,
  Button,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
const ProductPage = () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // save filters list
  const [itemStrings, setItemStrings] = useState([
    "All",
    "Active",
    "Draft",
    "Archived",
  ]);

  const deleteView = (index) => {
    const newItemStrings = [...itemStrings];
    newItemStrings.splice(index, 1);
    setItemStrings(newItemStrings);
    setSelected(0);
  };

  const duplicateView = async (name) => {
    setItemStrings([...itemStrings, name]);
    setSelected(itemStrings.length);
    await sleep(1);
    return true;
  };

  const tabs = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => {},
    id: `${item}-${index}`,
    isLocked: index === 0,
    actions:
      index === 0
        ? []
        : [
            {
              type: "rename",
              onAction: () => {},
              onPrimaryAction: async (value) => {
                const newItemsStrings = tabs.map((item, idx) => {
                  if (idx === index) {
                    return value;
                  }
                  return item.content;
                });
                await sleep(1);
                setItemStrings(newItemsStrings);
                return true;
              },
            },
            {
              type: "duplicate",
              onPrimaryAction: async (value) => {
                await sleep(1);
                duplicateView(value);
                return true;
              },
            },
            {
              type: "edit",
            },
            {
              type: "delete",
              onPrimaryAction: async () => {
                await sleep(1);
                deleteView(index);
                return true;
              },
            },
          ],
  }));

  const [selected, setSelected] = useState(0);
  const onCreateNewView = async (value) => {
    await sleep(500);
    setItemStrings([...itemStrings, value]);
    setSelected(itemStrings.length);
    return true;
  };

  const sortOptions = [
    { label: "Product", value: "product asc", directionLabel: "Ascending" },
    { label: "Product", value: "product desc", directionLabel: "Descending" },
    { label: "Status", value: "status asc", directionLabel: "A-Z" },
    { label: "Status", value: "status desc", directionLabel: "Z-A" },
    {
      label: "Sales channels",
      value: "salesChannels asc",
      directionLabel: "A-Z",
    },
    {
      label: "Sales channels",
      value: "salesChannels desc",
      directionLabel: "Z-A",
    },
    { label: "Type", value: "type asc", directionLabel: "A-Z" },
    { label: "Type", value: "type desc", directionLabel: "Z-A" },
    { label: "vendor", value: "vendor asc", directionLabel: "Ascending" },
    { label: "vendor", value: "vendor desc", directionLabel: "Descending" },
  ];

  const [sortSelected, setSortSelected] = useState(["product asc"]);
  const { mode, setMode } = useSetIndexFiltersMode();
  const onHandleCancel = () => {};

  const onHandleSave = async () => {
    await sleep(1);
    return true;
  };

  const primaryAction =
    selected === 0
      ? {
          type: "save-as",
          onAction: onCreateNewView,
          disabled: false,
          loading: false,
        }
      : {
          type: "save",
          onAction: onHandleSave,
          disabled: false,
          loading: false,
        };

  const [accountStatus, setAccountStatus] = useState(undefined);
  const [moneySpent, setMoneySpent] = useState(undefined);
  const [taggedWith, setTaggedWith] = useState("");
  const [queryValue, setQueryValue] = useState("");

  const handleAccountStatusChange = useCallback(
    (value) => setAccountStatus(value),
    []
  );
  const handleMoneySpentChange = useCallback(
    (value) => setMoneySpent(value),
    []
  );
  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    []
  );
  const handleFiltersQueryChange = useCallback(
    (value) => setQueryValue(value),
    []
  );
  const handleAccountStatusRemove = useCallback(
    () => setAccountStatus(undefined),
    []
  );
  const handleMoneySpentRemove = useCallback(
    () => setMoneySpent(undefined),
    []
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(""), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);

  const handleFiltersClearAll = useCallback(() => {
    handleAccountStatusRemove();
    handleMoneySpentRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [
    handleAccountStatusRemove,
    handleMoneySpentRemove,
    handleQueryValueRemove,
    handleTaggedWithRemove,
  ]);

  const filters = [
    {
      key: "accountStatus",
      label: "Account status",
      filter: (
        <ChoiceList
          title="Account status"
          titleHidden
          choices={[
            { label: "Enabled", value: "enabled" },
            { label: "Not invited", value: "not invited" },
            { label: "Invited", value: "invited" },
            { label: "Declined", value: "declined" },
          ]}
          selected={accountStatus || []}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: "taggedWith",
      label: "Tagged with",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: "moneySpent",
      label: "Money spent",
      filter: (
        <RangeSlider
          label="Money spent is between"
          labelHidden
          value={moneySpent || [0, 500]}
          prefix="$"
          output
          min={0}
          max={2000}
          step={1}
          onChange={handleMoneySpentChange}
        />
      ),
    },
  ];

  const appliedFilters = [];
  appliedFilters["appliedFilters"] = [];

  if (accountStatus && !isEmpty(accountStatus)) {
    const key = "accountStatus";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, accountStatus),
      onRemove: handleAccountStatusRemove,
    });
  }

  if (moneySpent) {
    const key = "moneySpent";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, moneySpent),
      onRemove: handleMoneySpentRemove,
    });
  }

  if (!isEmpty(taggedWith)) {
    const key = "taggedWith";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, taggedWith),
      onRemove: handleTaggedWithRemove,
    });
  }

  const data = [
    {
      id: 1,
      title: "The Minimal Snowboard",
      status: "ACTIVE",
      Category: "",
      Type: "",
      vendor: "denishk.devesha",
    },
    {
      id: 2,
      title: "Selling Plans Ski Wax",
      status: "ACTIVE",
      Category: "",
      Type: "accessories",
      vendor: "denishk.devesha",
    },
    {
      id: 3,
      title: "Gift Card",
      status: "ACTIVE",
      Category: "Gift Cards",
      Type: "giftcard",
      vendor: "Snowboard Vendor",
    },
    {
      id: 4,
      title: "The Inventory Not Tracked Snowboard",
      status: "ACTIVE",
      Category: "",
      Type: "snowboard",
      vendor: "denishk.devesha",
    },
    {
      id: 1,
      title: "The Complete Snowboard",
      status: "ACTIVE",
      Category: "",
      Type: "snowboard",
      vendor: "Snowboard Vendor",
    },
    {
      id: 1,
      title: "The Compare at Price Snowboard",
      status: "ACTIVE",
      Category: "",
      Type: "snowboard",
      vendor: "denishk.devesha",
    },
    {
      id: 1,
      title: "The Draft Snowboard",
      status: "DRAFT",
      Category: "",
      Type: "snowboard",
      vendor: "Snowboard Vendor",
    },
    {
      id: 1,
      title: "The Out of Stock Snowboard",
      status: "ACTIVE",
      Category: "",
      Type: "snowboard",
      vendor: "denishk.devesha",
    },
    {
      id: 1,
      title: "The Collection Snowboard: Hydrogen",
      status: "ACTIVE",
      Category: "",
      Type: "snowboard",
      vendor: "Hydrogen Vendor",
    },
    {
      id: 1,
      title: "The Hidden Snowboard",
      status: "ACTIVE",
      Category: "",
      Type: "snowboard",
      vendor: "Snowboard Vendor",
    },
    {
      id: 1,
      title: "The Archived Snowboard",
      status: "ARCHIVED",
      Category: "",
      Type: "snowboard",
      vendor: "Snowboard Vendor",
    },
    {
      id: 1,
      title: "The Videographer Snowboard",
      status: "ACTIVE",
      Category: "",
      Type: "snowboard",
      vendor: "denishk.devesha",
    },
    {
      id: 1,
      title: "The Multi-location Snowboard",
      status: "ACTIVE",
      Category: "",
      Type: "snowboard",
      vendor: "denishk.devesha",
    },
    {
      id: 1,
      title: "The Collection Snowboard: Oxygen",
      status: "ACTIVE",
      Category: "",
      Type: "snowboard",
      vendor: "Hydrogen Vendor",
    },
    {
      id: 1,
      title: "The 3p Fulfilled Snowboard",
      status: "ACTIVE",
      Category: "",
      Type: "snowboard",
      vendor: "denishk.devesha",
    },
    {
      id: 1,
      title: "The Multi-managed Snowboard",
      status: "ACTIVE",
      Category: "",
      Type: "snowboard",
      vendor: "Multi-managed Vendor",
    },
    {
      id: 1,
      title: "The Collection Snowboard: Liquid",
      status: "ACTIVE",
      Category: "",
      Type: "snowboard",
      vendor: "Hydrogen Vendor",
    },
  ];

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(data);

  const rowMarkup = data.map(({ title, status, Type, vendor }, index) => (
    <IndexTable.Row
      id={index}
      key={index}
      selected={selectedResources.includes(index)}
      position={index}
    >
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="bold" as="span">
          {title}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>{status}</IndexTable.Cell>
      <IndexTable.Cell>{Type}</IndexTable.Cell>
      <IndexTable.Cell></IndexTable.Cell>
      <IndexTable.Cell></IndexTable.Cell>
      <IndexTable.Cell></IndexTable.Cell>
      <IndexTable.Cell></IndexTable.Cell>
      <IndexTable.Cell>{vendor}</IndexTable.Cell>
    </IndexTable.Row>
  ));

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

  function disambiguateLabel(key, value) {
    switch (key) {
      case "moneySpent":
        return `Money spent is between $${value[0]} and $${value[1]}`;
      case "taggedWith":
        return `Tagged with ${value}`;
      case "accountStatus":
        return value.map((val) => `Customer ${val}`).join(", ");
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }

  return (
    <Page
      title="Products"
      primaryAction={{
        content: "Add product",
        helpText: "Add product",
        onAction: (e) => {},
      }}
      secondaryActions={[
        {
          content: "Export",
          helpText: "Export",
        },
        {
          content: "Import",
          helpText: "Import",
        },
      ]}
    >
      <LegacyCard>
        <IndexFilters
          // sort
          sortOptions={sortOptions}
          sortSelected={sortSelected}
          onSort={setSortSelected}
          // search
          queryValue={queryValue}
          queryPlaceholder="Searching in all products"
          onQueryChange={handleFiltersQueryChange}
          onQueryClear={() => setQueryValue("")}
          primaryAction={primaryAction}
          cancelAction={{
            onAction: onHandleCancel,
            disabled: false,
            loading: false,
          }}
          tabs={tabs}
          selected={selected}
          onSelect={setSelected}
          canCreateNewView
          onCreateNewView={onCreateNewView}
          // filters
          filters={filters}
          appliedFilters={appliedFilters}
          onClearAll={handleFiltersClearAll}
          mode={mode}
          setMode={setMode}
        />
        <IndexTable
          condensed={useBreakpoints().smDown}
          resourceName={resourceName}
          itemCount={data.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "Product" },
            { title: "Status" },
            { title: "Inventory" },
            { title: "Sales channels", alignment: "end" },
            { title: "B2B catalogs", alignment: "end" },
            { title: "Category" },
            { title: "Type" },
            { title: "Vendor" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
    </Page>
  );
};

export default ProductPage;
