import { IsNotEmpty, IsString, IsEmail, IsUUID } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Uuid should not be empty' })
  @IsUUID()
  uuid: string;
}
