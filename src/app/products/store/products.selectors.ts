import { useAppSelector } from "../../../hooks/redux";

export const useProductSelector = () => useAppSelector(state => state.productsReducer);
