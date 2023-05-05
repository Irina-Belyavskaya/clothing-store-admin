import { useAppSelector } from "../../../hooks/redux";

export const useUserSelector = () => useAppSelector((state) => state.userReducer);
