import { useState, useEffect } from "react";
import { DataStates, Product } from "types";

const API_URL = "/react-shopping-cart/data.json";

export function useProducts() {
  const [dataState, setDataState] = useState(DataStates.loading);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async (url: string) => {
      const response = await fetch(url);
      const products = await response.json();

      try {
        setProducts(products);
        setDataState(DataStates.loaded);
      } catch {
        setDataState(DataStates.error);
      }
    };

    fetchProducts(API_URL);
  }, []);

  return { products, dataState };
}
