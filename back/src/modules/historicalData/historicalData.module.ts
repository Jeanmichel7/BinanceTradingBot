import { Global, Module } from '@nestjs/common';
// import { BinanceModule } from '../binance/binance.module';
import { HistoriqueDataService } from './historicalData.service';
// import { BinanceModule } from '../binance/binance.module';

@Global()
@Module({
  // imports: [BinanceModule],
  providers: [HistoriqueDataService],
  exports: [HistoriqueDataService],
})
export class HistoriqueDataModule {}
