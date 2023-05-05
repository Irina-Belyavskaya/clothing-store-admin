import { UUIDDto } from '../../../types/uuid-dto.type';
import { SizesNames } from '../enums/sizes.enum';

export interface ProductsDto extends UUIDDto {
  name: string;
  description: string;
  image: string;
  price: number;
  vendorCode: number;
  color: string;
  size: SizesNames;
  composition: string;
  quantity: number;
  brand: string;
  categoryId: number;
}