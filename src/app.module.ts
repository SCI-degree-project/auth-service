import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { User } from './user/user.entity';
import { Store } from './store/store.entity';
import { StoresModule } from './store/store.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'decorar_auth',
      entities: [User, Store],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    StoresModule
  ],
})
export class AppModule {}
