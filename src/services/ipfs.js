import { create } from 'ipfs-http-client';

const auth = `Basic ${Buffer.from('2GPiDjSh3YM10gAKXPDrMUw9TQ3:f59e1e49d60e2a2a7934149237e89002').toString('base64')}`;

const ipfsService = create({
  timeout: 10000,
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

export default ipfsService;
