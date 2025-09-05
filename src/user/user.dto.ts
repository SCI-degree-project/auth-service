export class UserDto {
  id: string;
  name?: string;
  email: string;
  role: 'admin' | 'worker';
  tenantId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
