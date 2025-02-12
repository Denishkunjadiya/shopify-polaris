import { useCallback, useMemo, useState } from "react";

import {
  AutoSelection,
  Box,
  Combobox,
  Icon,
  InlineStack,
  Listbox,
  Tag,
} from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";

export default function CommonCombobox({ formik, name, options: propOptions }) {
  const deselectedOptions = useMemo(
    () =>
      propOptions && propOptions.length > 0
        ? propOptions.map((item) => ({ value: item, label: item }))
        : [],
    [propOptions],
  );

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);

  // Get selected options from Formik
  const selectedOptions = formik.values[name] || [];

  const escapeSpecialRegExCharacters = useCallback(
    (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    [],
  );

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [deselectedOptions, escapeSpecialRegExCharacters],
  );

  const updateSelection = useCallback(
    (selected) => {
      let newSelectedOptions;

      if (selectedOptions.includes(selected)) {
        newSelectedOptions = selectedOptions.filter(
          (option) => option !== selected,
        );
      } else {
        newSelectedOptions = [...selectedOptions, selected];
      }

      formik.setFieldValue(name, newSelectedOptions);
      updateText("");
    },
    [selectedOptions, name, formik, updateText],
  );

  const removeTag = useCallback(
    (tag) => () => {
      const newOptions = selectedOptions.filter((option) => option !== tag);
      formik.setFieldValue(name, newOptions);
    },
    [selectedOptions, name, formik],
  );

  const tagsMarkup = selectedOptions.map((option) => (
    <Box style={{ margin: "5px" }} key={option}>
      <Tag key={`option-${option}`} onRemove={removeTag(option)}>
        {option}
      </Tag>
    </Box>
  ));

  const optionsMarkup =
    options.length > 0
      ? options.map(({ label, value }) => (
          <Listbox.Option
            key={value}
            value={value}
            selected={selectedOptions.includes(value)}
            accessibilityLabel={label}
          >
            {label}
          </Listbox.Option>
        ))
      : null;

  return (
    <>
      <Combobox
        allowMultiple
        activator={
          <Combobox.TextField
            prefix={<Icon source={SearchIcon} />}
            onChange={updateText}
            label="Search tags"
            value={inputValue}
            placeholder="Search tags"
            autoComplete="off"
          />
        }
      >
        {optionsMarkup && (
          <Listbox
            autoSelection={AutoSelection.None}
            onSelect={updateSelection}
          >
            {optionsMarkup}
          </Listbox>
        )}
      </Combobox>
      <div style={{ marginTop: "3px" }}>
        <InlineStack>{tagsMarkup}</InlineStack>
      </div>
    </>
  );
}
