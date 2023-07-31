import { Injectable, Inject } from '@nestjs/common';
import { Spot } from '@binance/connector';

@Injectable()
export class BinanceService {
  constructor(
    @Inject('BINANCE_CLIENT')
    private readonly binanceClient: Spot,
  ) {}

  // async getKlines(
  //   symbol: string,
  //   interval: string,
  //   limit = 50,
  // ): Promise<any[]> {
  //   try {
  //     const options = {
  //       symbol: symbol || 'BTCUSDT',
  //       interval: interval || '30m',
  //       limit,
  //     };
  //     return await this.binanceClient.klines(options);
  //   } catch (error) {
  //     throw new Error(`Failed to fetch klines: ${error}`);
  //   }
  // }
}
