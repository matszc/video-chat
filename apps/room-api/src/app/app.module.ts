import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { VcCommonModule } from '@vc/vc-common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_CONNECTION } from '../db_connection';

@Module({
  imports: [
    RoomModule,
    VcCommonModule,
    MongooseModule.forRoot(DB_CONNECTION)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
