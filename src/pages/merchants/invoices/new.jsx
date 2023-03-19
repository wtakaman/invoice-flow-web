import {Component} from "react";
import Layout from "../../../components/Layout";
import { Router } from '../../../routes'
import {Button, Form, Input, Message} from "semantic-ui-react";
import {MerchantService} from "../../services/merchants";

class InvoiceNew extends Component {

    state = {
        value: '',
        description: '',
        recipient: '',
        errorMessage: '',
        loading: false
    }

    static async getInitialProps(props) {
        const { address } = props.query;
        return { address };
    }

    onSubmit = async event => {
        event.preventDefault();
        const {invoiceId, customerAddress, token, amount, expiresIn} = this.state;

        try {
            this.setState({ errorMessage: '', loading: true })
            await MerchantService.registerInvoice(invoiceId, customerAddress, token, amount, expiresIn);
            this.setState({ loading: false})
            Router.pushRoute(`/invoices/${this.props.address}/requests`);
        } catch (err) {
            this.setState({errorMessage: err.message, loading: false})
        }
    }

    render() {
        return (
            <Layout>
                <h3>Create New Invoice</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Invoice Id</label>
                        <Input
                          value={this.state.invoiceId}
                          onChange={event => this.setState({invoiceId: event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Customer's address</label>
                        <Input
                            value={this.state.customerAddress}
                            onChange={event => this.setState({customerAddress: event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Token</label>
                        <Input
                            value={this.state.token}
                            onChange={event => this.setState({token: event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Amount</label>
                        <Input
                            value={this.state.amount}
                            onChange={event => this.setState({amount: event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Expires in</label>
                        <Input
                            value={this.state.expiresIn}
                            onChange={event => this.setState({expiresIn: event.target.value})}
                        />
                    </Form.Field>
                    <Message error header={"Oops!"} content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>Create</Button>
                </Form>
            </Layout>
        )
    }
}

export default InvoiceNew;