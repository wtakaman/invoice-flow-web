import {Component} from "react";
import Layout from "../../components/Layout";
import {Button, Form, Input, Message} from "semantic-ui-react";
import {Router} from '../../routes'
import {CampaignService} from "../services/merchants";

class MerchantNew extends Component {
    state = {
        owners: [],
        withdrawAddress: '',
        acceptedTokens: [],
        requiredOwnersApprovals: 0,
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();
        try {
            this.setState({errorMessage: '', loading: true})
            await CampaignService.createCampaign(
              this.state.owners,
              this.state.withdrawAddress,
              this.state.acceptedTokens,
              this.state.requiredOwnersApprovals
            );
            this.setState({loading: false})
            Router.pushRoute('/');
            return
        } catch (err) {
            this.setState({errorMessage: err.message, loading: false})
        }
    }

    render() {
        return (
            <Layout>
                <h1>New Merchant</h1>
                <hr/>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Owners</label>
                        <Input
                            value={this.state.title}
                            onChange={
                                event => this.setState({title: event.target.value})
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Accepted tokens</label>
                        <Input
                            value={this.state.twitter}
                            onChange={
                                event => this.setState({twitter: event.target.value})
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Withdraw address</label>
                        <Input
                          value={this.state.withdrawAddress}
                          onChange={
                              event => this.setState({withdrawAddress: event.target.value})
                          }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Withdraw Approvals Required</label>
                        <Input
                            value={this.state.requiredOwnersApprovals}
                            onChange={
                                event => this.setState({requiredOwnersApprovals: event.target.value})
                            }
                        />
                    </Form.Field>
                    <Message error header={"Oops!"} content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>Create! </Button>
                </Form>
            </Layout>
        );
    }
}
export default MerchantNew;
