import {Component} from "react";
import {Button, Table} from "semantic-ui-react";
import web3 from "../services/web3";
import Campaign from "../services/invoiceFlow";


class InvoiceRow extends Component {

    onApprove = async () => {
        const accounts = await web3.eth.getAccounts();
        const campaign = Campaign(this.props.address);
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        });
    };

    onFinalize = async () => {
        const accounts = await web3.eth.getAccounts();
        const campaign = Campaign(this.props.address);
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        });
    };

    render () {
        const {Row, Cell} = Table;
        const {id, request} = this.props;
        const readyToFinalize = request.approvalCount > this.props.approverCount / 2;
        return (
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{this.props.approverCount}</Cell>
                <Cell><Button basic color={'blue'} onClick={this.onFinalize}>Finalize</Button></Cell>
            </Row>
        )
    }
}

export default InvoiceRow;