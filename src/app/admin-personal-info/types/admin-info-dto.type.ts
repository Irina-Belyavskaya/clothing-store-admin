import { UUIDDto } from "../../../types/uuid-dto.type";

export interface UserInfoDto extends UUIDDto {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}