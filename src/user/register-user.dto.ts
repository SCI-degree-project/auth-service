import { Role } from "./user-role";

export class RegisterUserDto {
  email: string;
  password: string;
  name?: string;
  role: Role;
  tenantId: string;
}
