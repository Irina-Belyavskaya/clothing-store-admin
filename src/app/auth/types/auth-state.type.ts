import { BaseState } from "types/base-state.type";
import { AuthDto } from "./auth-dto.type";

export interface AuthState extends BaseState {
  token: AuthDto | null;
  pending: {
    token: boolean;
  };
  errors: {
    token: string | null;
  }
}