import {useAppSelector} from "../../../hooks/redux";

export const useUserSettingsSelector = () => useAppSelector(state => state.userSettingsReducer);