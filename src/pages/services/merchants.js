import Campaign from '../../services/invoiceFlow';
import factory from '../../services/factory';
import web3 from '../../services/web3';

async function createCampaign(
  title,
  twitter,
  image,
  minimumContribution,
) {
  const accounts = await web3.eth.getAccounts();
  await factory.methods.createCampaign(
    title,
    twitter,
    image,
    minimumContribution,
  ).send({
    from: accounts[0],
  });
}

async function getDeployedCampaigns() {
  // eslint-disable-next-line no-return-await
  return await factory.methods.getDeployedCampaigns().call();
}

async function createRequest(description, weiValue, recipient) {
  const campaign = Campaign(recipient);
  const accounts = await web3.eth.getAccounts();
  await campaign.methods.createRequest(
    description,
    web3.utils.toWei(weiValue, 'ether'),
    recipient,
  ).send({
    from: accounts[0],
  });
}
async function getCampaignSummary(address) {
  const campaign = Campaign(address);
  const summary = await campaign.methods.getSummary().call();
  return {
    address,
    title: summary[0],
    twitter: summary[1],
    image: summary[2],
    minimumContribution: summary[3],
    balance: summary[4],
    requestsCount: summary[5],
    approversCount: summary[6],
    manager: summary[7],
  };
}

// eslint-disable-next-line import/prefer-default-export
export const CampaignService = {
  getCampaignSummary,
  getDeployedCampaigns,
  createCampaign,
  createRequest,
};
