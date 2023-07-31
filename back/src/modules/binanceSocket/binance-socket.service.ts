// binance-socket.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import WebSocket from 'ws';

@Injectable()
export class BinanceSocketService implements OnModuleInit {
  private readonly url = 'wss://stream.binance.com:9443/ws'; // URL WebSocket de Binance
  private ws: WebSocket;

  onModuleInit() {
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(`${this.url}/YOUR_PAIR@kline_1s`); // Remplacer YOUR_PAIR par la paire que vous souhaitez suivre

    this.ws.on('message', (data) => this.handleMessage(data));
  }

  private handleMessage(data: WebSocket.Data) {
    // Analysez les données de la bougie ici
    const candleData = JSON.parse(data.toString());
    // Traitement des données de la bougie, stockage dans une base de données, etc.
  }

  // Vous pouvez également ajouter des méthodes pour récupérer les données stockées, vous abonner à des paires différentes, etc.
}
