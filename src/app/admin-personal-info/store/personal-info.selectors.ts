import {useAppSelector} from "../../../hooks/redux";

export const useUserInfoSelector = () => useAppSelector(state => state.personalInfo);