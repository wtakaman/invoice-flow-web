import { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import { MerchantService } from '../../services/merchants';

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
    const invoices = await MerchantService.getInvoiceIds(address);
    this.setState( {
      address,
      invoices,
    });
  }

  renderRows() {
    return this.state.invoices?.map((invoice, index) => (
      <InvoiceRow
        key={index}
        id={index}
        invoice={invoice}
        // approverCount={this.state.approversCount}
        address={this.state.address}
      />
    ));
  }

  render() {
    const {
      Header, Row, HeaderCell, Body,
    } = Table;
    const { invoices, address } = this.state;

    console.log({ invoices, address });
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
          { `Found ${invoices?.length || 0} invoices.` }
        </div>
        <div className="ui divider"></div>
        <Link route={`/merchants/${address}/invoices/new`}>
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
