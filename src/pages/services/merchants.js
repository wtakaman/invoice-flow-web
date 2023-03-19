import InvoiceFlowContract from '../../services/invoiceFlow';
import factory from '../../services/factory';
import web3 from '../../services/web3';

async function createMerchant(
  owners,
  withdrawAddress,
  acceptedTokens,
  requiredSignatures,
) {
  const accounts = await web3.eth.getAccounts();
  await factory.methods.createInvoiceFlowContract(
    owners,
    withdrawAddress,
    acceptedTokens,
    requiredSignatures,
  ).send({
    from: accounts[0],
  });
}

async function getDeployedInvoiceFlowContracts() {
  // eslint-disable-next-line no-return-await
  return await factory.methods.getDeployedInvoiceFlowContracts().call();
}

async function createRequest(description, weiValue, recipient) {
  const campaign = InvoiceFlowContract(recipient);
  const accounts = await web3.eth.getAccounts();
  await campaign.methods.createRequest(
    description,
    web3.utils.toWei(weiValue, 'ether'),
    recipient,
  ).send({
    from: accounts[0],
  });
}
async function getSummary(address) {
  const merchant = InvoiceFlowContract(address);
  const summary = await merchant.methods.getSummary().call();
  return {
    address,
    owners: summary[0],
    supportedTokenList: summary[1],
    withdrawAddress: summary[2],
    requiredApprovals: summary[3],
  };
}

async function getBalance(address, token) {
  const merchant = InvoiceFlowContract(address);
  const balance = await merchant.methods.getBalance(token).call();
  return balance;
}

async function getInvoiceIds(address) {
  const merchant = InvoiceFlowContract(address);
  const invoices = await merchant.methods.getInvoiceIds().call();
  return invoices;
  // return invoices;
}

// eslint-disable-next-line import/prefer-default-export
export const MerchantService = {
  getSummary,
  getDeployedInvoiceFlowContracts,
  createMerchant,
  createRequest,
  getBalance,
  getInvoiceIds,
};
