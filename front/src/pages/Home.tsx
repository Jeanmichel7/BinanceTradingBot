import { useEffect, useRef, useState } from "react"
import { io } from 'socket.io-client';
const Home = () => {

  const [btcPrice, setBtcPrice] = useState('0')
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (socketRef.current) 
      socketRef.current.disconnect(
        console.log('disconnected')
      );
      const socket = io('http://localhost:3000/binance', {
      transports: ['websocket'],
    });
    
    socket.on('connect', () => {
      console.log('connected')
    })
    
    socket.on('disconnect', () => {
      console.log('disconnected')
    })
    
    socket.on('btcPriceUpdate', (data: any) => {
      console.log(data);
      setBtcPrice(parseFloat(data).toFixed(2))
    })
    socketRef.current = socket;
  }, [])



  return (
    <>
      <h1>Home</h1>
      <p>BTC : {btcPrice} $</p>
    </>
  )
}

export default Home