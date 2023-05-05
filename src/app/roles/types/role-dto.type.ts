import { IdDto } from "../../../types/id-dto.type";
import { UserPermissions } from "../enums/user-permissions.enum";
import { UserRoleTypes } from "../enums/user-role-types.enum";

export interface RoleDto extends IdDto {
  name: string;
  type: UserRoleTypes;
  permissions: UserPermissions[];
}
