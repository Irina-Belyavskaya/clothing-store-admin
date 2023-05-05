import { UserPermissions } from "../enums/user-permissions.enum";
import { UserRoleTypes } from "../enums/user-role-types.enum";

export type CreateRoleDto = {
  type: UserRoleTypes;
  name: string;
  permissions: UserPermissions[];
}