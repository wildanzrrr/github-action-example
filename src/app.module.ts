import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module';
import { HealthModule } from './health/health.module';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.FINGERPRINT!,
      signOptions: { expiresIn: '7d' },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60_000, // time window in milliseconds (60 seconds)
        limit: 20, // maximum number of requests within the time window
      },
    ]),
    HttpModule,
    PrismaModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
