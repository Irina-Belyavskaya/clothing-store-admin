import { useAppSelector } from "../../../hooks/redux";

export const useRoleSelector = () =>
  useAppSelector((state) => state.roleReducer);
