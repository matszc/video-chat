import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_CONNECTION } from '../db_connection';
import { VcCommonModule } from '@vc/vc-common';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(DB_CONNECTION),
    VcCommonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
