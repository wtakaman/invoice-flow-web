import web3 from './web3';
import InvoiceFlowContractFactory from './contracts/InvoiceFlowContractFactory.json';

// require('dotenv').config();

const instance = new web3.eth.Contract(
  InvoiceFlowContractFactory.abi,
  process.env.network || '0x87D5c0021f6edF59f36ac9a78C8a281e7751Fa96',
  // 0xD3F6A7b43359438ab76277F6fCB6cdf297c5fe27 // mumbai
);

export default instance;
