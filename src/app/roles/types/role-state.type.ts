import { BaseState } from 'types/base-state.type';
import { RoleDto } from './role-dto.type';

export interface RoleState extends BaseState {
  roles: RoleDto[];
  role: RoleDto | null;
  pending: {
    roles: boolean;
    role: boolean;
  };
  errors: {
    roles: string | null;
    role: string | null;
  };
}