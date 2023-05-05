import { IdDto } from "../../../types/id-dto.type";

export interface CategoryDto extends IdDto {
  name: string;
  description: string;
  image: string;
}