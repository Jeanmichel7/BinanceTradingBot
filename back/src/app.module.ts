import { Module } from '@nestjs/common';
import { BinanceModule } from './modules/binance/binance.module';
import { HistoriqueDataModule } from './modules/historicalData/historicalData.module';
import { AnalyseTechModule } from './modules/analyseTechnique/analyseTech.module';

@Module({
  imports: [BinanceModule, HistoriqueDataModule, AnalyseTechModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
