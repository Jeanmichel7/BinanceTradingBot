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

  async handleConnection(@ConnectedSocket() client: Socket) {}

  async handleDisconnect(@ConnectedSocket() client: Socket) {}

  @SubscribeMessage('btcPriceUpdate')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }
}
