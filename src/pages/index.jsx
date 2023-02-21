import {Button, Card} from 'semantic-ui-react';
import Layout from "../components/Layout";
import {Link} from '../routes';
import {CampaignService} from "./services/merchants";
const {Component} = require("react");

class MerchantIndex extends Component {

    state = {
        merchantList: []
    }

    async componentDidMount() {
        const merchants = await CampaignService.getDeployedCampaigns();
        const merchantList = await this.renderCampaigns(merchants)
        this.setState({merchantList});
    }

    async renderCampaigns(campaigns) {
        const items = await Promise.all(campaigns.map(async address => {
            const summary = await CampaignService.getCampaignSummary(address);
            return {
                header: summary.title,
                description: (
                    <Link route={`/merchants/${address}`}>
                        <a>View Merchant</a>
                    </Link>
                ),
                fluid: true
            };
        }));
        return <Card.Group items={items}/>
    }

    render() {
        return <Layout>
            <div>
                <h3>Merchants</h3>
                {this.state.merchantList}
                <div className="ui divider"></div>
                <Link route={'/merchants/new'}>
                    <a>
                        <Button
                            content="Create Merchant"
                            icon={"add circle"}
                            primary/>
                    </a>
                </Link>
            </div>
        </Layout>
    }
}

export  default MerchantIndex;
