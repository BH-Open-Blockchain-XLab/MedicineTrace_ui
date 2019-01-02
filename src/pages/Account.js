import React, {Component} from 'react'
import {connect} from 'react-redux';

import AnnotatedSection from '../components/AnnotatedSection'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'
import faCertificate from '@fortawesome/fontawesome-free-solid/faCertificate'

import {Link} from "react-router-dom";

import {Button, FormGroup, Input, Label, Table} from "reactstrap";
import * as MainAction from "../reducers/mainActions";
import faWrench from "@fortawesome/fontawesome-free-solid/faWrench";

class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {
            companyInfo: '',
            companyState: '',
            name: '',
            proLicense: '',
            proApprovalNum: '',
            detail: ''
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
        let companyInfo = {
            TYPE: this.state.companyState,
            Name: this.state.name,
            ProLicense: this.state.proLicense,
            ProApprovalNum: this.state.proApprovalNum,
            Detail: this.state.detail
        };

        this.props.dispatch(MainAction.SetFactoryInfo(companyInfo));

        this.props.history.replace('/');
    }

    setExampleProduct1 = () => {
        this.setState({
            companyState: "生产公司",
            name: "山东鲁能第一制药有限公司",
            proLicense: "450102200023278",
            proApprovalNum: "48893989128",
            detail: "山东省济南市历下区经十路27号,建成于2010年"
        });
    };

    setExampleProduct2 = () => {
        this.setState({
            companyState: "销售公司",
            name: "山东鲁能同仁堂大药房",
            proLicense: "790102223459178",
            proApprovalNum: "12957834128",
            detail: "山东省济南市历下区经十路29号,建成于2010年"
        });
    };

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
                                <Input type="select" name="select" id="exampleSelect" value={this.state.companyState} onChange={(e) => {
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
                                <Input placeholder="Company name" value={this.state.name} onChange={(e) => {
                                    this.setState({name: e.target.value})
                                }}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>ProLicense</Label>
                                <Input placeholder="Company proLicense" value={this.state.proLicense} onChange={(e) => {
                                    this.setState({proLicense: e.target.value})
                                }}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>ProApprovalNum</Label>
                                <Input placeholder="Company proApprovalNum" value={this.state.proApprovalNum}
                                       onChange={(e) => {
                                           this.setState({proApprovalNum: e.target.value})
                                       }}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Detail</Label>
                                <Input placeholder="Company Detail" value={this.state.detail} onChange={(e) => {
                                    this.setState({detail: e.target.value})
                                }}/>
                            </FormGroup>
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
                            <Button disabled={this.state.updateButtonDisabled} color="primary"
                                    onClick={this.handleUpdateProduct}
                            >Change Information</Button>

                            <Button color="warning" style={{marginLeft: "10px"}} onClick={this.setExampleProduct1}>
                                Set an example
                            </Button>

                            <Button color="warning" style={{marginLeft: "10px"}} onClick={this.setExampleProduct2}>
                                Set another example
                            </Button>
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

