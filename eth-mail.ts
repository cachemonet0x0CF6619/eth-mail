import 'dotenv/config';
import { providers, Wallet } from 'ethers';

const key = process.env.PK || '';
async function sendTx(to: string, data: Buffer) {
  const rpc = process.env.RINKEBY;
  const provider = new providers.JsonRpcProvider(rpc);
  if (!key.length) throw new Error('Missing key')
  const wallet = new Wallet(key, provider);

  const params: providers.TransactionRequest = {
    to,
    data
  };

  await wallet.signTransaction(params);
  await wallet.sendTransaction(params);
}

(async () => {
  const [to, message] = process.argv.slice(2);
  await sendTx(to, Buffer.from(message));
})();
