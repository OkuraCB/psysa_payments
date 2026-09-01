import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { LogModule } from './logs/log.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MulterModule.register({ dest: 'files' }),
    AuthModule,
    UsersModule,
    LogModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe({ transform: true }) },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes();
  }
}
