import { Module, Global } from '@nestjs/common';
import { Spot } from '@binance/connector';
import { BinanceService } from './binance.service';

const apiKey = process.env.APIKEY;
const apiSecret = process.env.APISECRET;

@Global()
@Module({
  providers: [
    {
      provide: 'BINANCE_CLIENT',
      useValue: new Spot(apiKey, apiSecret, {
        baseURL: 'https://testnet.binance.vision',
      }),
    },
    BinanceService,
  ],
  exports: ['BINANCE_CLIENT', BinanceService],
})
export class BinanceModule {}
