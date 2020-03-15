import React from "react";
import { FormControl } from "react-bootstrap";

const SEARCH_BOX_PLACEHOLDER = "Search for a product";

export default function SearchBox({ value, onSearchChange }) {
  return (
    <FormControl
      type="text"
      className="m-3"
      placeholder={SEARCH_BOX_PLACEHOLDER}
      value={value}
      onChange={onSearchChange}
    />
  );
}

SearchBox.defaultProps = {
  value: "",
  onSearchChange: () => {}
};
