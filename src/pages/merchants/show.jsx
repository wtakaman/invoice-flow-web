import {Component} from 'react';
import {Button, Card, Grid} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import {Link} from '../../routes';

import {CampaignService} from '../services/merchants';
import MerchantInvoices from './invoices';

class MerchantShow extends Component {
  static async getInitialProps(props) {
    // eslint-disable-next-line no-return-await
    return await CampaignService.getCampaignSummary(props.query.address);
  }

  renderCards() {
    const {
      balance, manager, minimumContribution,
      requestsCount, approversCount,
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Manager\'s Addresses',
        description: ' Manages who can create invoice, invoices and approvals to withdraw funds',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: minimumContribution,
        meta: 'Accepted ERC-20 tokens',
        description: 'Accepted ERC-20 tokens that this merchant accepts',
      },
      {
        header: requestsCount,
        meta: 'Required number of approvals for a request',
        description: 'A request tries to withdraw funds from the contract. Requests must be approved by contributors',
      },
      {
        header: approversCount,
        meta: 'Withdrawal address',
        description: 'Address that the funds will be sent to',
      },
      {
        header: approversCount,
        meta: 'Balances',
        description: 'Balances per token',
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    const {
      address, title, twitter, image
    } = this.props;
    return (
      <Layout>
        <h3>Merchant</h3>
        <Grid>
          <Grid.Column width={12}>
            <div>
              <h2 className="ui header">
                {/* <img src={`https://ipfs.io/ipfs/${image}`} className="ui circular image" /> */}
                {title}
              </h2>
            </div>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16}>
            {this.renderCards()}
          </Grid.Column>
          <Grid.Column width={16}>
            <h3>Invoices</h3>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16}>
            <MerchantInvoices address={address} />
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default MerchantShow;
