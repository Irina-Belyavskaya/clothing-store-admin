import { ProductsDto } from "./product-dto.type"

export type CardProductProps = {
  product: ProductsDto,
  handleOpenFormEdit: (id: string | number | undefined) => void,
  handleOpenConfirmWindow: (id: string | number | undefined) => void
}