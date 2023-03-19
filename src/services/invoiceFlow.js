import web3 from './web3';
import InvoiceFlowContract from './contracts/InvoiceFlowContract.json';

export default (address) => new web3.eth.Contract(
  InvoiceFlowContract.abi,
  address,
);
