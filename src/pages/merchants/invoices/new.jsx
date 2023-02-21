import {Component} from "react";
import Layout from "../../../components/Layout";
import { Router } from '../../../routes'
import {Button, Form, Input, Message} from "semantic-ui-react";
import {CampaignService} from "../../services/merchants";

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
        const {description, value, recipient} = this.state;

        try {
            this.setState({ errorMessage: '', loading: true })
            await CampaignService.createRequest(
                description,
                value,
                recipient
            );
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
                        <label>Customer's address</label>
                        <Input
                            value={this.state.description}
                            onChange={event => this.setState({description: event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Token</label>
                        <Input
                            value={this.state.value}
                            onChange={event => this.setState({value: event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value</label>
                        <Input
                            value={this.state.value}
                            onChange={event => this.setState({value: event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Expires in</label>
                        <Input
                            value={this.state.recipient}
                            onChange={event => this.setState({recipient: event.target.value})}
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