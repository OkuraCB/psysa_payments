import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  payment: number;

  @Expose()
  lastPayment: Date;
}
