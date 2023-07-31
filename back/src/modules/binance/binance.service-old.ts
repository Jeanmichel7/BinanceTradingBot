import { Injectable, Logger } from '@nestjs/common';
import { Spot } from '@binance/connector';
import { Console } from 'console';
import { WebsocketStream } from '@binance/connector';
import { BinanceGateway } from './gateway/binance.gateway';

@Injectable()
export class BinanceService {
  private readonly logger = new Logger(BinanceService.name);
  private client: any;
  private websocketStreamClient: any;

  constructor(private readonly binanceGateway: BinanceGateway) {
    const apiKey = process.env.APIKEY;
    const apiSecret = process.env.APISECRET;

    this.client = new Spot(apiKey, apiSecret, {
      baseURL: 'https://testnet.binance.vision',
    });
    const callbacks = {
      open: () => this.logger.debug('Connected with Websocket server'),
      close: () => this.logger.debug('Disconnected with Websocket server'),
      ping: () => this.logger.debug('Ping received from Websocket server'),
      message: (data) => this.handleMessage(JSON.parse(data)),
    };

    this.websocketStreamClient = new WebsocketStream({ callbacks });
    // this.websocketStreamClient.subscribe('btcusdt@kline_1m');
    this.websocketStreamClient.subscribe('btcusdt@trade');
  }

  async getAccountInformation() {
    return this.client.account();
  }

  async start() {
    this.websocketStreamClient.subscribe('btcusdt@kline_1m');
    // this.websocketStreamClient.subscribe('btcusdt@kline_1h');
    setTimeout(() => this.websocketStreamClient.disconnect(), 5 * 60 * 1000);
  }
  async stop() {
    this.websocketStreamClient.disconnect();
  }

  /* UTILS */

  handleMessage(data) {
    // console.log(candle)
    this.binanceGateway.server.emit('btcPriceUpdate', data.p);
    // if (candle.k.i == '1m') {
    //   if (candle.k.x)
    //     console.log('candle minue closed : ', candle.k.o, candle.k.c);
    //   console.log('price minute : ' + candle.k.c);
    //   // console.log('price minute : ', candle.k.c);
    // } else if (candle.k.i == '1h') {
    //   if (candle.k.x)
    //     console.log('candle hour closed : ', candle.k.o, candle.k.c);
    //   console.log('price hour : ', candle.k.c);
    // }
  }
}
