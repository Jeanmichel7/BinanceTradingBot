import { Injectable, OnModuleInit } from '@nestjs/common';
import { HistoriqueDataService } from '../historicalData/historicalData.service';

import { DataActifInterface } from '../historicalData/historicalData.interface';

@Injectable()
export class AnalyseTech implements OnModuleInit {
  dataBTC30: DataActifInterface;
  dataBTC4H: DataActifInterface;
  dataBTC1J: DataActifInterface;
  constructor(private readonly historiqueDataService: HistoriqueDataService) {}

  async onModuleInit() {
    this.dataBTC30 = this.historiqueDataService.getDataBTC30();
    this.dataBTC4H = this.historiqueDataService.getDataBTC4H();
    this.dataBTC1J = this.historiqueDataService.getDataBTC1J();
    this.consoleLog();
    // setTimeout(() => {
    //   this.consoleLog();
    // }, 8000);

    // this.analyse(this.dataBTC30);
  }

  consoleLog() {
    console.log(this.dataBTC30);
    console.log(this.dataBTC4H);
    console.log(this.dataBTC1J);
  }
}
