import { useAppSelector } from "../../../hooks/redux";

export const useCategorySelector = () => useAppSelector(state => state.categoryReducer);