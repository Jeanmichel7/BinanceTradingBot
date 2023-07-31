import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'binance',
  // transports: ['websocket'],
  // path: '/binance',
})
export class BinanceGateway {
  @WebSocketServer() server: Server;

  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log('client connected', client.id);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('client disconnected', client.id);
  }

  @SubscribeMessage('btcPriceUpdate')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }
}
