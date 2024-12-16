import {
  Badge,
  Card,
  ChoiceList,
  Image,
  IndexFilters,
  IndexTable,
  Page,
  RangeSlider,
  Text,
  TextField,
  useBreakpoints,
  useIndexResourceState,
  useSetIndexFiltersMode,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "./data.json";

const ProductPage = () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const navigate = useNavigate();
  const [sortedData, setSortedData] = useState(data);

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

  const [sortSelected, setSortSelected] = useState(["product asc"]);

  const sortOptions = [
    { label: "Product", value: "product asc", directionLabel: "A-Z" },
    { label: "Product", value: "product desc", directionLabel: "Z-A" },
    { label: "Status", value: "status asc", directionLabel: "A-Z" },
    { label: "Status", value: "status desc", directionLabel: "Z-A" },
    { label: "Inventory", value: "inventory asc", directionLabel: "A-Z" },
    { label: "Inventory", value: "inventory desc", directionLabel: "Z-A" },
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
    { label: "B2B catalogs", value: "b2BCatalogs asc", directionLabel: "A-Z" },
    { label: "B2B catalogs", value: "b2BCatalogs desc", directionLabel: "Z-A" },
    { label: "Category", value: "category asc", directionLabel: "A-Z" },
    { label: "Category", value: "category desc", directionLabel: "Z-A" },
    { label: "Type", value: "type asc", directionLabel: "A-Z" },
    { label: "Type", value: "type desc", directionLabel: "Z-A" },
    { label: "vendor", value: "vendor asc", directionLabel: "A-Z" },
    { label: "vendor", value: "vendor desc", directionLabel: "Z-A" },
  ];

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

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(data);

  const rowMarkup = sortedData.map(
    ({
      id,
      product,
      status,
      inventory,
      salesChannels,
      B2BCatalogs,
      category,
      type,
      vendor,
      image,
    }) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={id}
        onClick={() => console.log({ id })}
      >
        <IndexTable.Cell>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              height={30}
              width={30}
              style={{ marginRight: "10px" }}
              src={image}
              alt=""
            />
            <Text variant="bodyMd" as="span">
              {product}
            </Text>
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Badge tone={getStatus(status)}>{status}</Badge>
        </IndexTable.Cell>
        <IndexTable.Cell>{inventory}</IndexTable.Cell>
        <IndexTable.Cell>{salesChannels}</IndexTable.Cell>
        <IndexTable.Cell>{B2BCatalogs}</IndexTable.Cell>
        <IndexTable.Cell>{category}</IndexTable.Cell>
        <IndexTable.Cell>{type}</IndexTable.Cell>
        <IndexTable.Cell>{vendor}</IndexTable.Cell>
      </IndexTable.Row>
    )
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

  const handleSortChange = (sortValue) => {
    const [field, direction] = sortValue[0].split(" ");
    const sorted = [...data].sort((a, b) => {
      if (direction === "asc") {
        return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
      } else {
        return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
      }
    });

    setSortedData(sorted);
    setSortSelected(sortValue);
  };

  const handleSortToggle = (index) => {
    const sortKeys = [
      "product",
      "status",
      "inventory",
      "salesChannels",
      "B2BCatalogs",
      "category",
      "type",
      "vendor",
    ];
    const key = sortKeys[index];
    handleSortChange([
      sortSelected[0] === `${key} asc` ? `${key} desc` : `${key} asc`,
    ]);
  };

  const getColumnIndex = () => {
    const columnList = [
      "product",
      "status",
      "inventory",
      "salesChannels",
      "B2BCatalogs",
      "category",
      "type",
      "vendor",
    ];
    if (!sortSelected || sortSelected.length === 0) return -1;
    const [field] = sortSelected[0].split(" ");
    return columnList.findIndex((item) => item === field);
  };

  return (
    <Page
      title="Products"
      primaryAction={{
        content: "Add product",
        helpText: "Add product",
        onAction: () => navigate("/add"),
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
      <Card>
        <IndexFilters
          // sort
          sortOptions={sortOptions}
          sortSelected={sortSelected}
          onSort={handleSortChange}
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
          resourceName={{
            singular: "product",
            plural: "products",
          }}
          itemCount={data.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          onSort={handleSortToggle}
          sortable={[true, false, true, false, false, false, true, true]}
          sortDirection={
            sortSelected[0].split(" ")[1] === "asc" ? "ascending" : "descending"
          }
          sortColumnIndex={getColumnIndex()}
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
      </Card>
    </Page>
  );
};

export default ProductPage;
