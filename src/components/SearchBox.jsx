import React from "react";
import { FormControl } from "react-bootstrap";

const SEARCH_BOX_STYLE = {
  margin: "1rem 0 1rem 0.5rem"
};

const SEARCH_BOX_PLACEHOLDER = "Search for a product";

export default function SearchBox({ value, onSearchChange }) {
  return (
    <FormControl
      type="text"
      placeholder={SEARCH_BOX_PLACEHOLDER}
      className=" mr-sm-2"
      value={value}
      onChange={onSearchChange}
      style={SEARCH_BOX_STYLE}
    />
  );
}

SearchBox.defaultProps = {
  value: "",
  onSearchChange: () => {}
};
