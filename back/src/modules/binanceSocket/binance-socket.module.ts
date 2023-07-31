// binance-socket.module.ts
import { Module } from '@nestjs/common';
import { BinanceSocketService } from './binance-socket.service';

@Module({
  providers: [BinanceSocketService],
  exports: [BinanceSocketService], // Exportez le service si vous voulez l'utiliser dans d'autres modules
})
export class BinanceSocketModule {}
