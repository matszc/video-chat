import { Module } from '@nestjs/common';
import { UniqueValueConstraint } from './custom-validators/unique-value/unique-value.service';

@Module({
  controllers: [],
  providers: [UniqueValueConstraint],
  exports: [],
})
export class VcCommonModule {}
