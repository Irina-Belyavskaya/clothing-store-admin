import { BaseState } from 'types/base-state.type';
import { UserDto } from './users-dto.type';

export interface UsersState extends BaseState {
  users: UserDto[];
  user: UserDto | null;
  pending: {
    users: boolean;
    user: boolean;
  };
  errors: {
    users: string | null;
    user: string | null;
  };
}