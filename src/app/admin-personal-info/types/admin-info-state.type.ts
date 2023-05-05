import { UpdateAdminInfoDtoType } from "./update-admin-info-dto.type";
import { BaseState } from "../../../types/base-state.type";

export interface UserInfoState extends BaseState {
  userInfo: UpdateAdminInfoDtoType | null;
  pending: {
    userInfo: boolean;
  };
  errors: {
    userInfo: string | null;
  }
}