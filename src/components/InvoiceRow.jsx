import { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import web3 from '../services/web3';

class InvoiceRow extends Component {
  //
  // onApprove = async () => {
  //     const accounts = await web3.eth.getAccounts();
  //     const campaign = Campaign(this.props.address);
  //     await campaign.methods.approveRequest(this.props.id).send({
  //         from: accounts[0]
  //     });
  // };
  //
  // onFinalize = async () => {
  //     const accounts = await web3.eth.getAccounts();
  //     const campaign = Campaign(this.props.address);
  //     await campaign.methods.finalizeRequest(this.props.id).send({
  //         from: accounts[0]
  //     });
  // };

  render() {
    const { Row, Cell } = Table;
    const {
      id, customer, amount, token, expiration,
    } = this.props;
    // const readyToFinalize = request.approvalCount > this.props.approverCount / 2;
    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{customer}</Cell>
        <Cell>{web3.utils.fromWei(amount, 'ether')}</Cell>
        <Cell>{token}</Cell>
        <Cell>{expiration}</Cell>
        <Cell><Button basic color="blue" >Finalize</Button></Cell>
      </Row>
    );
  }
}

export default InvoiceRow;
