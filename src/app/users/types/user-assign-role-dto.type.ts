import { UserRoleTypes } from "app/roles/enums/user-role-types.enum";

export type UserAssignRoleDto = {
  type: UserRoleTypes;
  name: string;
}