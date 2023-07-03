import { Module } from '@nestjs/common';
import { BinanceController } from './binance.controller';
import { BinanceService } from './binance.service';
import { BinanceGateway } from './binance.gateway';

@Module({
  imports: [BinanceGateway],
  controllers: [BinanceController],
  providers: [BinanceService, BinanceGateway],
  // exports: [BinanceModule],
})
export class BinanceModule {}
