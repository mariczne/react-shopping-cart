import { FormControl } from "react-bootstrap";

const SEARCH_BOX_PLACEHOLDER = "Search for a product";

export interface SearchBoxProps {
  value: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ value, onSearchChange }: SearchBoxProps) {
  return (
    <FormControl
      type="search"
      className="m-3"
      placeholder={SEARCH_BOX_PLACEHOLDER}
      value={value}
      onChange={onSearchChange}
    />
  );
}
