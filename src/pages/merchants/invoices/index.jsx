import { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import Campaign from '../../../services/invoiceFlow';
import InvoiceRow from '../../../components/InvoiceRow';

class MerchantInvoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      requests: [],
      approversCount: 0,
      requestsCount: 0,
    };
  }
  async componentDidMount() {
    const { address } = this.props;
    const campaign = Campaign(address);
    const requestsCount = await campaign.methods.requestsCount()
      .call();
    const approversCount = await campaign.methods.approversCount()
      .call();
    const requests = await Promise.all(
      Array(parseInt(requestsCount))
        .fill()
        .map((element, index) => {
          console.log(` index${index}`);
          return campaign.methods.requests(index)
            .call();
        }),
    );
    this.setState( {
      address,
      requests,
      approversCount,
      requestsCount,
    });
  }

  renderRows() {
    return this.state.requests.map((request, index) => (
      <InvoiceRow
        key={index}
        id={index}
        request={request}
        approverCount={this.state.approversCount}
        address={this.state.address}
      />
    ));
  }

  render() {
    const {
      Header, Row, HeaderCell, Body,
    } = Table;
    return (
      <>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Customer</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Token</HeaderCell>
              <HeaderCell>Expires</HeaderCell>
              <HeaderCell>Remove</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRows()}
          </Body>
        </Table>
        <div>
          { `Found ${this.state.requestsCount} invoices.` }
        </div>
        <div className="ui divider"></div>
        <Link route={`/merchants/${this.state.address}/invoices/new`}>
          <a>
            <Button
              content="Create Invoice"
              icon={"add circle"}
              primary
            />
          </a>
        </Link>
      </>
    );
  }
}

export default MerchantInvoices;
