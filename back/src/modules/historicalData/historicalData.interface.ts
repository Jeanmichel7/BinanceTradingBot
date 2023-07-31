import axios from 'axios';

export class DataActif {
  symbol: string;
  period: string;
  candles: number[] = [];
  MM7: number[] = [];
  MM25: number[] = [];
  MM100: number[] = [];
  RSI: number[] = [];

  async init(symbol: string, period: string) {
    this.symbol = symbol;
    this.period = period;
    this.candles = await this.getCandles(symbol, period, 200);
    this.generateIndicateurs();

    // setTimeout(() => {
    //   this.dataBTC30.MM100 = [1, 2, 3];
    // }, 5000);
  }

  generateIndicateurs() {
    this.MM7 = this.calculateMM(this.candles, 7);
    this.MM25 = this.calculateMM(this.candles, 25);
    this.MM100 = this.calculateMM(this.candles, 100);
    this.RSI = this.calculateRSI(this.candles, 14);
  }

  async getCandles(
    symbol = 'BTCUSDT',
    interval = '30m',
    limit = 200,
  ): Promise<any[]> {
    const url = 'https://api.binance.com/api/v3/klines';

    try {
      const response = await axios.get(url, {
        params: {
          symbol,
          interval,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch klines: ${error}`);
    }
  }

  calculateMM(dataCandle: number[], period: number) {
    const data = dataCandle.slice(-100 - period).map((e) => e[4]);
    const MM = [];
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
      sum += parseFloat(data[i]);
      if (i >= period) {
        sum -= parseFloat(data[i - period]);
        MM.push(sum / period);
      }
    }
    return MM;
  }

  calculateRSI(dataCandle: number[], period: number) {
    const data = dataCandle.slice(-100 - period).map((e) => e[4]);
    let sumGain = 0;
    let sumLoss = 0;
    const rsis = [];

    for (let i = 1; i <= period; i++) {
      const difference = data[i] - data[i - 1];
      if (difference > 0) {
        sumGain += difference;
      } else {
        sumLoss -= difference;
      }
    }
    let avgGain = sumGain / period;
    let avgLoss = sumLoss / period;
    let rs = avgGain / avgLoss;
    rsis.push(100 - 100 / (1 + rs));

    for (let i = period + 1; i < data.length; i++) {
      const difference = data[i] - data[i - 1];
      if (difference > 0) {
        avgGain = (avgGain * (period - 1) + difference) / period;
        avgLoss = (avgLoss * (period - 1)) / period;
      } else {
        avgLoss = (avgLoss * (period - 1) - difference) / period;
        avgGain = (avgGain * (period - 1)) / period;
      }

      rs = avgGain / avgLoss;
      rsis.push(100 - 100 / (1 + rs));
      // this.dataBTC30.RSI = rsis;
    }

    return rsis;
  }
}

export interface DataActifInterface {
  symbol: string;
  period: string;
  candles: number[];
  MM7: number[];
  MM25: number[];
  MM100: number[];
  RSI: number[];
}
