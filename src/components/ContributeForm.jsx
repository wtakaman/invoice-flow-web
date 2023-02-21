import {Component} from "react";
import {Button, Form, Input, Message} from "semantic-ui-react";
import Campaign from '../services/invoiceFlow';
import { Router } from '../routes'
import web3 from "../services/web3";

class ContributeForm extends Component {

    state = {
        value: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);

        this.setState({loading: true, errorMessage: ''});
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
            Router.pushRoute(`/campaigns/${this.props.address}`);
        } catch (err) {
            this.setState({errorMessage: err.message });
        }
        this.setState({loading: false, value: ''});
    }

    render () {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input label={'ether'} labelPosition={'right'} value={this.state.value} onChange={(event) => this.setState({value: event.target.value})}/>
                    <Message error header={'Oops!'} content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>
                        Contribute!
                    </Button>
                </Form.Field>
            </Form>
        );
    }
}

export default ContributeForm;
