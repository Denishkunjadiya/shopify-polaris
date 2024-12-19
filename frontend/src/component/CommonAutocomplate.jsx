import React, { useCallback, useMemo, useState } from "react";

import { Autocomplete } from "@shopify/polaris";

const CommonAutocomplate = ({
  label = "Search",
  placeholder = "Search",
  optionsData = [
    { value: "rustic", label: "Rustic" },
    { value: "antique", label: "Antique" },
    { value: "vinyl", label: "Vinyl" },
    { value: "vintage", label: "Vintage" },
    { value: "refurbished", label: "Refurbished" },
  ],
  onSelectionChange = () => {},
}) => {
  const deselectedOptions = useMemo(() => optionsData, [optionsData]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const updateSelection = useCallback(
    (selected) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue[0] || "");
      onSelectionChange(selectedValue); // Notify parent about selection changes
    },
    [options, onSelectionChange],
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label={label}
      value={inputValue}
      placeholder={placeholder}
      helpText="Determines tax rates and adds metafields to improve search, filters, and cross-channel sales"
      autoComplete="off"
    />
  );

  return (
    <>
      <Autocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
      />
    </>
  );
};

export default CommonAutocomplate;
