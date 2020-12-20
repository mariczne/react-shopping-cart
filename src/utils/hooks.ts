import { useState, useEffect, useRef, useCallback } from "react";
import { DataStates, Product } from "types";

const API_URL = "/react-shopping-cart/data.json";

export function useProducts() {
  const isMounted = useIsMounted()
  const [dataState, setDataState] = useState(DataStates.loading);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async (url: string) => {
      const response = await fetch(url);
      const products: Product[] = await response.json();

      try {
        isMounted() && setProducts(products);
        isMounted() && setDataState(DataStates.loaded);
      } catch {
        isMounted() && setDataState(DataStates.error);
      }
    };

    fetchProducts(API_URL);
  }, [isMounted]);

  return { products, dataState };
}

export function useIsMounted() {
  const isMountedRef = useRef(true)

  useEffect(
    () => () => {
      isMountedRef.current = false
    },
    []
  )

  const isMounted = useCallback(() => isMountedRef.current, [isMountedRef])

  return isMounted
}
