import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/body/createUser.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/body/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ErrorMessages } from '../common/enums/errorMessages';
import { UserDeleteError } from './errors/userDeleteError.error';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.create(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@Body() user: LoginDto) {
    return await this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deleteUser(@Param('uuid') uuid: string) {
    try {
      return await this.authService.deleteUser(uuid);
    } catch (e) {
      if (e instanceof UserDeleteError)
        throw new BadRequestException(e.message);

      throw new InternalServerErrorException(ErrorMessages.DEFAULT_MESSAGE);
    }
  }
}
