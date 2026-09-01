import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumber()
  payment: number;
}
