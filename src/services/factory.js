import web3 from './web3';
import CampaignFactory from './contracts/CampaignFactory.json';

// require('dotenv').config();

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  process.env.network || '0x734893084302f77D688162D22c148B3D2081e809',
);

export default instance;
