import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from '../users/dto/body/createUser.dto';
import { UserDto } from '../users/dto/expose/user.dto';
import { LoginDto } from './dto/body/login.dto';
import { UserDeleteError } from './errors/userDeleteError.error';
import { checkForPayment } from '../common/functions/checkForPayment';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async deleteUser(uuid: string) {
    const deleted = await this.prisma.user.delete({
      where: { uuid },
    });

    if (!deleted) throw new UserDeleteError();

    return { uuid: deleted.uuid };
  }
  async create(user: CreateUserDto) {
    const { name, email, payment } = user;

    const newUser: Prisma.UserCreateInput = {
      name,
      email,
      payment,
    };

    return await this.prisma.user.create({ data: newUser });
  }

  async login(user: LoginDto) {
    const find = await this.prisma.user.findUnique({
      where: { uuid: user.uuid },
    });

    if (!find) throw new UnauthorizedException('Invalid credentials.');

    const paymentDue = checkForPayment(find.lastPayment);

    const payload = {
      sub: find.uuid,
      name: find.name,
      email: find.email,
      role: find.role,
      paymentDue: paymentDue.due,
      months: paymentDue.months,
    };
    const accessToken = await this.jwtService.sign(payload);

    const newToken = await this.prisma.token.create({
      data: { token: accessToken, userId: payload.sub },
    });

    if (!newToken) throw new Error('error');

    return { access_token: accessToken };
  }

  async validateUser(uuid: string) {
    const user = await this.prisma.user.findUnique({
      where: { uuid },
    });

    if (user) return user as UserDto;

    return null;
  }
}
