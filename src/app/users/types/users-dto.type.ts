import { UserRoleTypes } from "app/roles/enums/user-role-types.enum";

export type UserDto = {
  email: string;
  status: boolean;
  fullName: string;
  phone: string;
  address: string;
  roleName: string;
  roleType: UserRoleTypes;
}