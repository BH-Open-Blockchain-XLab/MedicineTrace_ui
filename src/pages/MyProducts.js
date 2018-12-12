import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import faList from '@fortawesome/fontawesome-free-solid/faList'
import faHistory from '@fortawesome/fontawesome-free-solid/faHistory'
import faWrench from "@fortawesome/fontawesome-free-solid/faWrench"

import AnnotatedSection from '../components/AnnotatedSection'
import Search from '../components/Search';

import {
    Button,
    Table
} from 'reactstrap';

import * as MainAction from "../reducers/mainActions";

class MyProducts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            haveCompany: false,
            companyInfo: ""
        };
    }

    componentDidMount() {
        this.fetchProduct();
    }

    fetchProduct() {
        fetch('/company.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    haveCompany: true,
                    companyInfo: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }

    clearSearchHistory() {
        this.props.dispatch(MainAction.ClearHistory());
    }

    updateHistory(id) {
        this.props.dispatch(MainAction.UpdateHistory(id));
        console.log(this.props.searchHistory);
    };

    render() {
        const products = this.state.products.map((product, index) => {
            return (
                <Link key={index} to={`/products/${product.id}`}>
                    <div key={index}>
                        <b>{product.name || "Untitled product"}</b> &mdash; {product.description || "No description"}
                        <hr/>
                    </div>
                </Link>
            )
        });

        const companyTable = (
            <div>
                <Table>
                    <tbody>
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
                            {/*<Link style={{marginLeft: "10px"}} to="/create">Create +</Link>*/}
                        </div>
                    }
                    panelContent={
                        this.state.companyInfo ? companyTable :
                            <div>
                                Fail to load your info.
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
                            {products && products.length > 0 ? products :
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
                            <Link style={{marginLeft: "10px"}} to={"/create"}>
                                <Button color="primary" title="">
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
        searchHistory: state.reducer.searchHistory
    };
}

export default connect(mapStateToProps)(MyProducts);
