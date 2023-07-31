import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataActif, DataActifInterface } from './historicalData.interface';

@Injectable()
export class HistoriqueDataService implements OnModuleInit {
  private dataBTC30: DataActif;
  private dataBTC4h: DataActif;
  private dataBTC1J: DataActif;

  async onModuleInit() {
    await this.init();
  }

  async init() {
    this.dataBTC30 = new DataActif();
    await this.dataBTC30.init('BTCUSDT', '30m');
    this.dataBTC4h = new DataActif();
    await this.dataBTC4h.init('BTCUSDT', '4h');
    this.dataBTC1J = new DataActif();
    await this.dataBTC1J.init('BTCUSDT', '1d');
  }

  getDataBTC30(): DataActifInterface {
    return this.dataBTC30;
  }

  getDataBTC4H(): DataActifInterface {
    return this.dataBTC4h;
  }

  getDataBTC1J(): DataActifInterface {
    return this.dataBTC1J;
  }
}
