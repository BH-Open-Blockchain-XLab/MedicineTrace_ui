import React, {Component} from 'react'
import {connect} from 'react-redux';

import AnnotatedSection from '../components/AnnotatedSection'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'
import faCertificate from '@fortawesome/fontawesome-free-solid/faCertificate'

import {Link} from "react-router-dom";

import {Button, FormGroup, Input, Label, Table} from "reactstrap";

class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {
            companyInfo: '',
            companyState: '',
            name: '',
        };

        this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
    }

    componentDidMount() {
        this.params = this.props.match.params;
        this.setState({
            companyInfo: this.props.accountInformation,
        });
    }

    handleUpdateProduct() {
        console.log(this.state.companyState);
        this.props.history.replace('/');
    }


    render() {
        const companyTable = (
            <div>
                <Table>
                    <tbody>
                    <tr>
                        <th scope="row">Type</th>
                        <td>{this.state.companyInfo.TYPE}</td>
                    </tr>
                    <tr>
                        <th scope="row">Name</th>
                        <td>{this.state.companyInfo.Name}</td>
                    </tr>
                    <tr>
                        <th scope="row">LicenseNum</th>
                        <td>{this.state.companyInfo.ProLicense}</td>
                    </tr>
                    <tr>
                        <th scope="row">ApprovalNum</th>
                        <td>{this.state.companyInfo.ProApprovalNum}</td>
                    </tr>
                    <tr>
                        <th scope="row">Detail</th>
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
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}} icon={faUser}/>
                            Company information
                        </div>
                    }
                    panelContent={
                        this.state.companyInfo ? companyTable :
                            <div>
                                Fail to load your info. Please set your info below, or back to {" "}
                                <Link to={"/"}>the main page</Link>
                                .
                            </div>
                    }
                />

                <AnnotatedSection
                    annotationContent={
                        <div>
                            <FontAwesomeIcon fixedWidth style={{paddingTop: "3px", marginRight: "6px"}}
                                             icon={faCertificate}/>
                            Change company
                        </div>
                    }
                    panelContent={
                        <div>
                            <FormGroup>
                                <Label>Company Type</Label>
                                <Input type="select" name="select" id="exampleSelect" onChange={(e) => {
                                    this.setState({companyState: e.target.value})
                                }}>
                                    <option value="">Select</option>
                                    <option value="生产公司">生产公司</option>
                                    <option value="中转公司">中转公司</option>
                                    <option value="销售公司">销售公司</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Name</Label>
                                <Input placeholder="Product name" value={this.state.name} onChange={(e) => {
                                    this.setState({name: e.target.value})
                                }}/>
                            </FormGroup>

                            <Button disabled={this.state.updateButtonDisabled} color="primary"
                                    onClick={this.handleUpdateProduct}
                            >Change</Button>
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
        accountInformation: state.reducer.accountInformation
    };
}

export default connect(mapStateToProps)(Account);

