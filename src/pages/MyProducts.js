import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import faList from '@fortawesome/fontawesome-free-solid/faList'
import faHistory from '@fortawesome/fontawesome-free-solid/faHistory'
import faWrench from "@fortawesome/fontawesome-free-solid/faWrench"

import AnnotatedSection from '../components/AnnotatedSection'
import Search from '../components/Search'

import {
    Button,
    Table
} from 'reactstrap';

import * as MainAction from "../reducers/mainActions";

class MyProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            histories: [],
            haveCompany: false,
            companyInfo: ""
        };
        this.clearSearchHistory = this.clearSearchHistory.bind(this);
    }

    componentDidMount() {
        if (this.props.accountInformation !=="") {
            this.setState({
                haveCompany: true,
                companyInfo: this.props.accountInformation
            });
        }
        this.setSearchHistory();
    }

    clearSearchHistory() {
        this.props.dispatch(MainAction.ClearHistory());
        this.setState({histories: []});
    }

    updateHistory(id) {
        this.props.dispatch(MainAction.UpdateHistory(id));
    };

    setSearchHistory() {
        this.props.searchHistory.length > 0 ?
            this.setState({histories: [...this.props.searchHistory]})
            :
            this.setState({histories: []});
    }

    updateCompanyInfo() {
        this.props.dispatch(MainAction.SetFactoryInfo(this.state.companyInfo));
    }

    render() {
        const histories = this.state.histories.map((history, index) => {
            return (
                <Link key={index} to={`/products/${history}`} >
                    <div key={index} style={{marginLeft: "10px"}}>
                        {history || "Untitled product"}
                    </div>
                </Link>
            )
        });

        const companyTable = (
            <div>
                <Table>
                    <tbody>
                    <tr>
                        <td>Type</td>
                        <td>{this.state.companyInfo.TYPE}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{this.state.companyInfo.Name}</td>
                    </tr>
                    <tr>
                        <td>LicenseNum</td>
                        <td>{this.state.companyInfo.ProLicense}</td>
                    </tr>
                    <tr>
                        <td>ApprovalNum</td>
                        <td>{this.state.companyInfo.ProApprovalNum}</td>
                    </tr>
                    <tr>
                        <td>Detail</td>
                        <td>{this.state.companyInfo.Detail}</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );

        return (
            <div>
                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}}
                                             icon={faSearch}/>
                            View a product
                        </div>
                    }
                    panelContent={
                        <div>
                            <Search
                                updateSearchId = {(id) => this.updateHistory(id)}
                            />
                        </div>
                    }
                />
                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}} icon={faList}/>
                            My information
                        </div>
                    }
                    panelContent={
                        this.state.companyInfo ? companyTable :
                            <div>
                                Fail to load your info. You can go to {" "}
                                <Link to={"/account"}>here</Link>
                                {" "} to set.
                            </div>
                    }
                />
                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}}
                                             icon={faHistory}/>
                            Search history
                        </div>
                    }

                    panelContent={
                        <div>
                            {histories && histories.length > 0 ?
                                <div>
                                    {histories}
                                    <hr/>
                                    <Button color="link" size="sm" style={{color: "hsl(161, 42%, 42%)"}} onClick={this.clearSearchHistory}><b>Clear History</b></Button>
                                </div>
                                :
                                <div>
                                    You did not search any products yet.
                                </div>}
                        </div>
                    }
                />


                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}}
                                             icon={faWrench}/>
                            Actions
                        </div>
                    }
                    panelContent={
                        <div>
                            <Link to={"/create"}>
                                <Button disabled={this.state.companyInfo.TYPE !== "生产公司"} color="primary" title="">
                                    Create a product
                                </Button>
                            </Link>
                        </div>
                    }
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        productIdToView: state.reducer.productIdToView,
        searchHistory: state.reducer.searchHistory,
        accountInformation: state.reducer.accountInformation
    };
}

export default connect(mapStateToProps)(MyProducts);
