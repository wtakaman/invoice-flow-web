import Web3 from 'web3';

// eslint-disable-next-line import/no-mutable-exports
let web3;

// eslint-disable-next-line no-undef
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // We are in the browser and metamask is running.
  // eslint-disable-next-line no-undef
  window.ethereum.request({ method: 'eth_requestAccounts' });
  // eslint-disable-next-line no-undef
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://goerli.infura.io/v3/c724b894f0ae4562929cf69a3cf648f5',
  );
  web3 = new Web3(provider);
}

export default web3;
