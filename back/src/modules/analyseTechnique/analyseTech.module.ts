import { Module } from '@nestjs/common';
import { AnalyseTech } from './analyseTech.service';
import { HistoriqueDataModule } from '../historicalData/historicalData.module';

@Module({
  imports: [HistoriqueDataModule],
  providers: [AnalyseTech],
})
export class AnalyseTechModule {}
