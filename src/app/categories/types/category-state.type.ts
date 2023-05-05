import { BaseState } from "types/base-state.type";
import { CategoryDto } from "./category-dto.type";

export interface CategoryState extends BaseState {
  categories: CategoryDto[];
  category: CategoryDto | null;
  pending: {
    categories: boolean;
    category: boolean;
  };
  errors: {
    categories: string | null;
    category: string | null;
  }
}