import { Component } from 'react';
import { Card, Grid } from 'semantic-ui-react';
import { BigNumber, utils } from 'ethers';
import Layout from '../../components/Layout';
import { MerchantService } from '../services/merchants';
import MerchantInvoices from './invoices';

class MerchantShow extends Component {
  static async getInitialProps(props) {
  // eslint-disable-next-line no-return-await
    const result = await MerchantService.getSummary(props.query.address);
    const balances = [];

    for (const i in result.supportedTokenList) {
      const balance = await MerchantService.getBalance(props.query.address, result.supportedTokenList[i]);
      balances[result.supportedTokenList[i]] = balance;
    }

    return {
      ...result,
      balances,
    };
  }

  renderSummaryCards() {
    const {
      owners, withdrawAddress, requiredApprovals,
    } = this.props;
    const items = [
      {
        header: owners.join(' '),
        meta: 'Manager\'s Addresses',
        description: ' Manages who can create invoice, invoices and approvals to withdraw funds',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: requiredApprovals,
        meta: 'Required number of approvals for a request',
        description: 'A request tries to withdraw funds from the contract. Requests must be approved by contributors',
      },
      {
        header: withdrawAddress,
        meta: 'Withdrawal address',
        description: 'Address that the funds will be sent to',
      },
    ];
    return <Card.Group itemsPerRow={1} items={items} />;
  }

  renderBalanceCards() {
    const {
      balances,
    } = this.props;
    const items = [];

    for (const token in balances) {
      items.push(
        {
          key: token,
          header: utils.formatEther(BigNumber.from(balances[token])).toString(),
          meta: token === '0x0000000000000000000000000000000000000000' ? 'ETH' : token,
          description: 'balance',
        },
      );
    }

    return <Card.Group itemsPerRow={2} items={items} />;
  }

  render() {
    const {
      address,
    } = this.props;
    return (
      <Layout>
        <h3>Merchant</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <h3>Summary</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <div>
                <h2 className="ui header">
                  {address}
                </h2>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              {this.renderSummaryCards()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <h3>Balances</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {this.renderBalanceCards()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Column width={16}>
            <h3>Invoices</h3>
          </Grid.Column>
          <Grid.Column width={16}>
            <MerchantInvoices address={address} />
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default MerchantShow;
