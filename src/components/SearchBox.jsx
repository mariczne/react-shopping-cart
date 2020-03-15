import React from "react";
import { FormControl } from "react-bootstrap";

export default function SearchBox({ value, onSearchChange }) {
  return (
    <FormControl
      type="text"
      placeholder="Search"
      className=" mr-sm-2"
      value={value}
      onChange={onSearchChange}
      style={SEARCH_BOX_STYLE}
    />
  );
}

const SEARCH_BOX_STYLE = {
  margin: "1rem 0 1rem 0.5rem"
}