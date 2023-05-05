import { BaseState } from "types/base-state.type";
import { ProductsDto } from "./product-dto.type";

export interface ProductsState extends BaseState {
  products: ProductsDto[];
  product: ProductsDto | null;
  pending: {
    products: boolean;
    product: boolean;
  };
  errors: {
    products: string | null;
    product: string | null;
  }
}
