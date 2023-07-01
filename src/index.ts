import { Spot } from '@binance/connector'
import 'dotenv/config'

const apiKey = process.env.APIKEY
const apiSecret = process.env.APISECRET
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision'})

// Get account information
client.account().then(response => client.logger.log(response.data))
 
// Place a new order
// client.newOrder('BNBUSDT', 'BUY', 'LIMIT', {
//   price: '350',
//   quantity: 1,
//   timeInForce: 'GTC'
// }).then(response => client.logger.log(response.data))
//   .catch(error => client.logger.error(error))